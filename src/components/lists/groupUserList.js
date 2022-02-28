import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import UserDetail from "../details/userDetail";
import NewUserGroupForm from "../forms/newUserGroupForm";
import DataTable from "../tables/dataTable";

const GroupUserList = (props) => {
    const {codigo,empresa} = useParams();
    //const grupo = props.grupo
    const match = useRouteMatch();
    const [usuarios,setUsuarios] = useState(null)
    const [isPending,setIsPending] = useState(true)

    const grupo = {
        codigo:14,
        empresa:{
            nif:"E90671611"
        },
        nombre:"RRHH",
        descripcion:"Proyecto RRHH",
        finalizado:false,
        fechaHora:"2022-03-03",
        admin:true
    }

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlGrupo.getUsuariosFromGrupo(grupo)
            .then(data=>{
                
                setUsuarios(data);
                setIsPending(false);
                
            })
        }, 1000)

        return abortCont.abort();

    },[grupo])
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <Typography variant="h5" align="left" marginTop={3} marginBottom={3}>Usuarios grupo "{grupo.nombre}"</Typography>

                <Box display="flex">
                    <Button variant="contained"><Link to={`${match.url}/nuevousuario`} style={{textDecoration:"none", color:"white"}}>Añadir usuario</Link></Button>
                </Box>

                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {usuarios && <InfoUsuarios usuarios={usuarios} grupo={grupo} match={match}/> }

            </Route>
            <Route exact path={`${match.path}/nuevousuario`}>
                <NewUserGroupForm/>
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
                                    {(grupo.admin)?<Button variant="contained">ELIMINAR</Button>:""}
                                
                            </Box>
                        );
                    })}
                </Stack>
    )

}
 
export default GroupUserList;