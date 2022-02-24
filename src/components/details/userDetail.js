import { Link, useRouteMatch } from "react-router-dom";
import UserForm from "../forms/userForm";
import { useParams, Switch, Route } from "react-router-dom";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { List, ListItem } from "@mui/material";

const handleDelete = (usuario)=>{}

const UserDetail = () => {

    const match = useRouteMatch();
    const {id} = useParams();

    const usuario = {
        nombre: "Rodrigo",
        apellido1: "Díaz",
        apellido2: "de Vivar",
        email: "higo@gmail.com",
        grupos: [
            {codigo:1, empresa:"E98765432", nombre:"RRHH", descripcion:"Proyecto RRHH"},
            {codigo:1, empresa:"E98765432", nombre:"RRHH", descripcion:"Proyecto RRHH"}
        ],
        empresas: [
            {nif:"E98765432", nombre:"Aceites Benatae SA", razonsocial:"Benatae SA"},
            {nif:"E98765432", nombre:"Aceites Benatae SA", razonsocial:"Benatae SA"},
            {nif:"E98765432", nombre:"Aceites Benatae SA", razonsocial:"Benatae SA"}
        ],
        tipovia:"C./",
        nombrevia:"Hernani",
        numvia:51,
        codigopuerta:"2A",
        editable:true,
        adminGrupo:true,
        adminEmpresa:true,
        tareas:[
            {codigo:1,nombre:"Comprar patatas", descripcion:"Comprar patatas para la cena de empresa",
            grupo:{codigo:1, empresa:{nif:"E98765432"}}},
            {codigo:1,nombre:"Comprar patatas", descripcion:"Comprar patatas para la cena de empresa",
            grupo:{codigo:1, empresa:{nif:"E98765432"}}},
            {codigo:1,nombre:"Comprar patatas", descripcion:"Comprar patatas para la cena de empresa",
            grupo:{codigo:1, empresa:{nif:"E98765432"}}},
            {codigo:1,nombre:"Comprar patatas", descripcion:"Comprar patatas para la cena de empresa",
            grupo:{codigo:1, empresa:{nif:"E98765432"}}},
            {codigo:1,nombre:"Comprar patatas", descripcion:"Comprar patatas para la cena de empresa",
            grupo:{codigo:1, empresa:{nif:"E98765432"}}}
        ]
    }

    return ( <div>
        <Switch>
            <Route exact path={`${match.path}`}>
                <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Información de {usuario.nombre}&nbsp;{usuario.apellido1}&nbsp;{usuario.apellido2}</Typography>

                    {(usuario.editable?<BotonesEditable match={match} handleDelete={handleDelete} usuario={usuario}/>:null)}
                
                    <Grid container spacing={2} marginTop={2}>

                        <Grid item xs={6} sx={{padding:1}}>
                            <Box id="nombre" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Nombre completo</Typography>
                                <Box display="flex">
                                    <Typography id="nombre"  align="left">{usuario.nombre}</Typography>&nbsp;
                                    <Typography id="apellido1" align="left">{usuario.apellido1}</Typography>&nbsp;
                                    <Typography id="apellido2" align="left">{usuario.apellido2}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sx={{padding:1}}>
                            <Box id="email" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Dirección de e-mail</Typography>
                                <Typography id="email" align="left">{usuario.email}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={8} sx={{padding:1}}>
                            <Box id="direccion" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Dirección postal</Typography>
                                <Box display="flex" sx={{flexDirection:"row"}} align="left">
                                    <Typography id="tipovia" align="left">{usuario.tipovia}</Typography>&nbsp;
                                    <Typography id="nombrevia" align="left">{usuario.nombrevia}</Typography>&nbsp;
                                    <Typography id="numvia" align="left">{usuario.numvia}</Typography>&nbsp;
                                    <Typography id="codigopuerta" align="left">{usuario.codigopuerta}</Typography>&nbsp;
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4}></Grid>

                        <Grid item xs={4}>

                            {(usuario.editable)?<ListaEmpresas empresas={usuario.empresas} />:""}

                        </Grid>
                            
                        <Grid item xs={4}>

                            {(usuario.editable)?<ListaGrupos grupos={usuario.grupos} />:""}
                            
                        </Grid>

                        <Grid item xs={4}>

                            {(usuario.editable)?<ListaTareas tareas={usuario.tareas}/>:""}
                            
                        </Grid>

                        

                    </Grid>

            </Route>
            <Route path={`${match.path}/editar`}>
                <UserForm />
            </Route>
        </Switch>
    </div> );
}

const BotonesEditable = (props)=>{

    const usuario = props.usuario;
    const match = props.match;

    return(
        <Box display="contained">
            <Button variant="outlined">
                <Link to={`${match.url}/editar`} sx={{margin:1}} sx={{textDecoration:"none",color:"text.primary"}}>
                Editar</Link></Button>
            <Button onClick={()=>{handleDelete(usuario)}} variant="contained" sx={{margin:1}}>Eliminar</Button>
        </Box>
    )
}

const ListaGrupos = (props)=>{
    const grupos = props.grupos;

    return(

        <Box id="grupos" margin={1} padding={1}>
            <Typography sx={{fontSize:12, color:"text.secondary"}}>Grupos</Typography>
            <List spacing={2} sx={{height:300, overflowY:"scroll"}}>
                {grupos.map((grupo)=>{
                    return(
                        <ListItem id={grupo.empresa.nif+grupo.codigo} sx={{padding:1, overflow:"hidden"}}>
                        
                            
                                <Typography sx={{fontWeight:"bold", marginRight:2}}>{grupo.nombre}</Typography>
                                <Typography>{grupo.descripcion}</Typography>
                            
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    )
}

const ListaEmpresas = (props)=>{

    const empresas = props.empresas;

    return (

        <Box id="empresas" margin={1} padding={1}>
            <Typography sx={{fontSize:12, color:"text.secondary"}}>Empresas</Typography>
            <List spacing={2} sx={{height:300, overflowY:"scroll"}}>
                {empresas.map((empresa)=>{
                    return(
                        <ListItem id={empresa.nif} sx={{padding:1, overflow:"hidden"}}>
                            
                                <Typography sx={{fontWeight:"bold", marginRight:2}}>{empresa.nombre}</Typography>
                                <Typography>{empresa.razonsocial}</Typography>
                            
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    );

}

const ListaTareas = (props)=>{

    const tareas = props.tareas;

    return(

        <Box id="tareas" margin={1} padding={1}>
            <Typography sx={{fontSize:12, color:"text.secondary"}}>Tareas</Typography>
            <List spacing={2} sx={{height:300, overflowY:"scroll"}}>
                {tareas.map((tarea)=>{
                    return(
                        <ListItem id={tarea.grupo.empresa+tarea.grupo.codigo+tarea.codigo} sx={{padding:1, overflow:"hidden"}}>
                            
                                <Typography sx={{fontWeight:"bold"}} align="left">{tarea.nombre}</Typography>
                                <Typography align="left">{tarea.descripcion}</Typography>
                                <Typography align="left"><Link to={tarea.link}>Ver</Link></Typography>
                            
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    );
}
 
export default UserDetail;
