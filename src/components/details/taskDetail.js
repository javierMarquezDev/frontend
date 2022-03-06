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
import React, { useEffect, useState } from "react";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import ControlTarea from "../../back/control/controlTarea";
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";

const handleDelete = (tarea)=>{}

const handleCheck = (tarea)=>{

}

const TaskDetail = () => {

    const match = useRouteMatch();
    const {grupocodigo,grupoempresa,codigo} = useParams();
    const [tarea, setTarea] = useState(null)
    const [isPending,setIsPending] = useState(true);
    const [admin,setAdmin] = useState(false);

    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    useEffect(()=>{
        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlTarea.getById(grupoempresa,grupocodigo,codigo)
            .then(data=>{
                if(data.atareado.email == usuario.email)
                    {data.asignado = true;}
                else{
                    data.asignado = false;
                }

                setTarea(data);
                setIsPending(false)

                ControlGrupo.getById({nif:grupoempresa},grupocodigo)
                .then(res => {
                    if(res.administrador.email == usuario.email){
                        setAdmin(true);
                    }
                })
            })
        }, 1000)

        return abortCont.abort();

    },[grupoempresa,grupocodigo,codigo])
    

    return ( <div>
        <Switch>
            <Route exact path={`${match.path}`}>
                <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Información de la tarea</Typography>

                
                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {tarea && <InfoTarea tarea={tarea} match={match} grupocodigo={grupocodigo} grupoempresa={grupoempresa}/>}
                
            </Route>
            <Route path={`${match.path}/editar`}>4
                {(admin)
                ?<TaskForm />
                :<AccessDenied/>}
            </Route>
        </Switch>
    </div> );
}

const InfoTarea = (props)=>{

    const tarea = props.tarea;
    const match = props.match;
    const grupocodigo = props.grupocodigo;
    const grupoempresa = props.grupoempresa;

    return(
        <Grid container spacing={2} marginTop={2}>

                        <Grid item xs={12}>
                            {(tarea.asignado)?(tarea.checked?<Button onClick={()=>{handleCheck(tarea)}}>Marcar como no hecha</Button>:<Button onClick={()=>{handleCheck(tarea)}}>Marcar como hecha</Button>):null}
                        </Grid>

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
                                    <Typography align="left">{tarea.fechaHora.getFullYear()+"-"+(parseInt(tarea.fechaHora.getMonth())+1)+
                                    "-"+tarea.fechaHora.getDate()+` `+tarea.fechaHora.getHours().toString().padStart(2,'0')+":"
                                    +tarea.fechaHora.getMinutes().toString().padStart(2,'0')+"h"}</Typography>
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
                            <Box id="grupo" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Grupo</Typography>
                                <Box display="flex">
                                    <Card id="grupo">
                                        <InfoGrupo grupoempresa={grupoempresa} grupocodigo={grupocodigo}/>
                                    </Card>
                                </Box>
                            </Box>
                        </Grid>
                </Grid>

    )

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



const InfoAutor = (props)=>{
    const atareado = props.atareado;

    return(
        <CardContent>
            <Typography align="left" sx={{fontWeight:"bold"}}>{atareado.nombre}</Typography>
            <Typography align="left">{atareado.email}</Typography>
        </CardContent>
    )
}

const InfoGrupo = (props)=>{
    const grupoempresa = props.grupoempresa;
    const grupocodigo = props.grupocodigo;
    const [grupo,setGrupo] = useState(null)
    const [isPending,setIsPending] = useState(true);

    useEffect(()=>{
                const abortCont = new AbortController();

                setTimeout(()=>{
                    ControlGrupo.getById({nif:grupoempresa},grupocodigo)
                    .then(res=>{
                        setGrupo(res);
                        setIsPending(false);
                    })
                }, 1000)
        
                return abortCont.abort();
    },[])

    const Info = (props)=>{

        const grupo = props.grupo;

        return (
            <CardContent>
                <Typography align="left" sx={{fontWeight:"bold"}}>{grupo.nombre}</Typography>
                <Typography align="left">{grupo.descripcion}</Typography>
                <Typography align="left">{grupo.empresa.nif}</Typography>
        </CardContent>
        )
    }

    return(
        <Box>
            { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
            {grupo && <Info grupo={grupo}/>}
        </Box>
    )
}
 
export default TaskDetail;