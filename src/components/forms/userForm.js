import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Usuario from "../../back/model/Usuario";
import InputTexto from "../form/InputTexto";

const UserForm = () => {

    let usuario = new Usuario();
    let errores = {};

    const [email,setEmail] = useState(usuario.email || '');
    const [dni,setDni] = useState(usuario.dni || '');
    const [nombre,setNombre] = useState(usuario.nombre || '');
    const [apellido1,setApellido1] = useState(usuario.apellido1 || '');
    const [apellido2,setApellido2] = useState(usuario.apellido2 || '');
    const [tipoVia,setTipoVia] = useState(usuario.tipoVia || '');
    const [nombreVia,setNombreVia] = useState(usuario.nombreVia || '');
    const [numVia,setNumVia] = useState(usuario.numVia || '');
    const [codigoPuerta,setCodigoPuerta] = useState(usuario.codigoPuerta || '');

    const tiposVia = [
        {label:"C./", id:"C./"},
        {label:"Avda./", id:"Avda./"},
        {label:"Ctra./", id:"Ctra./"},
        {label:"Pza./", id:"Pza./"}
    ];

    return ( <div>
        <Typography align="left">Editar usuario {(usuario.email==null)?"nuevo":""}</Typography>

        
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            width:'70%'
          }}
          noValidate
          autoComplete="off"
        >
            <InputTexto formalName="Dirección de e-mail" 
                        required = {true}
                        id = "email"
                        property={email} 
                        setProperty={setEmail} 
                        errores={errores.email || null}
                        multiline={true}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="DNI" 
                        required = {true}
                        id = "dni"
                        property={dni} 
                        setProperty={setDni} 
                        errores={errores.dni || null}
                        multiline={true}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Nombre" 
                        required = {true}
                        id = "nombre"
                        property={nombre} 
                        setProperty={setNombre} 
                        errores={errores.nombre || null}
                        multiline={true}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Primer apellido" 
                        required = {true}
                        id = "apellido1"
                        property={apellido1} 
                        setProperty={setApellido1} 
                        errores={errores.apellido1 || null}
                        multiline={true}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Segundo apellido" 
                        required = {false}
                        id = "apellido2"
                        property={apellido2} 
                        setProperty={setApellido2} 
                        errores={errores.apellido2 || null}
                        multiline={true}
                        sx={{margin:2}}
                        />

            <Box sx={{margin:2}}>
                <Box display="flex">
                    {(tiposVia.length)?<Autocomplete
                    options={tiposVia}
                    defaultValue={tipoVia || "C./"}
                    value={tipoVia}
                    onChange={(e,value)=>setTipoVia(value)}
                    id="tipoVia"
                    renderInput={(params) => (
                        <TextField {...params} label="Tipo de vía" variant="standard" />
                        )}
                    />:null}
                </Box>
            </Box>

            <InputTexto formalName="Nombre de vía" 
                        required = {true}
                        id = "nombrevia"
                        property={nombreVia} 
                        setProperty={setNombreVia} 
                        errores={errores.nombrevia || null}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Número de vía" 
                        required = {true}
                        id = "numvia"
                        property={numVia} 
                        setProperty={setNumVia} 
                        errores={errores.numvia || null}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Código de puerta" 
                        id = "codigopuerta"
                        property={codigoPuerta} 
                        setProperty={setCodigoPuerta} 
                        errores={errores.codigoPuerta || null}
                        sx={{margin:2}}
                        />
            </Box>

        <Button variant="contained">Terminar</Button>
    </div> );
}
 
export default UserForm;