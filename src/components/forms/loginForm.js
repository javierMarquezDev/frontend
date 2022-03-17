import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button"
import React, { useContext, useState } from "react";
import ControlSesion from "../../back/control/controlSesion";
import InputTexto from "../form/InputTexto";
import { useHistory } from "react-router-dom";
import {UserContext } from "../../App";
import useNotificar from "../home/notificar";

const LoginForm = () => {

    //Gestionar redirección programática
    const history = useHistory();

    //Gestionar notificaciones
    const notificar = useNotificar();

    //Información de usuario
    const {usuario,setUsuario,token,setToken} = React.useContext(UserContext);


    //Submit formulario
    const submit = ()=>{
        ControlSesion.createSesion(email,contrasena)
        .then(data => {
            console.log(data)
            if(data.error != null){
                setErrores(data.error);
                notificar({type:"ERROR",message:"Error al iniciar sesión"})
                
            }else{
                setUsuario(data.usuario);
                setToken(data.token);
                notificar({type:"SUCCESS",message:"Sesión iniciada con éxito."})
                history.push('/')
            }
        })
    }

    const [email,setEmail] = useState('');
    const [contrasena,setContrasena] = useState('');
    const [errores,setErrores] = useState([]);


    return ( <div>
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            width:'70%'
        }}
        noValidate
        autoComplete="off"
        >
            <Typography variant="h5" sx={{marginTop:3}}>Inicio de sesión</Typography>

            <Grid container>
                <Grid element xs={12} margin={2}>

                    <InputTexto formalName="Correo electrónico" 
                            required = {true}
                            id = "email"
                            property={email} 
                            setProperty={setEmail} 
                            errores={errores.email || null}
                            
                            />

                </Grid>
                <Grid element xs={12} margin={2}>

                    <InputTexto formalName="Contraseña" 
                            required = {true}
                            id = "contrasena"
                            property={contrasena} 
                            setProperty={setContrasena} 
                            errores={errores.contrasena || null}
                            password={true}
                            />
                    
                </Grid>
                <Grid element xs={12} margin={2}>
                    <Button variant="contained" onClick={()=>submit()}>Iniciar sesión</Button>
                </Grid>
            </Grid>
            

            

            
        </Box>
    </div> );
}
 
export default LoginForm;