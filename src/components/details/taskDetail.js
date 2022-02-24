import { Link, useRouteMatch } from "react-router-dom";
import TaskForm from "../forms/taskForm";
import { useParams, Switch, Route } from "react-router-dom";
import GroupForm from "../forms/groupForm";
import TaskList from "../lists/taskList";
import GroupUserList from "../lists/groupUserList";
import CompanyUserList from '../lists/companyUserList';
import UserForm from "../forms/userForm";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"

const handleDelete = (tarea)=>{}

const handleCheck = (tarea)=>{

}

const TaskDetail = () => {

    const match = useRouteMatch();
    const {id} = useParams();

    const tarea = {
        codigo:17,
        grupo:{
            nombre:"RRHH",
            codigo:2,
            empresa:{
                nif:"E98765432",
                nombre:"Aceites Benatae S.A."
            },
            descripcion:"Proyecto RRHH"
        },
        fechaHora:new Date(2022,2,2),
        nombre:"Cocer patatas",
        descripcion:"Cocer patatas cena de empresa",
        checked:false,
        atareado:{
            nombre:"Rodrigo",
            email:"higo@gmail.com"
        },
        adminGrupo:true,
        asignado:true
    }

    return ( <div>
        <Switch>
            <Route exact path={`${match.path}`}>
                <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Información de la tarea "{tarea.nombre}"</Typography>

                {(tarea.adminGrupo?<BotonesEditable match={match} handleDelete={handleDelete} tarea={tarea}/>:null)}
                {(tarea.asignado)?(tarea.checked?<Button onClick={()=>{handleCheck(tarea)}}>Marcar como hecha</Button>:<Button onClick={()=>{handleCheck(tarea)}}>Marcar como no hecha</Button>):null}

                
                <Grid container spacing={2} marginTop={2}>

                        <Grid item xs={4}>
                            <Box id="nombre" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Nombre</Typography>
                                <Box display="flex">
                                    <Typography align="left">{tarea.nombre}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box id="descripcion" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Descripción</Typography>
                                <Box display="flex">
                                    <Typography align="left">{tarea.descripcion}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box id="fechahora" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Fecha límite</Typography>
                                <Box display="flex">
                                    <Typography align="left">{tarea.fechaHora.getFullYear()+"-"+tarea.fechaHora.getMonth()+"-"+tarea.fechaHora.getDate()}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box id="finalizado" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Estado</Typography>
                                <Box display="flex">
                                    <Typography align="left">{(tarea.checked)?"Finalizada":"En curso"}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box id="atareado" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Usuario asignado</Typography>
                                <Box display="flex">
                                    <Card id="atareado">
                                        {(tarea.atareado)?<InfoAutor atareado={tarea.atareado}/>:<Typography sx={{fontSize:12}} align="left">Sin información</Typography>}
                                    </Card>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box id="grupo" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Proyecto</Typography>
                                <Box display="flex">
                                    <Card id="grupo">
                                        {(tarea.grupo)?<InfoGrupo grupo={tarea.grupo}/>:<Typography sx={{fontSize:12}} align="left">Sin información</Typography>}
                                    </Card>
                                </Box>
                            </Box>
                        </Grid>
                </Grid>

            </Route>
            <Route path={`${match.path}/editar`}>4
                <TaskForm />
            </Route>
        </Switch>
    </div> );
}

const BotonesEditable = (props)=>{

    const tarea = props.tarea;
    const match = props.match;

    return(
        <Box display="contained">
            <Button variant="outlined">
                <Link to={`${match.url}/editar`} sx={{margin:1}} sx={{textDecoration:"none",color:"text.primary"}}>
                Editar</Link></Button>
            <Button onClick={()=>{handleDelete(tarea)}} variant="contained" sx={{margin:1}}>Eliminar</Button>
        </Box>
    )
}

const InfoGrupo = (props)=>{
    const grupo = props.grupo;

    return(
        <CardContent>
            <Typography align="left" sx={{fontWeight:"bold"}}>{grupo.nombre}</Typography>
            <Typography align="left">{grupo.descripcion}</Typography>
            <Typography align="left">{grupo.empresa.nombre}</Typography>
            <Link to={`/grupos/${grupo.empresa.nif}/${grupo.codigo}`}><Typography align="left" sx={{fontSize:10}}>Ver</Typography></Link>
        </CardContent>
    )
}

const InfoAutor = (props)=>{
    const atareado = props.atareado;

    return(
        <CardContent>
            <Typography align="left" sx={{fontWeight:"bold"}}>{atareado.nombre}</Typography>
            <Typography align="left">{atareado.email}</Typography>
        </CardContent>
    )
}
 
export default TaskDetail;