import { Box, Button, Stack, Typography } from "@mui/material";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserDetail from "../details/userDetail";
import NewUserCompanyForm from "../forms/newUserCompanyForm";
import DataTable from "../tables/dataTable";

const handleDelete = (usuario)=>{}

const CompanyUserList = () => {
    const {nif} = useParams();
    const match = useRouteMatch();

    const empresa = {
        nif:"E9876543",
        nombre:"Aceites Benatae S.A.",
        razonsocial:"Benatae SA",
        tipovia:"C./",
        nombrevia:"Hernani",
        numvia:"51",
        codigopuerta:"2A",
        admin: true
    }

    const usuarios = [
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"},
        {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"}
    ]

    const deleteUsuario = (usuario)=>{

    }
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>

                <h1>Usuarios empresa "{empresa.nombre}"</h1>

                <Button variant="contained"><Link to={`${match.url}/nuevousuario`} style={{textDecoration:"none", color:"white"}}>Añadir usuario</Link></Button>

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
            </Route> 
            <Route path={`${match.url}/:idusuario`}>
                <UserDetail/>
            </Route>
            <Route path={`${match.url}/nuevousuario`}>
                <NewUserCompanyForm/>
            </Route>
        </Switch>
        </div>
     );
}
 
export default CompanyUserList;