import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import ControlEmpresa from "../../back/control/controlEmpresa";
import UserDetail from "../details/userDetail";
import notificar from "../home/notificar";
import { useHistory } from "react-router-dom";

const CompanyUserList = (props) => {

    const empresa = props.empresa;
    const match = useRouteMatch();
    const [usuarios,setUsuarios] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const history = useHistory();
    


    const handleDelete = (usuario)=>{

        ControlEmpresa.deleteUsuario(empresa, usuario)
        .then(data => {
            notificar(data.message)
            history.go(0)
        })

    }

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlEmpresa.getUsuariosByEmpresa(empresa)
            .then(data=>{
                
                setUsuarios(data);
                setIsPending(false);
                
            })
        }, 1000)

        return abortCont.abort();

    },[empresa])
    
    return ( <div>
        {empresa && 
            <Switch>
            <Route exact path={match.path}>

            <Typography variant="h5" align="left" marginTop={3} marginBottom={3}>Usuarios empresa "{empresa.nombre}"</Typography>

                <Box>
                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                    {usuarios && <Usuarios handleDelete={handleDelete} usuarios={usuarios} match={match} empresa={empresa}/>}
                </Box>
                
            </Route> 
            <Route path={`${match.path}/:idusuario`}>
                <UserDetail/>
            </Route>
            
        </Switch>
        }</div>
     );
}

const Usuarios = (props) =>{

    const usuarios = props.usuarios;
    const match = props.match;
    const empresa = props.empresa;
    const handleDelete = props.handleDelete;

    console.log(usuarios);

    return(
        <Stack spacing={3} marginTop={3}>
                    {usuarios.map((usuario)=>{
                        return(
                            <Box sx={{padding:2, boxShadow:2}} display="flex">
                                
                                <Box>

                                    <Typography align="left" align="left" marginRight={1} >{usuario.nombre}&nbsp;{usuario.apellido1}&nbsp;{(usuario.apellido2)?usuario.apellido2:""}</Typography>
                                    <Typography align="left" sx={{fontSize:12}} marginRight={1} >{usuario.email}</Typography>

                                </Box>
                                    
                                    <Button variant="outlined" sx={{marginRight:1, marginLeft:1}}><Link to={`${match.url}/${usuario.email}`} style={{textDecoration:"none"}}>VER</Link></Button>
                                    {(empresa.admin)?<Button onClick={()=>handleDelete(usuario)} variant="contained">ELIMINAR</Button>:""}
                                
                            </Box>
                        );
                    })}
                </Stack>
    )

}
 
export default CompanyUserList;