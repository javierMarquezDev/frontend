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
import {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Empresa from "../../back/model/Empresa";
import Grid from "@mui/material/Grid"
import InputUsuario from "../form/InputUsuario";
import InputTexto from "../form/InputTexto";

const deleteUsuario = (usuario, empresa)=>{

}



const CompanyForm = () => {

  let errores = {}
  let empresa = {}
  let optionsUsuarios = [];
  const tiposVia = [
    {label:"C./", id:"C./"},
    {label:"Avda./", id:"Avda./"},
    {label:"Ctra./", id:"Ctra./"},
    {label:"Pza./", id:"Pza./"}
];

    
    errores = /*{
        nombre:{
            format:"No mola",
            xtsn:"Es una mierda"
        }
    }*/{}

    empresa = /*{
        nif:"E98765432",
        nombre:"Aceites Benatae S.A.",
        razonSocial:"Benatae SA",
        administrador:{
            nombre:"Rodrigo",
            email:"higo@gmail.com"
        },
        tipoVia:"C./",
        nombreVia:"Hernani",
        numVia:"51",
        codigoPuerta:"2A",
        usuarios:[
            {email:"higo@gmail.com", nombre:"Rodrigo"},
            {email:"higo@gmail.com", nombre:"Rodrigo"},
            {email:"higo@gmail.com", nombre:"Rodrigo"},
            {email:"higo@gmail.com", nombre:"Rodrigo"},
            {email:"higo@gmail.com", nombre:"Rodrigo"},
            {email:"higo@gmail.com", nombre:"Rodrigo"},
        ]
    }*/new Empresa()

    const [nif, setNif] = useState(empresa.nif || '');
    const [nombre, setNombre] = useState(empresa.nombre || '');
    const [razonSocial, setRazonSocial] = useState(empresa.razonSocial || '');
    const [administrador, setAdministrador] = useState((empresa.administrador != null)?empresa.administrador.email:null);
    const [tipoVia, setTipoVia] = useState(empresa.tipoVia || '');
    const [nombreVia, setNombreVia] = useState(empresa.nombreVia || '');
    const [numVia, setNumVia] = useState(empresa.numVia || '');
    const [codigoPuerta, setCodigoPuerta] = useState(empresa.codigoPuerta || '');

    return ( <div>
        <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Editar empresa {empresa.nombre || "nueva"}</Typography>

      
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
          errores={errores.codigoPuerta || null} />

        <InputTexto formalName="Razón social" 
        required = {true}
          id = "razonsocial"
          property={razonSocial} 
          setProperty={setRazonSocial} 
          errores={errores.razonsocial || null} />

        <Box margin={2}>
          <Typography for="administrador" color="text.secondary" align="left" >Administrador</Typography>

          <Box display="flex">
              {(empresa.usuarios != null)?<Autocomplete
              options={empresa.usuarios}
              defaultValue={""}
              value={administrador}
              onChange={(e,value)=>setAdministrador(value)}
              getOptionLabel={option => option.email}
              id="administrador"
              renderInput={(params) => (
                  <TextField {...params} label="Miembros" variant="standard" />
                )}
              />:null}
          </Box>

        </Box>

        
        
      
    </Box>

    <InputUsuario tabla={empresa} errores={errores.usuarios || null} usuarios={empresa.usuarios || null}/>
      
    </div> );
}
 
export default CompanyForm;