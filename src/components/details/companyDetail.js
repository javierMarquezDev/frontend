import { Link, useRouteMatch } from "react-router-dom";
import CompanyForm from "../forms/companyForm";
import { useParams, Switch, Route } from "react-router-dom";
import CompanyUserList from '../lists/companyUserList';
import UserForm from "../forms/userForm";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { List, ListItem } from "@mui/material";

const handleDelete = (usuario)=>{}

const CompanyDetail = () => {

    const empresa = {
        nif:"E9876543",
        nombre:"Aceites Benatae S.A.",
        razonsocial:"Benatae SA",
        tipovia:"C./",
        nombrevia:"Hernani",
        numvia:"51",
        codigopuerta:"2A",
        admin: true,
        usuarios:[
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
    }

    const match = useRouteMatch();
    const {id} = useParams();

    return ( <div>
        <Switch>
            <Route exact path={`${match.path}`}>
                <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Información de {empresa.nombre}</Typography>

                {(empresa.admin?<BotonesEditable match={match} handleDelete={handleDelete} empresa={empresa}/>:null)}
                
                <Grid container spacing={2} marginTop={2}>

                        <Grid item xs={4} sx={{padding:1}}>
                            <Box id="nombre" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Nombre</Typography>
                                <Box display="flex">
                                    <Typography id="nombre"  align="left">{empresa.nombre}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4} sx={{padding:1}}>
                            <Box id="razonsocial" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Razón social</Typography>
                                <Box display="flex">
                                    <Typography id="nombre"  align="left">{empresa.razonsocial}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4} sx={{padding:1}}>
                            <Box id="nif" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">CIF</Typography>
                                <Box display="flex">
                                    <Typography id="nombre"  align="left">{empresa.nif}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={8} sx={{padding:1}}>
                            <Box id="direccion" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Dirección postal</Typography>
                                <Box display="flex" sx={{flexDirection:"row"}} align="left">
                                    <Typography id="tipovia" align="left">{empresa.tipovia}</Typography>&nbsp;
                                    <Typography id="nombrevia" align="left">{empresa.nombrevia}</Typography>&nbsp;
                                    <Typography id="numvia" align="left">{empresa.numvia}</Typography>&nbsp;
                                    <Typography id="codigopuerta" align="left">{empresa.codigopuerta}</Typography>&nbsp;
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4}></Grid>                    

                        <Grid item xs={4}>
                            {(empresa.admin)?<ListaUsuarios usuarios={empresa.usuarios} match={match} />:null}
                        </Grid>

                    </Grid>
            </Route>
            <Route path={`${match.path}/editar`}>
                <CompanyForm />
            </Route>
            <Route path={`${match.path}/usuarios`}>
                <CompanyUserList/>
            </Route>
        </Switch>
    </div> );
}

const ListaUsuarios = (props)=>{

    const usuarios = props.usuarios;
    const match = props.match;

    return(

        <Box id="usuarios" margin={1} padding={1}>
            <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Miembros</Typography>
            <Link to={`${match.url}/usuarios`} align="left"><Typography sx={{color:"text.primary", textDecoration:"none"}}>Ver</Typography> </Link>
            <List spacing={2} sx={{height:300, overflowY:"scroll"}}>
                {usuarios.map((usuario)=>{
                    return(
                        <ListItem id={usuario.email} sx={{padding:1, overflow:"hidden"}}>
                            
                            <Typography id="nombre"  align="left">{usuario.nombre}</Typography>&nbsp;
                            <Typography id="apellido1" align="left">{usuario.apellido1}</Typography>&nbsp;
                            <Typography id="apellido2" align="left">{usuario.apellido2}</Typography>
                            
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    );

}

const BotonesEditable = (props)=>{

    const empresa = props.empresa;
    const match = props.match;

    return(
        <Box display="contained">
            <Button variant="outlined">
                <Link to={`${match.url}/editar`} sx={{margin:1}} sx={{textDecoration:"none",color:"text.primary"}}>
                Editar</Link></Button>
            <Button onClick={()=>{handleDelete(empresa)}} variant="contained" sx={{margin:1}}>Eliminar</Button>
        </Box>
    )
}
 
export default CompanyDetail;