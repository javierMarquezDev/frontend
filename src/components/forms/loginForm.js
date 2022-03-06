import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button"
import React, { useState } from "react";
import ControlSesion from "../../back/control/controlSesion";
import InputTexto from "../form/InputTexto";
import notificar from "../home/notificar";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const LoginForm = () => {

    //Gestionar redirección programática
    const history = useHistory();

    const {usuario,setUsuario,token,setToken} = React.useContext(UserContext);

    //Submit formulario
    const submit = ()=>{
        ControlSesion.createSesion(email,contrasena)
        .then(data => {
            console.log(data)
            if(data.error != null){
                setErrores(data.error);
            }else{
                setUsuario(data.usuario);
                setToken(data.token);
                notificar(data);
                history.go(-1)
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