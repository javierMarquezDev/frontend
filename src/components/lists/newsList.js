import { Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import GroupDetail from "../details/groupDetail";
import NewsDetail from '../details/newsDetail';
import DataTable from "../tables/dataTable";

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

    const noticias = [
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:"2022-01-01"},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:"2022-01-01"},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:"2022-01-01"},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:"2022-01-01"},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:"2022-01-01"},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:"2022-01-01"},
    ]
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <Typography variant="h3" align="left">{`Feed "${grupo.nombre}"`}</Typography>
                <Typography align="left" marginTop={1} marginBottom={2}>

                    <Link to={`/grupos/${grupo.empresa}/${grupo.codigo}/detalle`} color="text.secondary" style={{textDecoration:"none"}}>
                        Información del grupo
                    </Link>
                    
                </Typography>

                <Stack spacing={3} marginTop={3}>
                    {noticias.map((noticia)=>{
                        return(
                            <Card sx={{padding:1}}>
                                <CardContent sx={{flexDirection:"row"}}>
                                    <Typography align="left" sx={{flexGrow:1}}>{noticia.texto}</Typography>
                                    <Typography align="left" sx={{flexGrow:1, fontSize:12, marginTop:3}}>{noticia.usuario}</Typography>
                                    <Typography align="left" sx={{flexGrow:1, fontSize:12}}>{noticia.fechaHora}</Typography>
                                </CardContent>
                                <CardActions sx={{flexDirection:"row-reverse"}}>
                                    {(noticia.admin)?<Button>EDITAR</Button>:""}
                                    {(noticia.admin)?<Button>ELIMINAR</Button>:""}
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