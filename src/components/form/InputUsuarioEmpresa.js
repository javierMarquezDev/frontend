import { useEffect, useState } from "react";
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
import InputTexto from "./InputTexto";
import ControlEmpresa from "../../back/control/controlEmpresa";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import { useHistory } from "react-router-dom";
import ControlUsuario from "../../back/control/controlUsuario";
import ErroresCampo from "./ErroresCampo";

const InputUsuarioEmpresa = (props) => {

    const usuarios = props.usuarios;
    const tabla = props.tabla;
    const setUsuarios = props.setUsuarios;
    const opciones = props.opciones;
    const erroresForm = props.errores;

    const [usuarioNuevo, setUsuarioNuevo] = useState(null);
    const [errores, setErrores] = useState(null);
    const [isPending, setIsPending] = useState(true);

    //Obtener usuarios de empresa
    useEffect(() => {
        const abortCont = new AbortController();

        setUsuarios(usuarios || []);
  
        setTimeout(()=>{

            setIsPending(false)

        }, 1000)

        return abortCont.abort();
    },[tabla,usuarios]);


    //Añadir usuario
    const nuevoUsuario = () =>{

        setIsPending(true);

        //Comprobar si existe
        ControlUsuario.getById(usuarioNuevo)
        .then(data => {
            if(data.error){

                console.log(data)
                
                setErrores({"usuario":data});
                setIsPending(false);
                
                return;
            }else{
                    setErrores(null);
                    let array = usuarios;

                    if(array.find(element => element.email == usuarioNuevo) === undefined){
                        array.push({email:usuarioNuevo})
                        setUsuarios(array);
                        
                    }

                    setIsPending(false);
        
            }
        
            })
        
    }

    const deleteUsuario = (eliminado) =>{

        let array = usuarios;
        let nuevoArray = array.filter(element => element.email != eliminado.email)
        console.log(nuevoArray)
        setUsuarios(nuevoArray);
        
    }

    const promoteUser = (usuario, tabla) => {
        if(Empresa.prototype.isPrototypeOf(tabla)){

            ControlEmpresa.promoteUsuario(usuario,tabla);

        }
    }


    const degradeUser = (usuario, tabla)=>{

        if(Empresa.prototype.isPrototypeOf(tabla)){

            ControlEmpresa.degradeUsuario(usuario,tabla);

        }

    }

    return ( 
        <Grid container>
            <Grid item xs={12}>
                <Box margin={2}>
                    <Typography htmlFor="usuarios" align="left" fontSize={11}>Añadir o quitar usuarios</Typography>

                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
        
                        {(!opciones)?<InputTexto formalName="Usuario nuevo" 
                        required = {false}
                        id = "usuarionuevo"
                        property={usuarioNuevo} 
                        setProperty={setUsuarioNuevo} 
                        errores={(errores != null)?errores.usuario:null} />
                        :
                        <Box >
                            <Autocomplete
                            
                            options={opciones}
                            value={{email:usuarioNuevo}}
                            onChange={(e,value)=>setUsuarioNuevo(value.email)}
                            getOptionLabel={option => option.email}
                            id="usuarios"
                            selectOnFocus
                            sx={{width:'20%'}}
                            renderInput={(params) => (
                                <TextField {...params} label="Miembros de la empresa" variant="standard" />
                                )}
                            />
                            
                            <ErroresCampo errores={(erroresForm != null)?erroresForm:null}/>
                        </Box> 
                    }
                    
                    
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
                                <IconButton edge="end" aria-label="delete" onClick={()=>deleteUsuario(usuario)}>
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
 
export default InputUsuarioEmpresa;