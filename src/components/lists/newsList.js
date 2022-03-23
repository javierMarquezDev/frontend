import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import NewsDetail from '../details/newsDetail';
import NewsForm from "../forms/newsForm";
import ControlNoticia from "../../back/control/controlNoticia"
import { useHistory } from "react-router-dom";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import AccessDenied from "../home/acessDenied";
import { UserContext } from "../../App";
import useNotificar from "../home/notificar";

const NewsList = (props) => {

    const notificar = useNotificar();
    const {grupocodigo} = useParams();
    const {grupoempresa} = useParams();
    const match = useRouteMatch();
    const history = useHistory();

    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    const [noticias,setNoticias] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isMember, setIsMember] = useState(false);
    const [grupo,setGrupo] = useState(null);
    const [hasChanged,setHasChanged] = useState(false);


    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlGrupo.isMember(usuario, {codigo:grupocodigo, empresa:{nif:grupoempresa}})
            .then(data => {

                if(data){

                    setIsMember(true);

                    ControlNoticia.getByGrupo(grupoempresa, grupocodigo)
                    .then(data=>{
                        
                        setNoticias(data);
                        setIsPending(false);
                        setHasChanged(false);
                        
                    })

                    ControlGrupo.getById({nif:grupoempresa},grupocodigo)
                    .then(res => {
                        setGrupo(res);
                    })

                }else{return}

            })
            
        }, 1000)

        

        return abortCont.abort();

    },[grupoempresa,grupocodigo,hasChanged])    

    const handleDelete = (noticia) => {
        ControlNoticia.delete(noticia)
        .then(data => {
            notificar({type:"SUCCESS",message:data.message})
            setHasChanged(true);
        })
    }
    
    return ( 
        <div>
            <Switch>
            {(isMember)?
            <Route exact path={match.path}>
                {grupo && <Typography variant="h3" align="left">{`Feed del grupo "${grupo.nombre}"`}</Typography>}
                <Typography align="left" marginTop={1} marginBottom={2}>

                    <Link to={`/grupos/${grupoempresa}/${grupocodigo}`} color="text.secondary" style={{textDecoration:"none"}}>
                        Información del grupo
                    </Link>
                    
                </Typography>

                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {noticias && <InfoNoticias 
                                    handleDelete={handleDelete} 
                                    noticias={noticias} 
                                    match={match} 
                                    grupocodigo={grupocodigo} 
                                    grupoempresa={grupoempresa}
                                    setHasChanged={setHasChanged}/> }

            </Route>
            :""}

            {(isMember)?
            <Route exact path={`${match.path}/:autor/:codigo`}>
                <NewsDetail/>
            </Route>
            :""}
            {(isMember)?
            <Route exact path={`${match.path}/:autor/:codigo/editar`}>
                <NewsForm setHasChanged={setHasChanged} />
            </Route>
            :""}
            <Route path="*">
                <AccessDenied/>
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
    const setHasChanged = props.setHasChanged;

    console.log(noticias)

    return(
        <Stack spacing={3} marginTop={3}>
                    <NewsForm setHasChanged={setHasChanged} />
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