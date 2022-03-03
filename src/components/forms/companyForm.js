import { Autocomplete, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete"
import List from "@mui/material/List"
import Button from "@mui/material/Button"
import ListItem from "@mui/material/ListItem"
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person'
import {useEffect, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Empresa from "../../back/model/Empresa";
import Grid from "@mui/material/Grid"
import InputUsuario from "../form/InputUsuario";
import InputTexto from "../form/InputTexto";
import TiposVia from "../../back/model/TiposVia";
import { useParams, Switch, Route } from "react-router-dom";
import ControlEmpresa from "../../back/control/controlEmpresa";
import notificar from "../home/notificar";
import { useHistory } from "react-router-dom";
import ErroresCampo from "../form/ErroresCampo";

const deleteUsuario = (usuario, empresa)=>{

}

const CompanyForm = () => {

  const {idempresa} = useParams() || '';
  const tiposVia = TiposVia;
  const history = useHistory();

  const [errores,setErrores] = useState({});
  const [empresa,setEmpresa] = useState(new Empresa());
  const [isPending, setIsPending] = useState(true);

  const [nif, setNif] = useState('');
  const [nombre, setNombre] = useState('');
  const [razonSocial, setRazonSocial] = useState();
  const [administrador, setAdministrador] = useState(null);
  const [tipoVia, setTipoVia] = useState('');
  const [nombreVia, setNombreVia] = useState('');
  const [numVia, setNumVia] = useState('');
  const [codigoPuerta, setCodigoPuerta] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [provincia, setProvincia] = useState('');

  useEffect(()=>{

    const abortCont = new AbortController();

        if(idempresa){setTimeout(()=>{
            ControlEmpresa.getById(idempresa)
            .then(data=>{
                setEmpresa(data);
                setNif(data.nif);
                setNombre(data.nombre);
                setRazonSocial(data.razonSocial);
                setAdministrador(data.administrador);
                setTipoVia({label:data.tipoVia,id:data.tipoVia});
                setNombreVia(data.nombreVia);
                setNumVia(data.numVia);
                setCodigoPuerta(data.codigoPuerta || '')
                setIsPending(false)

                ControlEmpresa.getUsuariosByEmpresa(data)
                .then(res => {
                    data.usuarios = res;
                    setEmpresa(data)
                })

                ControlEmpresa.getAdminByEmpresa(data)
                .then(res => {
                    setAdministrador(res[0])
                    console.log(res)
                })
            })
        }, 1000)}

        setIsPending(false)

        return abortCont.abort();

  },[idempresa])

  
  const handleCreate = (e) =>{

    e.preventDefault();

    const nuevaEmpresa = new Empresa(nif, razonSocial, nombre,
                                    tipoVia.id || '', nombreVia, numVia, codigoPuerta)

    if(idempresa){
      console.log(nuevaEmpresa)
      ControlEmpresa.edit(nuevaEmpresa)
      .then(data =>{
        if(data.error != null){
          notificar(data.message+" "+data.error.message)
        }else if(data.message != null){
          notificar(data.message)
          history.go(-2)
        }
          console.log(data)
          setErrores(data);
      })

    }else{
      console.log(nuevaEmpresa)
      ControlEmpresa.create(nuevaEmpresa)
      .then(data =>{
        if(data.error != null){
          notificar(data.message+" "+data.error.message)
        }else if(data.message != null){
          notificar(data.message)
          history.go(-2)
        }
          console.log(data)
          setErrores(data);
      })
    }

  }

    return (
        <Box>
          { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
          <div>
        <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Editar empresa {empresa.nombre || "nueva"}</Typography>

        <Box display="flex">
          <Button variant="contained" onClick={(e)=>handleCreate(e)}>Terminar</Button>
        </Box>
      
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            width:'70%'
          }}
          noValidate
          autoComplete="off"
        >
          
          <InputTexto formalName="Nombre" 
          required = {true}
          id = "nombre"
          property={nombre} 
          setProperty={setNombre} 
          errores={errores.nombre || null} />

          <InputTexto formalName="CIF" 
          required = {true}
          id = "nif"
          disabled={(idempresa)?true:false}
          property={nif} 
          setProperty={setNif} 
          errores={errores.nif || null} />

          <Box>
                <Box display="flex">
                    {(tiposVia.length)?<Autocomplete
                    options={tiposVia}
                    defaultValue={""}
                    value={tipoVia}
                    onChange={(e,value)=>setTipoVia(value)}
                    id="tipoVia"
                    renderInput={(params) => (
                        <TextField {...params} label="Tipos de vía" variant="standard" />
                        )}
                    />:null}
                </Box>

                <ErroresCampo errores={errores.tipovia}/>
            </Box>

        <InputTexto formalName="Nombre de vía" 
        required = {true}
          id = "nombrevia"
          property={nombreVia} 
          setProperty={setNombreVia} 
          errores={errores.nombrevia || null} />

        <InputTexto formalName="Número" 
        required = {true}
          id = "numvia"
          property={numVia} 
          setProperty={setNumVia} 
          errores={errores.numvia || null} />

        <InputTexto formalName="Código de puerta" 
          id = "codigopuerta"
          property={codigoPuerta} 
          setProperty={setCodigoPuerta} 
          errores={errores.codigopuerta || null} />

        <InputTexto formalName="Localidad" 
          id = "localidad"
          property={localidad} 
          setProperty={setLocalidad} 
          errores={errores.localidad || null} />

        <InputTexto formalName="Provincia" 
          id = "provincia"
          property={provincia} 
          setProperty={setProvincia} 
          errores={errores.provincia || null} />

        <InputTexto formalName="Razón social" 
        required = {true}
          id = "razonsocial"
          property={razonSocial} 
          setProperty={setRazonSocial} 
          errores={errores.razonsocial || null} />

        <Box margin={2}>
          <Typography for="administrador" color="text.secondary" align="left" >Administrador</Typography>

          {administrador && <Box display="flex">
              {(empresa.usuarios != null)?<Autocomplete
              options={empresa.usuarios}
              defaultValue={administrador}
              value={administrador}
              onChange={(e,value)=>setAdministrador(value)}
              getOptionLabel={option => option.email}
              id="administrador"
              renderInput={(params) => (
                  <TextField {...params} label="Miembros" variant="standard" />
                )}
              />:null}
          </Box>}

        </Box>

      
    </Box>

    <InputUsuario tabla={empresa} errores={errores.usuarios || null} usuarios={empresa.usuarios || null}/>
      
    </div> 
          
        </Box>

     );
}


 
export default CompanyForm;