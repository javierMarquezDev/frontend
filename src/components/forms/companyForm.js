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
import React, {useEffect, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Empresa from "../../back/model/Empresa";
import Grid from "@mui/material/Grid"
import InputUsuario from "../form/InputUsuario";
import InputTexto from "../form/InputTexto";
import { useParams, Switch, Route } from "react-router-dom";
import ControlEmpresa from "../../back/control/controlEmpresa";
import { useHistory } from "react-router-dom";
import ErroresCampo from "../form/ErroresCampo";
import InputUsuarioEmpresa from "../form/InputUsuarioEmpresa";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";
import useNotificar from "../home/notificar";


const CompanyForm = (props) => {

  const notificar = useNotificar();

  const value = React.useContext(UserContext);
  const usuarioSesion = value.usuario;
  const token = value.token;

  const {idempresa} = useParams() || '';
  const history = useHistory();

  const [errores,setErrores] = useState({});
  const [empresa,setEmpresa] = useState(new Empresa());
  const [isPending, setIsPending] = useState(true);

  const [nif, setNif] = useState('');
  const [nombre, setNombre] = useState('');
  const [razonSocial, setRazonSocial] = useState();
  
  const [nombreVia, setNombreVia] = useState('');
  const [numVia, setNumVia] = useState('');
  const [codigoPuerta, setCodigoPuerta] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [usuarios, setUsuarios] = useState([])
  const [provincia, setProvincia] = useState('');
  const [admins,setAdmins] = useState([])
  const [usuarioIsAdmin, setUsuarioIsAdmin] = useState(false);

  useEffect(()=>{

    const abortCont = new AbortController();

    if(idempresa){

      setTimeout(()=>{

        ControlEmpresa.isAdmin({nif:idempresa},usuarioSesion)
        .then(data => {
            setUsuarioIsAdmin(data)

            if(data){
              ControlEmpresa.getById(idempresa)
              .then(data=>{
                  setEmpresa(data);
                  setNif(data.nif);
                  setNombre(data.nombre);
                  setRazonSocial(data.razonSocial);
                  
                  setNombreVia(data.nombreVia);
                  setNumVia(data.numVia);
                  setLocalidad(data.localidad)
                  setProvincia(data.provincia)
                  setCodigoPuerta(data.codigoPuerta)
                  

                  ControlEmpresa.getUsuariosByEmpresa(data)
                  .then(res => {
                      setUsuarios(res)
                      setIsPending(false)
                  })

                  ControlEmpresa.getAdminByEmpresa(data)
                  .then(res => {
                      setAdmins(res)
                      setIsPending(false)
                  })
              })
            }
        })
        
          
      }, 1000)

    }

        

        setIsPending(false)

        return abortCont.abort();

  },[])

  
  const handleCreate = (e) =>{

    const nuevaEmpresa = new Empresa(nif, razonSocial, nombre,
                                    nombreVia, numVia, codigoPuerta,
                                    localidad, provincia)

    if(idempresa){
      
      setIsPending(true)

      if(admins.length > 0){
        ControlEmpresa.edit(nuevaEmpresa)
        .then(data =>{
          if(data.error != null){
            notificar({type:"ERROR",message:data.message})
          }else if(data.message != null){
            notificar({type:"SUCCESS",message:data.message})
            props.setHasChanged(true);
            history.push(`/empresas`)
          }else{
            console.log(data)
            setErrores(data);
          }
            
            

            ControlEmpresa.moidfyUsuariosBulk(nuevaEmpresa, usuarios, admins)
            .then(res => {
                
                if(res.administrador != null){
                    data.administrador = {empty:res.administrador};
                    notificar({type:"ERROR",message:res.administrador})
                    setErrores(data);
                    
                }else{
                  notificar({type:"SUCCESS",message:res.message})
                }

                setIsPending(false)
                
                
            })
            
        })
      }else{
        setErrores({administrador:{empty:"Debe introducirse un administrador."}})
      }
      
    }else{

      if(admins.length>0){ControlEmpresa.create(nuevaEmpresa)
      .then(data =>{
        if(data.error != null){
          notificar({type:"ERROR",message:data.message})
        }else if(data.message != null){
          notificar({type:"SUCCESS",message:data.message})

          ControlEmpresa.addUsuariosBulk(data.empresa,usuarios,admins)
          .then(res => {
            
            if(res.administrador != null){
              data.administrador = {empty:res.administrador};
              notificar({type:"ERROR",message:res.administrador})
              setErrores(data);
            }else{
              notificar({type:"SUCCESS",message:data.message})
            }

            
            setIsPending(false)

          })

          props.setHasChanged(true);
          history.push(`/empresas/${nuevaEmpresa.nif}`)

          
        }
          console.log(data)
          setErrores(data);
      })}else{
        setErrores({administrador:{empty:"Debe introducirse un administrador."}})
      }
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
                display="-ms-flexbox"
                sx={{width:'70%',margin:2}}
              >
                
                <InputTexto formalName="Nombre" 
                required = {true}
                id = "nombre"
                property={nombre} 
                setProperty={setNombre} 
                errores={errores.nombre || null}
                sx={{margin:2, width:'40%'}} />

                <InputTexto formalName="CIF" 
                required = {true}
                id = "nif"
                disabled={(idempresa)?true:false}
                property={nif} 
                setProperty={setNif} 
                errores={errores.nif || null}
                sx={{margin:2, width:'40%'}} />

                {/*<Box sx={{margin:2}}>
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
                </Box>*/}

              <InputTexto formalName="Nombre de vía" 
              required = {true}
                id = "nombrevia"
                property={nombreVia} 
                setProperty={setNombreVia} 
                errores={errores.nombrevia || null}
                sx={{margin:2, width:'40%'}} />

              <InputTexto formalName="Número" 
              required = {true}
                id = "numvia"
                property={numVia} 
                setProperty={setNumVia} 
                errores={errores.numvia || null}
                sx={{margin:2, width:'40%'}} />

              <InputTexto formalName="Código de puerta" 
                id = "codigopuerta"
                property={codigoPuerta} 
                setProperty={setCodigoPuerta} 
                errores={errores.codigopuerta || null}
                sx={{margin:2, width:'40%'}} />

              <InputTexto formalName="Localidad" 
                id = "localidad"
                property={localidad} 
                setProperty={setLocalidad} 
                errores={errores.localidad || null}
                sx={{margin:2, width:'40%'}} />

              <InputTexto formalName="Provincia" 
                id = "provincia"
                property={provincia} 
                setProperty={setProvincia} 
                errores={errores.provincia || null}
                sx={{margin:2, width:'40%'}} />

              <InputTexto formalName="Razón social" 
              required = {true}
                id = "razonsocial"
                property={razonSocial} 
                setProperty={setRazonSocial} 
                errores={errores.razonsocial || null}
                sx={{margin:2, width:'40%'}} />

              
            
          </Box>

          <Box margin={2}>
                <Typography for="administrador" color="text.secondary" align="left" >Administradores</Typography>

                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {usuarios && <InputUsuarioEmpresa 
                                                    opciones={usuarios}
                                                    errores={errores.administrador||null} 
                                                    usuarios={admins}
                                                    setUsuarios={setAdmins}/>}
                

              </Box>
              <Box margin={2}>
              <Typography for="administrador" color="text.secondary" align="left" >Miembros</Typography>
              { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
              {(usuarios) && <InputUsuarioEmpresa 
                                                    
                              errores={errores.usuarios||null} 
                              usuarios={usuarios}
                              setUsuarios={setUsuarios}
                              sx={{margin:2}}/>}
              </Box>

            
          </div> 
          
        </Box>
      
     );
}


 
export default CompanyForm;