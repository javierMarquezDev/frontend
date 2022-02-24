import { Link, useRouteMatch } from "react-router-dom";
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

const handleDelete = (grupo) => {}

const GroupDetail = () => {
    const {id} = useParams();
    const match = useRouteMatch();

    const grupo = {codigo:1,
        empresa:"E765849",
        nombre:"RRHH",
        descripcion:"Proyecto recursos humanos",
        administrador:{
            email:"higo@gmail.com",
            nombre:"Rodrigo"
        },
        fechaHora:"2022-03-02",
        finalizado:false,
        admin: false,

    }

    return ( 
        <div>
            <Switch>
                <Route exact path={`${match.path}`}>
                    
                <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Información del grupo "{grupo.nombre}"</Typography>

                {(grupo.admin?<BotonesEditable match={match} handleDelete={handleDelete} grupo={grupo}/>:null)}

                <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={4} sx={{padding:1}}>
                            <Box id="nombre" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Nombre</Typography>
                                <Box display="flex">
                                    <Typography id="nombre"  align="left">{grupo.nombre}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4} sx={{padding:1}}>
                            <Box id="descripcion" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Descripción</Typography>
                                <Box display="flex">
                                    <Typography id="descripcion"  align="left">{grupo.descripcion}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4} sx={{padding:1}}>
                            <Box id="fechahora" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Fecha límite</Typography>
                                <Box display="flex">
                                    <Typography id="fechaHora"  align="left">{grupo.fechaHora}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4} sx={{padding:1}}>
                            <Box id="finalizado" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Estado</Typography>
                                <Box display="flex">
                                    <Typography id="finalizado"  align="left">{(grupo.finalizado)?"Finalizado":"En curso"}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4} sx={{padding:1}}>
                            <Box id="administrador" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Administrador</Typography>
                                <Box display="flex">
                                    <Card id="administrador">
                                        {(grupo.administrador.email)?<InfoAdmin admin={grupo.administrador}/>:<Typography sx={{fontSize:12}} align="left">Sin información</Typography>}
                                    </Card>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sx={{padding:1}}>
                            <Box id="administrador" margin={1} padding={1} display="flex">
                                <Link to={`${match.url}/usuarios`}><Button variant="contained">Miembros</Button></Link>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sx={{padding:1}}>
                            <Box id="administrador" margin={1} padding={1} display="flex">
                                <Link to={`${match.url}/tareas`}><Button variant="contained">Tareas</Button></Link>
                            </Box>
                        </Grid>
                </Grid>


                
                </Route>
                <Route path={`${match.path}/editar`}>
                    <GroupForm />
                </Route>
                <Route path={`${match.path}/eliminar`}>
                    Eliminar
                </Route>
                <Route path={`${match.path}/tareas`}>
                    <TaskList/>
                </Route>
                <Route path={`${match.path}/usuarios`}>
                    <GroupUserList/>
                </Route>
            </Switch>
        </div>
     );
}

const BotonesEditable = (props)=>{

    const grupo = props.grupo;
    const match = props.match;

    return(
        <Box display="contained">
            <Button variant="outlined">
                <Link to={`${match.url}/editar`} sx={{margin:1}} sx={{textDecoration:"none",color:"text.primary"}}>
                Editar</Link></Button>
            <Button onClick={()=>{handleDelete(grupo)}} variant="contained" sx={{margin:1}}>Eliminar</Button>
        </Box>
    )
}

const InfoAdmin = (props)=>{
    const admin = props.admin;

    return(
        <CardContent>
            <Typography align="left" sx={{fontWeight:"bold"}}>{admin.nombre}</Typography>
            <Typography align="left">{admin.email}</Typography>
        </CardContent>
    )
}
 
export default GroupDetail;