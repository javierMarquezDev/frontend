import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import GroupDetail from "../details/groupDetail";
import NewsDetail from '../details/newsDetail';
import DataTable from "../tables/dataTable";

const handleCheck = (tarea) =>{

}

const NewsList = () => {
    const {id} = useParams();
    const match = useRouteMatch();

    const grupo = {
        codigo:1,
        empresa:"E765476",
        nombre:"RRHH",
        descripcion:"Proyecto Recursos Humanos",
        administrador:"higo@gmail.com",
        fechaHora:"2022-02-03",
        finalizado:false,
        admin:false
    };

    const tareas = [
        {checked:true, asignado:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", nombre:"Hacer envío MRW", descripcion:"Enviar el paquete por MRW", fechaHora:"2022-01-01"},
        {asignado:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", nombre:"Hacer envío MRW", descripcion:"Enviar el paquete por MRW", fechaHora:"2022-01-01"},
        {checked:true, asignado:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", nombre:"Hacer envío MRW", descripcion:"Enviar el paquete por MRW", fechaHora:"2022-01-01"},
        {checked:true, asignado:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", nombre:"Hacer envío MRW", descripcion:"Enviar el paquete por MRW", fechaHora:"2022-01-01"},
        {checked:true, asignado:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", nombre:"Hacer envío MRW", descripcion:"Enviar el paquete por MRW", fechaHora:"2022-01-01"},
        {asignado:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", nombre:"Hacer envío MRW", descripcion:"Enviar el paquete por MRW", fechaHora:"2022-01-01"},
        {asignado:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", nombre:"Hacer envío MRW", descripcion:"Enviar el paquete por MRW", fechaHora:"2022-01-01"},
        {asignado:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", nombre:"Hacer envío MRW", descripcion:"Enviar el paquete por MRW", fechaHora:"2022-01-01"},
    ]
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <Typography variant="h3" align="left">{`Tareas "${grupo.nombre}"`}</Typography>

                <Stack spacing={3} marginTop={3}>
                    {tareas.map((tarea)=>{
                        return(
                            <Card sx={{padding:1, backgroundColor:(tarea.checked)?'text.disabled':''}}>
                                <CardContent sx={{flexDirection:"row"}}>
                                    <Typography align="left" sx={{flexGrow:1}}>{tarea.nombre}</Typography>
                                    <Typography align="left" sx={{flexGrow:1}}>{tarea.descripcion}</Typography>
                                    <Typography align="left" sx={{flexGrow:1}}>{tarea.fechaHora}</Typography>
                                    <Typography align="left" sx={{flexGrow:1, fontSize:12}}>{tarea.grupo.nombre}</Typography>
                                </CardContent>
                                <CardActions sx={{flexDirection:"row-reverse"}}>
                                    {(grupo.admin)?<Button>EDITAR</Button>:""}
                                    {(grupo.admin)?<Button>ELIMINAR</Button>:""}
                                    <Button onClick={()=>{handleCheck(tarea)}}>{(tarea.checked)?'NO HECHA':'HECHA'}</Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                </Stack>

            </Route> 
            <Route path={`${match.url}/:idnoticia`}>
                <NewsDetail/>
            </Route>
        </Switch>
        </div>
     );
}
 
export default NewsList;