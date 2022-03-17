import { Autocomplete, Button, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import GrupoProyecto from "../../back/model/GrupoProyecto";
import Tarea from "../../back/model/Tarea";
import InputTexto from "../form/InputTexto";
import ControlTarea from "../../back/control/controlTarea"
import {useParams} from 'react-router-dom';
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import useNotificar from "../home/notificar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErroresCampo from "../form/ErroresCampo";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";

const TaskForm = (props) => {

    const notificar = useNotificar();

    const {grupocodigo,grupoempresa,codigo} = useParams();
    const history = useHistory();

    const valueSesion = React.useContext(UserContext);
    const usuario = valueSesion.usuario;
    const token = valueSesion.token;

    const [descripcion,setDescripcion] = useState('')
    const [nombre,setNombre] = useState('')
    const [fechaHora,setFechaHora] = useState(new Date())
    const [checked,setChecked] = useState(false)
    const [atareado,setAtareado] = useState(null)
    const [grupo,setGrupo] = useState(new GrupoProyecto())
    const [tarea,setTarea] = useState(new Tarea())
    const [errores,setErrores] = useState({})
    const [usuarios,setUsuarios] = useState([])
    const [isPending, setIsPending] = useState(true);
    const [usuarioIsAdmin,setUsuarioIsAdmin] = useState(false);

    useEffect(()=>{

      const abortCont = new AbortController();
  
          setTimeout(()=>{
            if(codigo){
              ControlTarea.getById(grupoempresa,grupocodigo,codigo)
              .then(data=>{

                  setTarea(data);

                  setNombre(data.nombre);
                  setFechaHora(data.fechaHora);
                  setChecked(data.checked);
                  setGrupo(data.grupo);
                  setDescripcion(data.descripcion);
                  setAtareado(data.atareado)

                  ControlGrupo.getById({nif:grupoempresa},grupocodigo)
                  .then(res =>{
                    data.grupo = res;
                    setTarea(data);
                    if(usuario.email == res.administrador.email)
                      setUsuarioIsAdmin(true);
                  })

              })}

              ControlGrupo.getUsuariosFromGrupo({empresa:{nif:grupoempresa},codigo:grupocodigo})
              .then(res =>{
                setUsuarios(res)
              })

          }, 1000)
  
          setIsPending(false)
  
          return abortCont.abort();
  
    },[])


    const handleSubmit = (e)=>{

      e.preventDefault();

      const nuevaTarea = new Tarea(codigo || null, {codigo:grupocodigo, empresa:grupoempresa}, fechaHora,
                                  nombre, descripcion, checked,
                                  atareado);

                                  
      if(codigo){

        console.log(nuevaTarea)

        ControlTarea.edit(nuevaTarea)
        .then(data => {
            if(data.error != null){
              notificar({type:"ERROR",message:data.message})
            }else
            if(data.message != null){
              
              notificar({type:"SUCCESS",message:data.message})
              props.setHasChanged(true);
              history.push(`/grupos/${grupoempresa}/${grupocodigo}/tareas`)
            }
              console.log(data)
              setErrores(data);
        })
      }else{
        ControlTarea.create(nuevaTarea)
        .then(data => {
            if(data.error != null){
              notificar({type:"ERROR",message:data.message})
            }else
            if(data.message != null){
              notificar({type:"SUCCESS",message:data.message})
              props.setHasChanged(true);
              history.push(`/grupos/${grupoempresa}/${grupocodigo}/tareas`)
            }
              setErrores(data);
        })

      }

    }


    return ( <Box>
        <Typography variant="h5" sx={{marginTop:3, marginBottom:2}} align="left">Editar tarea {nombre || 'nueva'}</Typography>
        { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
        {tarea && 
        <Box>
        <InputTexto formalName="Nombre" 
                    required = {true}
                    id = "nombre"
                    property={nombre} 
                    setProperty={setNombre} 
                    errores={errores.nombre || null}
                    sx={{margin:2}}
                    />
        <InputTexto formalName="Descripción" 
                    required = {true}
                    id = "descripcion"
                    property={descripcion} 
                    setProperty={setDescripcion} 
                    errores={errores.descripcion || null}
                    multiline={true}
                    sx={{margin:2}}
                    />

            <Box sx={{margin:2}}>
              <TextField
                id="fechaHora"
                label="Fecha límite"
                type="date"
                value={fechaHora.getFullYear()+"-"+(parseInt(fechaHora.getMonth())+1).toString().padStart(2,'0')+
                "-"+fechaHora.getDate().toString().padStart(2,'0')}
                onChange={(e)=>setFechaHora(new Date(e.target.value))}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}/>
                <ErroresCampo errores={errores.fechahora}/>
            </Box>

            <Box margin={2}>
              <Typography>Tarea finalizada</Typography>
                <Switch label="Finalizada" id="checked" defaultValue={checked} value={checked} onChange={(e)=>setChecked(e.target.value)} />
                <ErroresCampo errores={errores.checked}/>
            </Box>

              <Typography htmlFor="atareado" color="text.secondary" align="left" >Asignar tarea</Typography>

              { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                    {usuarios && <Box display="flex">
              {(usuarios != null)?<Autocomplete
              sx={{width:'20%',margin:2}}
              options={usuarios}
              defaultValue={atareado || usuarios[0]}
              value={atareado}
              onChange={(e,value)=>setAtareado(value)}
              getOptionLabel={option => option.email}
              id="administrador"
              renderInput={(params) => (
                  <TextField {...params} label="Miembros" variant="standard" />
                )}
              />:null}
              </Box>}

              <Button variant="contained" onClick={(e)=>handleSubmit(e)}>Publicar</Button>

        </Box>}
        
        
    </Box>
    );
}

const InfoUsuarios = props =>{
  const tarea = props.tarea;
  const setTarea = props.setTarea;
  const atareado = props.setAtareado;
  const grupoempresa = props.grupoempresa;
  const grupocodigo = props.grupocodigo;
  const setAtareado = props.setAtareado;
  const [isPending,setIsPending] = useState(false);
  const [usuarios,setUsuarios] = useState([])

  useEffect(()=>{

    const abortCont = new AbortController();

    setTimeout(()=>{
      ControlGrupo.getUsuariosFromGrupo({empresa:{nif:grupoempresa},codigo:grupocodigo})
      .then(res =>{
        setUsuarios(res)
      })
    }, 1000)

    setIsPending(false)

    return abortCont.abort();

  },[grupoempresa,grupocodigo])

  return(

    <Box margin={2}>
          <Typography htmlFor="atareado" color="text.secondary" align="left" >Asignar tarea</Typography>

          { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }

          {usuarios && <Box display="flex">
              {(usuarios != null)?<Autocomplete
              sx={{width:'20%'}}
              options={usuarios}
              defaultValue={atareado || usuarios[0]}
              value={atareado}
              onChange={(e,value)=>setAtareado(value)}
              getOptionLabel={option => option.email}
              id="administrador"
              renderInput={(params) => (
                  <TextField {...params} label="Miembros" variant="standard" />
                )}
              />:null}
          </Box>}

    </Box>

  )

}
 
export default TaskForm;