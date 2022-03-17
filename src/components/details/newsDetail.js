import NewsForm from "../forms/newsForm";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { NoBackpackSharp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ControlNoticia from "../../back/control/controlNoticia";
import ControlUsuario from "../../back/control/controlUsuario";
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";
import ControlGrupo from "../../back/control/controlGrupoProyecto";

const handleDelete = (tarea)=>{}

const NewsDetail = () => {
    const {grupoempresa,grupocodigo,codigo,autor} = useParams();
    const match = useRouteMatch();
    const [noticia,setNoticia] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [miembro,setMiembro] = useState(false);

    console.log([grupoempresa,grupocodigo,codigo,autor])

    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{

            ControlGrupo.isMember(usuario, {codigo:grupocodigo, empresa:{nif:grupoempresa}})
            .then(data=>{
                if(data){
                    setMiembro(true)

                    ControlNoticia.getById(grupoempresa,grupocodigo,autor,codigo)
                    .then(data=>{
                        if(data.autor == usuario.email)
                            {data.creador = true;}
                        else{
                            data.creador = false;
                        }
                        setNoticia(data);
                        setIsPending(false)
                    })
                    
                }else{

                    return;

                }
            })
            
        }, 1000)

        return abortCont.abort();

    }, [])

    return ( 
        <div>
            <Switch>
                {miembro && (miembro)
                ?
                    <Route exact path={`${match.path}`}>
                        <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Detalles de la noticia</Typography>


                        { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                        {noticia && <InfoNoticia noticia={noticia} match={match}/> }
                        
                    </Route>
                :""}
                {noticia && (noticia.creador)
                ?
                    <Route path={`${match.path}/editar`}>
                        
                        <NewsForm/>
                        
                    </Route>
                :""}
                <Route path="*">
                    <AccessDenied/>
                </Route>
            </Switch>
        </div>
        );
}

const BotonesEditable = (props)=>{

    const noticia = props.noticia;
    const match = props.match;

    return(
        <Box display="contained">
            <Button variant="outlined">
                <Link to={`${match.url}/editar`} sx={{margin:1}} sx={{textDecoration:"none",color:"text.primary"}}>
                Editar</Link></Button>
            <Button onClick={()=>{handleDelete(noticia)}} variant="contained" sx={{margin:1}}>Eliminar</Button>
        </Box>
    )
}

const InfoAutor = (props)=>{
    const autor = props.autor;

    const [usuario,setUsuario]     = useState(null)
    const [isPending, setIsPending] = useState(true);

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlUsuario.getById(autor.email)
            .then(data=>{
                setUsuario(data);
                setIsPending(false)
            })
        }, 1000)

        return abortCont.abort();

    }, [autor])

    const Info = (props) =>{

        const autor = props.autor;

        return(
            <CardContent>
            <Typography align="left" sx={{fontWeight:"bold"}}>{autor.nombre}</Typography>
            <Typography align="left">{autor.email}</Typography>
        </CardContent>
        )
    }

    return(
        <Box>
            { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
            {usuario && <Info autor={usuario} /> }
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
        </CardContent>

    )

}

const InfoNoticia = (props)=>{

    const noticia = props.noticia;
    const match = props.match;
    

    return (
        <Box>
            {(noticia.creador?<BotonesEditable match={match} handleDelete={handleDelete} noticia={noticia}/>:null)}

            <Grid container spacing={2} marginTop={2}>

                <Grid item xs={8}>
                    <Box id="texto" margin={1} padding={1}>
                        <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Texto</Typography>
                        <Box display="flex">
                            <Typography align="left">{noticia.texto}</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box id="fechaHora" margin={1} padding={1}>
                        <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Fecha y hora</Typography>
                        <Box display="flex">
                            <Typography align="left">{noticia.fechaHora.getFullYear()+"-"+(parseInt(noticia.fechaHora.getMonth())+1)+
                            "-"+noticia.fechaHora.getDate()+` `+noticia.fechaHora.getHours().toString().padStart(2,'0')+":"
                            +noticia.fechaHora.getMinutes().toString().padStart(2,'0')+"h"}</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box id="autor" margin={1} padding={1}>
                        <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Autor</Typography>
                        <Box display="flex">
                            <Card id="autor">
                                {(noticia.usuario)?<InfoAutor autor={noticia.usuario}/>:<Typography sx={{fontSize:12}} align="left">Sin información</Typography>}
                            </Card>
                        </Box>
                    </Box>
                </Grid>

            </Grid>

        </Box>
    )
}
 
export default NewsDetail;