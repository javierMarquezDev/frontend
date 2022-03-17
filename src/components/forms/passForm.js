import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../App";
import ControlSesion from "../../back/control/controlSesion";
import ControlUsuario from "../../back/control/controlUsuario";
import InputTexto from "../form/InputTexto";
import useNotificar from "../home/notificar";

const PassForm = () => {

    const notificar = useNotificar();

    const history = useHistory();

    const valueSesion = React.useContext(UserContext);
    const usuario = valueSesion.usuario;

    const [nuevaPass, setNuevaPass] = useState('');
    const [antPass, setAntPass] = useState('');
    const [errores,setErrores] = useState({});

    const handleSubmit = ()=>{

        ControlSesion.checkPass(usuario,antPass)
        .then(data => {
            console.log(data)
            if(data){

                ControlUsuario.changePass(usuario,nuevaPass)
                .then(data => {
                    
                    if(data.message){
                        notificar({type:'SUCCESS',message:data.message})
                        history.push(`/${usuario.email}/perfil`);
                    }else{
                        notificar({type:'ERROR',message:'Credenciales no válidas.'})
                        setErrores(data)
                    }
                })

            }else{
                notificar({type:'ERROR',message:'Contraseña antigua incorrecta.'})
                setErrores({anterior:{valid:'La contraseña no es correcta.'}})

            }
                
        })

    }

    return ( 
        <Box display="flex" sx={{width:'15%'}}>

            <Grid container>
                <Grid item xs={12}>

                    <InputTexto formalName="Contraseña anterior" 
                            required = {true}
                            id = "contrasenaAnt"
                            property={antPass} 
                            setProperty={setAntPass} 
                            errores={errores.anterior || null}
                            
                            password={true}
                            sx={{margin:2,width:'100%'}}
                    />

                </Grid>

                <Grid item xs={12}>

                    <InputTexto formalName="Contraseña nueva" 
                            required = {true}
                            id = "contrasenaNueva"
                            property={nuevaPass} 
                            setProperty={setNuevaPass} 
                            errores={errores.contrasena || null}
                            
                            password={true}
                            sx={{margin:2,width:'100%'}}
                    />

                </Grid>

                <Grid item xs={12}>

                    <Button variant="contained" sx={{margin:2, width:'100%'}} onClick={()=>handleSubmit()}>
                        Continuar
                    </Button>

                </Grid>
            </Grid>
        </Box>
     );
}
 
export default PassForm;