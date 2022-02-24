import NewsForm from "../forms/newsForm";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
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
import { NoBackpackSharp } from "@mui/icons-material";

const handleDelete = (tarea)=>{}

const NewsDetail = () => {
    const {id} = useParams();
    const match = useRouteMatch();

    const noticia = {
        codigo:1,
        autor:{
            email:"higo@gmail.com",
        },
        grupoProyecto:{
            codigo:1,
            nombre:"RRHH",
            descripcion:"Proyecto de RRHH",
            empresa:{
                nif:"E98765432",
                nombre:"Aceites Benatae S.A."
            }
        },
        texto:"Lorem ipsum dolor sit amet",
        fechaHora: new Date(2022,2,22),
        creador:true
    }

    return ( 
        <div>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Detalles de la noticia</Typography>

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
                                    <Typography align="left">{noticia.fechaHora.getFullYear()+"-"+noticia.fechaHora.getMonth()+
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
                                        {(noticia.autor)?<InfoAutor autor={noticia.autor}/>:<Typography sx={{fontSize:12}} align="left">Sin información</Typography>}
                                    </Card>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box id="grupo" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Grupo</Typography>
                                    <Box display="flex">
                                        <Card id="grupo">
                                            {(noticia.grupoProyecto)?<InfoGrupo grupo={noticia.grupoProyecto}/>:<Typography sx={{fontSize:12}} align="left">Sin información</Typography>}
                                        </Card>
                                    </Box>
                                </Box>
                        </Grid>

                    </Grid>

                </Route>
                <Route path={`${match.path}/editar`}>
                    <NewsForm/>
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

    return(
        <CardContent>
            <Typography align="left" sx={{fontWeight:"bold"}}>{autor.nombre}</Typography>
            <Typography align="left">{autor.email}</Typography>
        </CardContent>
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
 
export default NewsDetail;