import { useState } from "react";
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

const InputUsuario = (props) => {

    const usuarios = props.usuarios;
    const tabla = props.tabla;
    const admin = props.admin;

    const [usuarioNuevo, setUsuarioNuevo] = useState(null);
    const [errores, setErrores] = useState(null);

    const nuevoUsuario = (nuevo, tabla) =>{

        if(Empresa.prototype.isPrototypeOf(tabla)){

            ControlEmpresa.addUsuario(tabla, nuevo, admin)

        }else if(GrupoProyecto.prototype.isPrototypeOf(tabla)){

            ControlGrupo.addUser(nuevo.email, tabla.codigo, tabla.empresa)
        }

    }

    const deleteUsuario = (eliminado, tabla) =>{

        if(Empresa.prototype.isPrototypeOf(tabla)){

            ControlEmpresa.deleteUsuario(tabla, eliminado)

        }else if(GrupoProyecto.prototype.isPrototypeOf(tabla)){

            ControlGrupo.deleteUser(eliminado.email, tabla.codigo, tabla.empresa)
        }
        
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
                <Box marginTop={3}>
                <Typography for="usuarios" align="left" fontWeight="bold">Añadir o quitar usuarios</Typography>

                <Box display="flex">
                    <InputTexto formalName="Añadir miembro" 
                    id = "usuarionuevo"
                    property={usuarioNuevo} 
                    setProperty={setUsuarioNuevo} 
                    errores={(errores != null)?errores:null} />
                </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" margin={2}>
                    <Button variant="contained" onClick={()=>nuevoUsuario(usuarioNuevo,tabla)}>
                        Añadir usuario
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <List sx={{width:'70%'}}>
                    {(usuarios != null)?usuarios.map((usuario)=>{
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
                    }):null}
                    
                </List>
            </Grid>
        </Grid>
     );
}
 
export default InputUsuario;