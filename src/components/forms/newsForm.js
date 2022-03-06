import { Box, Button, Typography } from "@mui/material";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControlNoticia from "../../back/control/controlNoticia";
import Noticia from "../../back/model/Noticia";
import InputTexto from "../form/InputTexto";
import notificar from "../home/notificar";
import { useHistory } from "react-router-dom";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";


const NewsForm = () => {

    const valueSesion = React.useContext(UserContext);
    const usuarioSesion = valueSesion.usuario;
    const token = valueSesion.token;
    const history = useHistory();

    const {grupoempresa,grupocodigo,autor,codigo} = useParams();
    const [errores,setErrores] = useState({})
    const [noticia,setNoticia] = useState(new Noticia())
    const [texto,setTexto] = useState('')
    const [noticiaCodigo,setCodigo] = useState('')
    const [usuario,setUsuario] = useState(usuarioSesion)
    const [grupo,setGrupo] = useState(null)
    const [fechaHora,setFechaHora] = useState(null)
    const [isPending, setIsPending] = useState(true);
    const [usuarioIsAdmin,setUsuarioIsAdmin] = useState(false);
    const [usuarioIsPoster,setUsuarioIsPoster] = useState(false);

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
          if(autor && codigo){ControlNoticia.getById(grupoempresa,grupocodigo,autor,codigo)
          .then(res =>{
                        
              setNoticia(res)

              setCodigo(res.codigo)
              setTexto(res.texto)
              setUsuario(res.usuario)
              setFechaHora(res.fechaHora)

              if(usuario.email == usuarioSesion.email)
                setUsuarioIsPoster(true);

            setIsPending(false)
          })}

          if(grupoempresa && grupocodigo){

            ControlGrupo.getById({nif:grupoempresa},grupocodigo)
            .then(data => {
              console.log(data)
              setGrupo(data)
              if(data.administrador.email == usuarioSesion.email)
                setUsuarioIsAdmin(true);
            })

          }
        }, 1000)

        return abortCont.abort();

    },[grupoempresa,grupocodigo,autor,codigo])

    const handleSubmit = (e) =>{
      const nuevaNoticia = new Noticia(codigo, usuario, grupo, texto, fechaHora);

      if(codigo){

        ControlNoticia.edit(nuevaNoticia)
        .then(data=>{
          if(data.error != null){
            notificar(data.message+" "+data.error.message)
          }else
          if(data.message != null){
            history.go(-1)
            notificar(data.message)
          }
            setErrores(data);
        })

      }else{
        nuevaNoticia.fechaHora = new Date(Date.now())
        ControlNoticia.create(nuevaNoticia)
        .then(data =>{
          if(data.error != null){
            notificar(data.message+" "+data.error)
          }else
          if(data.message != null){
            history.go(0)
            notificar(data.message)
          }
            setErrores(data);
        })

      }

    }

    return ( <div>
        {(noticia || grupo) && 
        ((codigo && autor)?((usuarioIsPoster)?<Box sx={{width:'100%'}} display="flex">
        <InputTexto formalName={(noticia.codigo)?"Editar noticia":"Escribir noticia" }
                    required = {true}
                    id = "texto"
                    property={texto} 
                    setProperty={setTexto} 
                    errores={errores.texto || null}
                    multiline={true}
                    sx={{width:'100%',margin:2}} />
        <Button variant="contained" onClick={(e)=>handleSubmit(e)}>Publicar</Button>
    </Box>
    :<AccessDenied/>)
    :
    <Box sx={{width:'100%'}} display="flex">
        <InputTexto formalName={(noticia.codigo)?"Editar noticia":"Escribir noticia" }
                    required = {true}
                    id = "texto"
                    property={texto} 
                    setProperty={setTexto} 
                    errores={errores.texto || null}
                    multiline={true}
                    sx={{width:'100%',margin:2}} />
        <Button variant="contained" onClick={(e)=>handleSubmit(e)}>Publicar</Button>
    </Box>)}
    </div> );
}
 
export default NewsForm;