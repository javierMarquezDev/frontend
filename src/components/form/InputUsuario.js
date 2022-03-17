import React, { useEffect, useState } from "react";
import Empresa from "../../back/model/Empresa";
import GrupoProyecto from "../../back/model/GrupoProyecto";
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
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Grid from "@mui/material/Grid"
import InputTexto from "../form/InputTexto";
import ControlEmpresa from "../../back/control/controlEmpresa";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import { useHistory } from "react-router-dom";
import ControlUsuario from "../../back/control/controlUsuario";
import ErroresCampo from "./ErroresCampo";
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";

const InputUsuario = (props) => {


    const history = useHistory();
    const usuarios = props.usuarios;
    const tabla = props.tabla;
    const admin = props.admin;
    const empresa = props.empresa;
    const setUsuarios = props.setUsuarios;
    
    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    const [usuarioNuevo, setUsuarioNuevo] = useState(null);
    const [usuariosNuevos, setUsuariosNuevos] = useState([]);
    const [errores, setErrores] = useState(null);
    const [usuariosEmpresa, setUsuariosEmpresa] = useState([])
    const [isPending, setIsPending] = useState(true);

    //Obtener usuarios de empresa
    useEffect(() => {
        const abortCont = new AbortController();

        //setUsuarios(usuarios || [])
  
        setTimeout(()=>{

            ControlEmpresa.getUsuariosByEmpresa(empresa)
            .then(data => {
                setUsuariosEmpresa(data);
                setIsPending(false)
            })

        }, 1000)

        return abortCont.abort();
    },[empresa,usuarios]);


    //Añadir usuario
    const nuevoUsuario = () =>{

        setIsPending(true)
        console.log(usuarioNuevo)


        //Comprobar si existe

        if(usuarioNuevo != null){
            ControlUsuario.getById(usuarioNuevo.email)
            .then(data => {
                if(data.error){
                    setErrores({"usuario":data});
                    setIsPending(false);
                    return;
                }else{
            
                    setErrores(null)

                    let array = usuarios;

                    if(array.find(element => element.email == usuarioNuevo.email) === undefined){
                    
                        
                        array.push(usuarioNuevo)

                        setUsuarios(array)
                        
                    }

                    setIsPending(false)

                }
                
            })
        }
        
        
        
    }

    const deleteUsuario = (eliminado, tabla) =>{

        let array = usuarios;
        let nuevoArray = array.filter(element => element.email != eliminado.email)
        
        setUsuarios(nuevoArray);
        
    }

    return ( 
        <Grid container>
            <Grid item xs={12}>
                <Box margin={2}>
                    <Typography htmlFor="usuarios" align="left" fontWeight="bold">Añadir o quitar usuarios</Typography>

                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }

                    {(usuariosEmpresa) && <Box display="flex">
                        <Autocomplete
                        options={usuariosEmpresa}
                        value={usuarioNuevo}
                        onChange={(e,value)=>setUsuarioNuevo(value)}
                        getOptionLabel={option => option.email}
                        id="usuarios"
                        selectOnFocus
                        sx={{width:'20%'}}
                        renderInput={(params) => (
                            <TextField {...params} label="Miembros de la empresa" variant="standard" />
                            )}
                        />
                        <ErroresCampo errores={(errores != null)?errores.usuario:null}/>
                    </Box>}
                    
                </Box>


            </Grid>
            <Grid item xs={12}>
                <Box display="flex" margin={2}>
                    <Button variant="contained" onClick={()=>nuevoUsuario()}>
                        Añadir usuario
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <List sx={{width:'70%'}}>
                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                    {usuarios.map((usuario)=>{
                        return(
                            <ListItem 
                            value={usuario}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={()=>deleteUsuario(usuario,tabla)}>
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
                    })
                }
                    
                </List>
            </Grid>
        </Grid>
     );
}
 
export default InputUsuario;