import { Label, SearchOutlined } from "@mui/icons-material";
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

const CompanyForm = () => {

    let errores = {
        nombre:{
            format:"No mola",
            xtsn:"Es una mierda"
        }
    }

    const empresa = {
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
    }

    const optionsUsuarios = [
        {label:"rodrhigo@gmail.com", id:"rodrhigo@gmail.com"},
        {label:"higo@gmail.com", id:"higo@gmail.com"},
        {label:"higo@gmail.com", id:"higo@gmail.com"},
        {label:"higo@gmail.com", id:"higo@gmail.com"},
        {label:"higo@gmail.com", id:"higo@gmail.com"},
        {label:"higo@gmail.com", id:"higo@gmail.com"}
    ]

    const [nif, setNif] = useState(empresa.nif || '');
    const [nombre, setNombre] = useState(empresa.nombre || '');
    const [razonSocial, setRazonSocial] = useState(empresa.razonSocial || '');
    const [administradorId, setAdministradorId] = useState(empresa.administrador.email || null);
    const [tipoVia, setTipoVia] = useState(empresa.tipoVia || '');
    const [nombreVia, setNombreVia] = useState(empresa.nombreVia || '');
    const [numVia, setNumVia] = useState(empresa.numVia || '');
    const [codigoPuerta, setCodigoPuerta] = useState(empresa.codigoPuerta || '');
    const [usuarios, setUsuarios] = useState(empresa.usuarios || []);

    let edit = false;

    

    const razonsocialsiglas = [
        "S.A", "S.L.", "S.C.A."
    ]

    if(empresa) edit = true;

    return ( <div>
        <Typography variant="h4" marginTop={4} marginBottom={2} align="left">{(edit)?`Editar empresa ${empresa.nombre}`:`Nueva empresa`}</Typography>

        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        width:'70%'
      }}
      noValidate
      autoComplete="off"
    >
      <div >
          
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

        <InputTexto formalName="Razón social" 
        required = {true}
          id = "razonsocial"
          property={razonSocial} 
          setProperty={setRazonSocial} 
          errores={errores.razonsocial || null} />

        <InputTexto formalName="Tipo de vía" 
        required = {true}
          id = "tipovia"
          property={tipoVia} 
          setProperty={setTipoVia} 
          errores={errores.tipovia || null} />

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

        {/**OBTENER USUARIOS DEL STATE */}
        <FormLabel for="administrador">Administrador</FormLabel>
        <Autocomplete
        options={optionsUsuarios}
        defaultValue={administradorId}
        value={administradorId}
        onChange={()=>setAdministradorId()}
        id="administrador"
        renderInput={(params) => (
            <TextField {...params} label="Miembros" variant="standard" />
          )}
        />

        
        
      </div>
    </Box>

        <Box>
        <FormLabel for="usuarios">Añadir/quitar usuarios</FormLabel>
        <TextField
          id=""
          label="Búsqueda de usuarios por email"
          defaultValue="Usuario"
        />
        <List>
            {usuarios.map((usuario)=>{
                return(
                    <ListItem 
                    value={usuario}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                        <ListItemAvatar>
                        <Avatar>
                        <PersonIcon />
                        </Avatar>
                        </ListItemAvatar>    
                    {usuario.email} </ListItem>
                )
            })}
            
        </List>
        </Box>

        <input type="submit" value="Editar/crear"/>
    </div> );
}

const ErroresCampo = (props)=>{

    const errores = props.errores;
    
    let array = [];

    for(let key in errores){
        array.push(errores[key])
    }

    return(
        array.map(error=>{
            return(
                <FormHelperText>{error}</FormHelperText>
            )
        })
    )
    
}

const InputTexto = (props)=>{

    const id = props.id;
    const property = props.property;
    const setProperty = props.setProperty;
    const errores = props.errores;
    const formalName = props.formalName;
    const required = props.required;

    return(
        <FormControl variant="standard" sx={{margin:1}}>
            <InputLabel htmlFor={`${id}`}>{formalName}</InputLabel>
            <Input
            required={(required)?"true":"false"}
            error={(errores === null)?false:true}
            id={`${id}`}
            value={property}
            defaultValue={property}
            onChange={()=>setProperty()}
            />

                {(errores)?<ErroresCampo errores={errores}/>:null}

          </FormControl>
    )

}
 
export default CompanyForm;