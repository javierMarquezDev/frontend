import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import UserDetail from "../details/userDetail";
import DataTable from "../tables/dataTable";
import notificar from '../home/notificar';
import { useHistory} from 'react-router-dom';
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";

const GroupUserList = (props) => {

    const {grupocodigo,grupoempresa} = useParams();
    const history = useHistory();
    

    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    
    const match = useRouteMatch();
    const [usuarios,setUsuarios] = useState(null)
    const [isPending,setIsPending] = useState(true)
    const [grupo,setGrupo] = useState(null);

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlGrupo.getUsuariosFromGrupo({codigo:grupocodigo,empresa:{nif:grupoempresa}})
            .then(data=>{
                
                setUsuarios(data);
                

                ControlGrupo.getById({nif:grupoempresa},grupocodigo)
                .then(data => {
                    console.log(data)
                    if(data.administrador.email == usuario.email) data.admin = true
                    setGrupo(data);
                    
                    setIsPending(false);
                })
                
            })
        }, 1000)

        return abortCont.abort();

    },[grupocodigo,grupoempresa])

    const handleDelete = (usuario) => {
        ControlGrupo.deleteUser(usuario.email, grupocodigo, grupoempresa)
        .then(data => {
            notificar(data.message);
            history.go(0)
        })
    }
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {grupo && <Typography variant="h5" align="left" marginTop={3} marginBottom={3}>Usuarios grupo "{grupo.nombre}"</Typography>}

                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {(usuarios && grupo) && <InfoUsuarios handleDelete={handleDelete} usuarios={usuarios} grupo={grupo} match={match}/> }

            </Route>
            <Route path={`${match.path}/:idusuario`}>
                <UserDetail/>
            </Route>
        </Switch>
        </div>
     );
}

const InfoUsuarios = (props)=>{

    const usuarios = props.usuarios;
    const match = props.match;
    const grupo = props.grupo;
    const handleDelete = props.handleDelete;

    return(
        <Stack spacing={3} marginTop={3} sx={{width:'70%'}}>
                    {usuarios.map((usuario)=>{
                        return(
                            <Box sx={{padding:2, boxShadow:2, width:'100%'}} display="flex">
                                
                                <Box>

                                    <Typography align="left" align="left" marginRight={1} >{usuario.nombre}&nbsp;{usuario.apellido1}&nbsp;{(usuario.apellido2)?usuario.apellido2:""}</Typography>
                                    <Typography align="left" sx={{fontSize:12}} marginRight={1} >{usuario.email}</Typography>

                                </Box>
                                    
                                    <Button variant="outlined" sx={{marginRight:1, marginLeft:1}}><Link to={`${match.url}/${usuario.email}`} style={{textDecoration:"none"}}>VER</Link></Button>
                                    {(grupo.admin)?<Button onClick={()=>handleDelete(usuario)} variant="contained">ELIMINAR</Button>:""}
                                
                            </Box>
                        );
                    })}
                </Stack>
    )

}
 
export default GroupUserList;