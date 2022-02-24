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
        empresa:{
            nif:"E98765432"
        },
        nombre:"RRHH",
        descripcion:"Proyecto Recursos Humanos",
        administrador:"higo@gmail.com",
        fechaHora:new Date(2022,2,2),
        finalizado:false,
        admin:false
    };

    const noticias = [
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:new Date(2022,2,2)},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:new Date(2022,2,2)},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:new Date(2022,2,2)},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:new Date(2022,2,2)},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
        {grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet", fechaHora:new Date(2022,2,2)},
        {admin:true, grupo: grupo, codigo:1, usuario:"higo@gmail.com", texto:"Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet.", fechaHora:new Date(2022,2,2)},
    ]
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <Typography variant="h3" align="left">{`Feed "${grupo.nombre}"`}</Typography>
                <Typography align="left" marginTop={1} marginBottom={2}>

                    <Link to={`/grupos/${grupo.empresa.nif}/${grupo.codigo}/detalle`} color="text.secondary" style={{textDecoration:"none"}}>
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
                                    <Typography align="left" sx={{flexGrow:1, fontSize:12}}>{noticia.fechaHora.getFullYear()+"-"+noticia.fechaHora.getMonth()+
                                    "-"+noticia.fechaHora.getDate()+` `+noticia.fechaHora.getHours().toString().padStart(2,'0')+":"
                                    +noticia.fechaHora.getMinutes().toString().padStart(2,'0')+"h"}</Typography>
                                    <Link to={`${match.url}/${noticia.grupo.empresa.nif}/${noticia.grupo.codigo}/${noticia.codigo}`}><Typography align="left" sx={{flexGrow:1, fontSize:10, marginTop:3}}>Ver detalle</Typography></Link>
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
            <Route path={`${match.path}/:grupoempresa/:grupocodigo/:codigo`}>
                <NewsDetail/>
            </Route>
        </Switch>
        </div>
     );
}
 
export default NewsList;