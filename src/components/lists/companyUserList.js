import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import ControlEmpresa from "../../back/control/controlEmpresa";
import UserDetail from "../details/userDetail";
import NewUserCompanyForm from "../forms/newUserCompanyForm";
import DataTable from "../tables/dataTable";

const handleDelete = (usuario)=>{}

const CompanyUserList = (props) => {
    const empresa = props.empresa;
    const match = useRouteMatch();
    const [usuarios,setUsuarios] = useState(null);
    const [isPending, setIsPending] = useState(true);
    


    const deleteUsuario = (usuario)=>{

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

    })
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>

            <Typography variant="h5" align="left" marginTop={3} marginBottom={3}>Usuarios empresa "{empresa.nombre}"</Typography>

            <Box display="flex">
                <Button variant="contained"><Link to={`${match.url}/nuevousuario`} style={{textDecoration:"none", color:"white"}}>Añadir usuario</Link></Button>
            </Box>

                <Box>
                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                    {usuarios && <Usuarios usuarios={usuarios} match={match} empresa={empresa}/>}
                </Box>
                
            </Route> 
            <Route exact path={`${match.url}/nuevousuario`}>
                <NewUserCompanyForm/>
            </Route>
            <Route path={`${match.url}/:idusuario`}>
                <UserDetail/>
            </Route>
            
        </Switch>
        </div>
     );
}

const Usuarios = (props) =>{

    const usuarios = props.usuarios;
    const match = props.match;
    const empresa = props.empresa;

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
                                    
                                    <Button variant="outlined" sx={{marginRight:1, marginLeft:1}}><Link to={`${match.path}/${usuario.email}`} style={{textDecoration:"none"}}>VER</Link></Button>
                                    {(empresa.admin)?<Button onClick={()=>{handleDelete(usuario)}} variant="contained">ELIMINAR</Button>:""}
                                
                            </Box>
                        );
                    })}
                </Stack>
    )

}
 
export default CompanyUserList;