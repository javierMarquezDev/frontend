import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserDetail from "../details/userDetail";
import NewUserGroupForm from "../forms/newUserGroupForm";
import DataTable from "../tables/dataTable";

const GroupUserList = () => {
    const {codigo,empresa} = useParams();
    const match = useRouteMatch();

    const grupo = {
        codigo:1,
        empresa:"E98765432",
        nombre:"RRHH",
        descripcion:"Proyecto RRHH",
        finalizado:false,
        fechaHora:"2022-03-03",
        admin:true
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
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <h1>Usuarios grupo "{grupo.nombre}"</h1>

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
                                    {(grupo.admin)?<Button variant="contained">ELIMINAR</Button>:""}
                                
                            </Box>
                        );
                    })}
                </Stack>

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
 
export default GroupUserList;