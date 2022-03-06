import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import NewsDetail from '../details/newsDetail';
import NewsForm from "../forms/newsForm";
import ControlNoticia from "../../back/control/controlNoticia"
import notificar from "../home/notificar";
import { useHistory } from "react-router-dom";

const NewsList = (props) => {
    const {grupocodigo} = useParams();
    const {grupoempresa} = useParams();
    const match = useRouteMatch();
    const grupo = props.grupo;
    const history = useHistory();

    const [noticias,setNoticias] = useState(null);
    const [isPending, setIsPending] = useState(true);


    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlNoticia.getByGrupo(grupoempresa, grupocodigo)
            .then(data=>{
                
                setNoticias(data);
                setIsPending(false);
                
            })
            
        }, 1000)

        

        return abortCont.abort();

    },[grupoempresa,grupocodigo])    

    const handleDelete = (noticia) => {
        ControlNoticia.delete(noticia)
        .then(data => {
            notificar(data.message)
            history.go(0)
        })
    }
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <Typography variant="h3" align="left">{`Feed del grupo`}</Typography>
                <Typography align="left" marginTop={1} marginBottom={2}>

                    <Link to={`/grupos/${grupoempresa}/${grupocodigo}/detalle`} color="text.secondary" style={{textDecoration:"none"}}>
                        Información del grupo
                    </Link>
                    
                </Typography>

                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {noticias && <InfoNoticias handleDelete={handleDelete} noticias={noticias} match={match} grupocodigo={grupocodigo} grupoempresa={grupoempresa}/> }

                

            </Route> 
            <Route exact path={`${match.path}/:autor/:codigo`}>
                <NewsDetail/>
            </Route>
            <Route exact path={`${match.path}/:autor/:codigo/editar`}>
                <NewsForm/>
            </Route>
        </Switch>
        </div>
     );
}

const InfoNoticias = (props) =>{

    const noticias = props.noticias;
    console.log(noticias);
    const usuario = {email:"higo@gmail.com"}
    const match = props.match;
    const grupocodigo = props.codigo;
    const grupoempresa = props.empresa;
    const handleDelete = props.handleDelete;

    console.log(noticias)

    return(
        <Stack spacing={3} marginTop={3}>
                    <NewsForm/>
                    {noticias.sort((a,b)=>{ return (a.fechaHora < b.fechaHora)?1:-1;}).map((noticia)=>{

                        {(noticia.usuario.email == usuario.email)?noticia.admin = true : noticia.admin = false}

                        return(
                            <Card sx={{padding:1}}>
                                <CardContent sx={{flexDirection:"row"}}>
                                    <Typography align="left" sx={{flexGrow:1}}>{noticia.texto}</Typography>
                                    <Typography align="left" sx={{flexGrow:1, fontSize:12, marginTop:3}}>{noticia.usuario.email}</Typography>
                                    <Typography align="left" sx={{flexGrow:1, fontSize:12}}>{noticia.fechaHora.getFullYear()+"-"+(parseInt(noticia.fechaHora.getMonth())+1)+
                                    "-"+noticia.fechaHora.getDate()+` `+noticia.fechaHora.getHours().toString().padStart(2,'0')+":"
                                    +noticia.fechaHora.getMinutes().toString().padStart(2,'0')+"h"}</Typography>
                                    <Link to={`${match.url}/${noticia.usuario.email}/${noticia.codigo}`}><Typography align="left" sx={{flexGrow:1, fontSize:10, marginTop:3}}>Ver detalle</Typography></Link>
                                </CardContent>
                                <CardActions sx={{flexDirection:"row-reverse"}}>
                                    {(noticia.admin)?<Button><Link to={`${match.url}/${noticia.usuario.email}/${noticia.codigo}/editar`}>EDITAR</Link></Button>:""}
                                    {(noticia.admin)?<Button onClick={()=>handleDelete(noticia)} >ELIMINAR</Button>:""}
                                </CardActions>
                            </Card>
                        );
                    })}
                </Stack>
    )
}
 
export default NewsList;