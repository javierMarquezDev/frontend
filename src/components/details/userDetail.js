import { Link, useRouteMatch } from "react-router-dom";
import UserForm from "../forms/userForm";
import { useParams, Switch, Route } from "react-router-dom";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { List, ListItem } from "@mui/material";
import ControlUsuario from "../../back/control/controlUsuario";
import React, { useEffect, useState } from "react";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import ControlEmpresa from "../../back/control/controlEmpresa";
import ControlTarea from "../../back/control/controlTarea";
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";
import useNotificar from "../home/notificar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PassForm from "../forms/passForm";


const UserDetail = () => {

    const value = React.useContext(UserContext);
    const usuarioSesion = value.usuario;
    const token = value.token;
//
    const match = useRouteMatch();
    const {idusuario} = useParams();
    const [usuario,setUsuario] = useState(null)
    const [grupos,setGrupos] = useState([])
    const [empresas,setEmpresas] = useState([])
    const [tareas,setTareas] = useState([])
    const [isPending,setIsPending] = useState(true);
    const [editable,setEditable] = useState(false);
    const [hasChanged,setHasChanged] = useState(false);
    const notificar = useNotificar()
    const history = useHistory();

    const deleteUser = (usuario)=>{
    
        ControlUsuario.delete(usuario)
        .then(data => {
            if(data.message){
                notificar({type:'SUCCESS',message:data.message});
                ControlSesion.destroySesion()
                value.setToken(null)
                value.setUsuario(null)
                history.push('/login')
            }else{
                notificar({type:'SUCCESS',message:data.error});
            }
        })
    }

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{

            if(idusuario === usuarioSesion.email)
                setEditable(true)
            
          ControlUsuario.getById(idusuario)
          .then(res =>{
              console.log(res)
              
              
            setUsuario(res)
            setHasChanged(false);
            setIsPending(false)

            ControlGrupo.getFromUsuario(idusuario)
            .then(data =>{
                console.log(data)
                setGrupos(data)
                
            })

            ControlEmpresa.getEmpresasByUsuario({email:idusuario})
            .then(data =>{
                console.log(data)
                setEmpresas(data)
                
            })

            ControlTarea.getFromUsuario(idusuario)
            .then(data =>{
              res.tareas = data;
              setTareas(data)
              
            })

          })
        }, 1000)

        return abortCont.abort();

    },[hasChanged])



    

    return ( <div>
        <Switch>
            <Route exact path={`${match.path}`}>
                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {usuario && <Info 
                    usuario={usuario} 
                    match={match} 
                    empresas={empresas}
                    grupos={grupos}
                    tareas={tareas}
                    isPending={isPending}
                    editable={editable}
                    deleteUser={deleteUser}/>}
            </Route>
            {usuario && (editable)
            ?
                <Route path={`${match.path}/editar`}>
                    <UserForm setHasChanged={setHasChanged} />       
                </Route>
            :""}
            {usuario && (editable)
            ?
                <Route path={`${match.path}/cambiarpass`}>
                    <PassForm/>
                </Route>
            :""}
            <Route path="*">
                <AccessDenied/>
            </Route>
        </Switch>
    </div> );
}

const Info = (props)=>{

    const match = props.match;
    const usuario = props.usuario;
    const empresas = props.empresas;
    const tareas = props.tareas;
    const grupos = props.grupos;
    const isPending = props.isPending;
    const editable = props.editable;

    return(
        <Box>
            <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Información de {usuario.nombre}&nbsp;{usuario.apellido1}&nbsp;{usuario.apellido2}</Typography>

            <Box display="flex">
                {(editable?<BotonesEditable match={match} handleDelete={props.deleteUser} usuario={usuario}/>:null)}
            </Box>

            <Grid container spacing={2} marginTop={2}>

                        

                        <Grid item xs={6} sx={{padding:1}}>
                            <Box id="nombre" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Nombre completo</Typography>
                                <Box display="flex">
                                    <Typography id="nombre"  align="left">{usuario.nombre}</Typography>&nbsp;
                                    <Typography id="apellido1" align="left">{usuario.apellido1}</Typography>&nbsp;
                                    <Typography id="apellido2" align="left">{usuario.apellido2}</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sx={{padding:1}}>
                            <Box id="email" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Dirección de e-mail</Typography>
                                <Typography id="email" align="left">{usuario.email}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={8} sx={{padding:1}}>
                            <Box id="direccion" margin={1} padding={1}>
                                <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Dirección postal</Typography>
                                <Box display="flex" sx={{flexDirection:"row"}} align="left">
                        
                                    <Typography id="nombrevia" align="left">{usuario.nombrevia}</Typography>&nbsp;
                                    <Typography id="numvia" align="left">{usuario.numvia}</Typography>&nbsp;
                                    <Typography id="codigopuerta" align="left">{usuario.codigopuerta}</Typography>&nbsp;
                                    <Typography id="localidadprovincia" align="left">{`${usuario.localidad}, ${usuario.provincia}`}</Typography>&nbsp;
                                    
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={4}></Grid>

                        <Grid item xs={4}>

                            { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                            {(editable)?empresas && <ListaEmpresas empresas={empresas} />:""}

                        </Grid>
                            
                        <Grid item xs={4}>
                            { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                            {(editable)?grupos && <ListaGrupos grupos={grupos} />:""}
                            
                        </Grid>

                        <Grid item xs={4}>
                            { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                            {(editable)?tareas && <ListaTareas tareas={tareas}/>:""}
                            
                        </Grid>

                        

                    </Grid>

        </Box>
                    
    )
}

const BotonesEditable = (props)=>{

    const usuario = props.usuario;
    const match = props.match;

    return(
        <Box display="contained">
            <Button variant="outlined" sx={{margin:1}}>
                <Link to={`${match.url}/editar`} sx={{margin:1}} sx={{textDecoration:"none",color:"text.primary"}}>
                    Editar
                </Link>
            </Button>
            <Button variant="outlined" sx={{margin:1}}>
                <Link to={`${match.url}/cambiarpass`} sx={{margin:1}} sx={{textDecoration:"none",color:"text.primary"}}>
                    Cambiar contraseña
                </Link>
            </Button>
            <Button onClick={()=>{props.handleDelete(usuario)}} variant="contained" sx={{margin:1}}>Eliminar</Button>
        </Box>
    )
}

const ListaGrupos = (props)=>{
    const grupos = props.grupos;
    console.log(grupos)

    return(

        <Box id="grupos" margin={1} padding={1}>
            <Typography sx={{fontSize:12, color:"text.secondary"}}>Grupos</Typography>
            <List spacing={2} sx={{height:300, overflowY:"scroll"}}>
                {grupos.map((grupo)=>{
                    return(
                        <ListItem id={grupo.empresa.nif+grupo.codigo} sx={{padding:1, overflow:"hidden"}}>
                        
                            <Grid container>
                                <Grid element xs={4}>

                                    <Link to={`/grupos/${grupo.empresa.nif}/${grupo.codigo}`}>
                                        <Typography sx={{fontWeight:"bold"}}>{grupo.nombre}</Typography>
                                    </Link>
                                    
                                </Grid>
                                <Grid element xs={8}>
                                    <Typography sx={{width:'100%'}} noWrap>{grupo.descripcion}</Typography>
                                </Grid>
                            </Grid>
                            
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    )
}

const ListaEmpresas = (props)=>{

    const empresas = props.empresas;
    console.log(empresas)

    return (

        <Box id="empresas" margin={1} padding={1}>
            <Typography sx={{fontSize:12, color:"text.secondary"}}>Empresas</Typography>
            <List spacing={2} sx={{height:300, overflowY:"scroll"}}>
                {empresas.map((empresa)=>{
                    return(
                        <ListItem id={empresa.nif} sx={{padding:1, overflow:"hidden"}}>

                            <Grid container>
                                <Grid element xs={4}>
                                    <Link to={`/empresas/${empresa.nif}`}>
                                        <Typography sx={{fontWeight:"bold"}}>{empresa.nombre}</Typography>
                                    </Link>
                                </Grid>
                                <Grid element xs={8}>
                                    <Typography sx={{width:'100%'}} noWrap>{empresa.razonSocial}</Typography>
                                </Grid>
                            </Grid>
                            
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    );

}

const ListaTareas = (props)=>{

    const tareas = props.tareas;
    console.log(tareas)

    return(

        <Box id="tareas" margin={1} padding={1}>
            <Typography sx={{fontSize:12, color:"text.secondary"}}>Tareas</Typography>
            <List spacing={2} sx={{height:300, overflowY:"scroll"}}>
                {tareas.map((tarea)=>{
                    return(
                        <ListItem id={tarea.grupo.empresa+tarea.grupo.codigo+tarea.codigo} sx={{padding:1, overflow:"hidden"}}>

                            <Grid container>
                                <Grid element xs={4}>
                                    <Link to={`/grupos/${tarea.grupo.empresa}/${tarea.grupo.codigo}`}>
                                        <Typography sx={{fontWeight:"bold"}}>{tarea.nombre}</Typography>
                                    </Link>
                                </Grid>
                                <Grid element xs={8}>
                                    <Typography sx={{width:'100%'}} noWrap>{tarea.descripcion}</Typography>
                                </Grid>
                            </Grid>
                            
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    );
}
 
export default UserDetail;
