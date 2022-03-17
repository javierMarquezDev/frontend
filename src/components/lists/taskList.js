import { Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import PersonIcon from "@mui/icons-material/Person";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";
import useNotificar from "../home/notificar";
import ModalCustom from "../home/modal";


const TaskList = () => {
    
    const notificar = useNotificar();

    const history = useHistory();
    const {grupoempresa} = useParams();
    const {grupocodigo} = useParams();
    const match = useRouteMatch();
    const [userFilter,setUserFilter] = useState({email:'Todas'});

    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    const [tareas, setTareas ] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [admin,setAdmin] = useState(false);
    const [miembros,setMiembros] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [hasChanged,setHasChanged] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const [eliminable,setEliminable] = useState(null);

    const handleCheck = tarea =>{

        (tarea.checked)?tarea.checked=false:tarea.checked = true;
    
        ControlTarea.edit(tarea)

        setHasChanged(true)

    }

    const handleDelete = tarea =>{
        ControlTarea.delete(tarea).then(data => {
            notificar({type:"SUCCESS",message:data.message});
            setHasChanged(true);
        })
    }

    useEffect(() => {
        
        const abortCont = new AbortController();

        setTimeout(()=>{

            ControlGrupo.isMember(usuario,{codigo:grupocodigo,empresa:{nif:grupoempresa}})
                .then(data => {

                    setIsMember(data);

                    console.log(data)

                    if(data){

                        ControlGrupo.getById({nif:grupoempresa},grupocodigo)
                        .then(res =>{

                            ControlGrupo.isAdmin(res,usuario)
                            .then(res=>{

                                setAdmin(res.administrador);
                
                                console.log(res.administrador)

                                if(res.administrador){

                                    
                
                                    ControlGrupo.getUsuariosFromGrupo({empresa:{nif:grupoempresa},codigo:grupocodigo})
                                    .then(data =>{
                                        
                                        data.push({email:'Todas'});
                                        setMiembros(data);
                
                
                                    })
                
                                    
                
                                }else{
                                    ControlTarea.getAllFromUsuarioAndGrupo(grupoempresa, grupocodigo, usuario.email)
                                    .then(data=>{
                                
                                        setTareas(data);
                                        setIsPending(false);
                                    })
                                }

                            

                            })
                        
                        })

                        if(userFilter.email === 'Todas'){
                            ControlTarea.getFromGrupo(grupoempresa, grupocodigo)
                            .then(data=>{
                        
                                setTareas(data);
                                setIsPending(false);
                            })
                        }else{
                            ControlTarea.getAllFromUsuarioAndGrupo(grupoempresa, grupocodigo, userFilter.email)
                            .then(data=>{
                        
                                setTareas(data);
                                setIsPending(false);
                            })
                        }

                
                        setHasChanged(false);
            

                    }else{return}
            
            })
        }, 1000)

        return abortCont.abort();

    },[userFilter,grupocodigo,grupoempresa,hasChanged]);
    
    return ( 
        <div>
            <Switch>
            {tareas && (isMember)
            ?
                <Route exact path={`${match.path}`}>
                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                <Typography variant="h3" align="left">{`Tareas`}</Typography>

                {(admin)? (miembros && <Box sx={{marginTop:1}}>
                        <Box display="flex">
                            <Typography align="left">Filtrar por usuario</Typography>
                        </Box>
                        <Autocomplete
                        options={miembros}
                        value={userFilter}
                        defaultValue={userFilter}
                        onChange={(e,value)=>setUserFilter(value)}
                        getOptionLabel={option => option.email}
                        sx={{width:'20%', marginBottom:1}}
                        id="miembros"
                        renderInput={(params) => (
                            <TextField {...params} label="Miembros" variant="standard" />
                            )}
                        />
                    </Box>):"" }

                {(admin)?<Button variant="contained"><Link to={`${match.url}/crear`}>Crear tarea</Link></Button>:""}

                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                { tareas && <InfoTareas handleDelete={handleDelete} 
                                        tareas={tareas} 
                                        handleCheck={handleCheck} 
                                        match={match} 
                                        grupocodigo={grupocodigo} 
                                        grupoempresa={grupoempresa} 
                                        admin={admin}
                                        setOpenModal={setOpenModal}
                                        setEliminable={setEliminable}
                                        /> }
                {eliminable && <ModalCustom open={openModal} title="Eliminar" descripcion={`¿Eliminar tarea ${eliminable.nombre} ?`} action={()=>handleDelete(eliminable)}/>}

            </Route>
            :""} 
            {(admin)
                ?
            <Route path={`${match.path}/crear`}>
                <TaskForm setHasChanged={setHasChanged} />
            </Route>
            :""} 
            {(isMember)
                ?
            <Route exact path={`${match.path}/:codigo`}>
                <TaskDetail/>
            </Route>
            :""} 
            {(admin)
            ?
            <Route path={`${match.path}/:codigo/editar`}>
                <TaskForm setHasChanged={setHasChanged}/>
            </Route>
            :""} 
            <Route path="*">
                <AccessDenied/>
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
    const handleCheck = props.handleCheck;
    const handleDelete = props.handleDelete;

    return(
        <Stack spacing={3} marginTop={3}>
                    {tareas.sort((a,b)=>{ return (a.fechaHora < b.fechaHora)?1:-1;}).map((tarea)=>{
                        return(
                            <Card sx={{padding:1, backgroundColor:(tarea.checked)?'text.disabled':''}}>
                                <CardContent sx={{flexDirection:"row"}}>
                                    <Typography align="left" sx={{flexGrow:1, fontWeight:"bold", marginBottom:1}}>{tarea.nombre}</Typography>
                                    <Typography align="left" sx={{flexGrow:1, marginBottom:1}}>{tarea.descripcion}</Typography>
                                    <Typography align="left" sx={{flexGrow:1, marginBottom:1}}>Fecha límite: {tarea.fechaHora.getFullYear()+"-"+(parseInt(tarea.fechaHora.getMonth())+1)+
                                    "-"+tarea.fechaHora.getDate()}</Typography>
                                    <Typography align="left" sx={{flexGrow:1, fontSize:12, marginBottom:1}}>{tarea.grupo.nombre}</Typography>
                                    <Typography align="left"><PersonIcon/>&nbsp;{tarea.atareado.email}</Typography> 
                                    <Typography align="left" sx={{color:'text.secondary', fontSize:11, marginBottom:1}}>{(tarea.checked)?'Hecha':'Pendiente'}</Typography>
                                    <Link to={`${match.url}/${tarea.codigo}`}><Typography align="left" sx={{flexGrow:1, fontSize:12}}>Ver detalle</Typography></Link>
                                </CardContent>
                                <CardActions sx={{flexDirection:"row-reverse"}}>
                                    {props.admin && <ActionsAdmin setEliminable={()=>props.setEliminable(tarea)} setOpenModal={()=>props.setOpenModal()} handleDelete={()=>handleDelete(tarea)} grupoempresa={grupoempresa} grupocodigo={grupocodigo} tarea={tarea} usuario={usuario} match={match}/>}
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
    const handleDelete = props.handleDelete;

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
        const handleDelete = props.handleDelete;

        return(
            <Box>
                <Button><Link to={`${match.url}/${tarea.codigo}/editar`}>EDITAR</Link></Button>
                <Button onClick={()=>handleDelete()}>ELIMINAR</Button>
            </Box>
            
        )
    }    

    return(
        <Box>
            { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
            {grupo && <Info handleDelete={handleDelete} grupo={grupo}/>}
        </Box>
    )
}
 
export default TaskList;