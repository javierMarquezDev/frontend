import { Box, Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import GroupDetail from "../details/groupDetail";
import NewsDetail from '../details/newsDetail';
import TaskDetail from "../details/taskDetail";
import DataTable from "../tables/dataTable";
import ControlTarea from "../../back/control/controlTarea"
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import TaskForm from "../forms/taskForm";

const handleCheck = (tarea) =>{

}

const TaskList = () => {
    const {grupoempresa} = useParams();
    const {grupocodigo} = useParams();
    const match = useRouteMatch();

    const usuario = {email:"higo@gmail.com"}

    const [tareas, setTareas ] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [admin,setAdmin] = useState(false);

    useEffect(() => {
        
        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlTarea.getFromGrupo(grupoempresa, grupocodigo)
            .then(data=>{
                
                setTareas(data);
                    setIsPending(false);
                
            })

            ControlGrupo.getById({nif:grupoempresa},grupocodigo)
            .then(res =>{
                if(res.administrador.email === usuario.email)
                    setAdmin(true);
            })
        }, 1000)

        return abortCont.abort();

    }, [grupoempresa,grupocodigo]);
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <Typography variant="h3" align="left">{`Tareas`}</Typography>

                {(admin)?<Button variant="contained"><Link to={`${match.url}/crear`}>Crear tarea</Link></Button>:""}

                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                { tareas && <InfoTareas tareas={tareas} match={match} grupocodigo={grupocodigo} grupoempresa={grupoempresa} match={match}/> }

            </Route> 
            <Route exact path={`${match.path}/:codigo/editar`}>
                <TaskForm/>
            </Route>
            <Route exact path={`${match.path}/crear`}>
                <TaskForm/>
            </Route>
            <Route path={`${match.path}/:codigo`}>
                <TaskDetail/>
            </Route>
            
            
        </Switch>
        </div>
     );
}

const InfoTareas = props =>{

    const tareas = props.tareas;
    const match = props.match;
    const usuario = {email:"higo@gmail.com"}
    const grupoempresa = props.grupoempresa;
    const grupocodigo = props.grupocodigo;

    return(
        <Stack spacing={3} marginTop={3}>
                    {tareas.map((tarea)=>{
                        return(
                            <Card sx={{padding:1, backgroundColor:(tarea.checked)?'text.disabled':''}}>
                                <CardContent sx={{flexDirection:"row"}}>
                                    <Typography align="left" sx={{flexGrow:1, fontWeight:"bold"}}>{tarea.nombre}</Typography>
                                    <Typography align="left" sx={{flexGrow:1}}>{tarea.descripcion}</Typography>
                                    <Typography align="left" sx={{flexGrow:1}}>{tarea.fechaHora.getFullYear()+"-"+tarea.fechaHora.getMonth()+
                                    "-"+tarea.fechaHora.getDate()+` `+tarea.fechaHora.getHours().toString().padStart(2,'0')+":"
                                    +tarea.fechaHora.getMinutes().toString().padStart(2,'0')+"h"}</Typography>
                                    <Typography align="left" sx={{flexGroboldw:1, fontSize:12}}>{tarea.grupo.nombre}</Typography>
                                    <Link to={`${match.url}/${tarea.codigo}`}><Typography align="left" sx={{flexGrow:1, fontSize:12}}>Ver detalle</Typography></Link>
                                </CardContent>
                                <CardActions sx={{flexDirection:"row-reverse"}}>
                                    <ActionsAdmin grupoempresa={grupoempresa} grupocodigo={grupocodigo} tarea={tarea} usuario={usuario} match={match}/>
                                    {(tarea.atareado.email == usuario.email)?<Button variant="contained" onClick={()=>{handleCheck(tarea)}}>{(tarea.checked)?'NO HECHA':'HECHA'}</Button>:""}
                
                                </CardActions>
                                
                            </Card>
                            
                        );
                    })}
                </Stack>
    )
}

const ActionsAdmin = (props)=>{
    const grupocodigo = props.grupocodigo;
    const grupoempresa = props.grupoempresa;
    const usuario = props.usuario;
    const tarea = props.tarea;
    const match = props.match;

    const [grupo,setGrupo] = useState(null)
    const [isPending, setIsPending] = useState(true);


    useEffect(() => {
        
        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlGrupo.getById({nif:grupoempresa},grupocodigo)
            .then(data=>{
                if(data.administrador.email == usuario.email){
                    data.admin = true;
                }else{
                    data.admin = false;
                }

                setGrupo(data);
                setIsPending(false);
            })
        }, 1000)

        return abortCont.abort();

    }, [grupo]);

    const Info = props =>{

        const grupo = props.grupo;

        return(
            <Box>
                {(grupo.admin)?<Button><Link to={`${match.url}/${tarea.codigo}/editar`}>EDITAR</Link></Button>:""}
                {(grupo.admin)?<Button>ELIMINAR</Button>:""}
            </Box>
            
        )
    }    

    return(
        <Box>
            { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
            {grupo && <Info grupo={grupo}/>}
        </Box>
    )
}
 
export default TaskList;