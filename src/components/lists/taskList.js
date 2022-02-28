import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import GroupDetail from "../details/groupDetail";
import NewsDetail from '../details/newsDetail';
import TaskDetail from "../details/taskDetail";
import DataTable from "../tables/dataTable";
import ControlTarea from "../../back/control/controlTarea"

const handleCheck = (tarea) =>{

}

const NewsList = () => {
    const {empresa} = useParams();
    const {codigo} = useParams();
    const match = useRouteMatch();

    const grupo = {
        codigo:codigo,
        empresa:{nif:empresa},
        nombre:"RRHH",
        descripcion:"Proyecto Recursos Humanos",
        administrador:"higo@gmail.com",
        fechaHora:"2022-02-03",
        finalizado:false,
        admin:false
    };

    const [tareas, setTareas ] = useState(null)
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        
        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlTarea.getFromGrupo(grupo.empresa.nif, grupo.codigo)
            .then(data=>{
                
                setTareas(data);
                setIsPending(false);
                
            })
        }, 1000)

        return abortCont.abort();

    }, [grupo]);
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <Typography variant="h3" align="left">{`Tareas "${grupo.nombre}"`}</Typography>

                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                { tareas && <InfoTareas tareas={tareas} match={match} grupo={grupo} /> }

            </Route> 
            <Route path={`${match.url}/:grupoempresa/:grupocodigo/:codigo`}>
                <TaskDetail/>
            </Route>
        </Switch>
        </div>
     );
}

const InfoTareas = props =>{

    const tareas = props.tareas;
    const grupo = props.grupo;
    const match = props.match;
    const usuario = {email:"higo@gmail.com"}
    return(
        <Stack spacing={3} marginTop={3}>
                    {tareas.map((tarea)=>{
                        return(
                            <Card sx={{padding:1, backgroundColor:(tarea.checked)?'text.disabled':''}}>
                                <CardContent sx={{flexDirection:"row"}}>
                                    <Typography align="left" sx={{flexGrow:1, fontWeight:"bold"}}>{tarea.nombre}</Typography>
                                    <Typography align="left" sx={{flexGrow:1}}>{tarea.descripcion}</Typography>
                                    <Typography align="left" sx={{flexGrow:1}}>{tarea.fechaHora}</Typography>
                                    <Typography align="left" sx={{flexGroboldw:1, fontSize:12}}>{tarea.grupo.nombre}</Typography>
                                    <Link to={`${match.url}/${tarea.grupo.empresa}/${tarea.grupo.codigo}/${tarea.codigo}`}><Typography align="left" sx={{flexGrow:1, fontSize:12}}>Ver detalle</Typography></Link>
                                </CardContent>
                                <CardActions sx={{flexDirection:"row-reverse"}}>
                                    {(grupo.admin)?<Button>EDITAR</Button>:""}
                                    {(grupo.admin)?<Button>ELIMINAR</Button>:""}
                                    {(tarea.atareado.email == usuario.email)?<Button onClick={()=>{handleCheck(tarea)}}>{(tarea.checked)?'NO HECHA':'HECHA'}</Button>:""}
                                </CardActions>
                            </Card>
                        );
                    })}
                </Stack>
    )
}
 
export default NewsList;