import { Box, Button, Typography } from "@mui/material";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControlNoticia from "../../back/control/controlNoticia";
import Noticia from "../../back/model/Noticia";
import InputTexto from "../form/InputTexto";
import { useHistory } from "react-router-dom";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";
import useNotificar from "../home/notificar";


const NewsForm = (props) => {

  const notificar = useNotificar();

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
    const setHasChanged = props.setHasChanged;

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
          if(autor && codigo){
            ControlNoticia.getById(grupoempresa,grupocodigo,autor,codigo)
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
            notificar({type:"ERROR",message:data.message})
          }else
          if(data.message != null){
            notificar({type:"SUCCESS",message:data.message})
            setHasChanged(true);
            history.push(`/grupos/${grupoempresa}/${grupocodigo}/noticias`)
          }
            setErrores(data);
        })

      }else{
        nuevaNoticia.fechaHora = new Date(Date.now())
        ControlNoticia.create(nuevaNoticia)
        .then(data =>{
          if(data.error != null){
            notificar({type:"ERROR",message:data.message})
          }else
          if(data.message != null){
            notificar({type:"SUCCESS",message:"Noticia publicada con éxito."})
            setHasChanged(true);
            
          }
            setErrores(data);
        })

      }

    }

    return ( <div>
        {(noticia || grupo) && 
        <Box sx={{width:'100%'}} display="flex">
        <InputTexto formalName={(noticia.codigo)?"Editar noticia":"Escribir noticia" }
                    required = {true}
                    id = "texto"
                    property={texto} 
                    setProperty={setTexto} 
                    errores={errores.texto || null}
                    multiline={true}
                    sx={{width:'100%',margin:2}} />
        <Button variant="contained" onClick={(e)=>{setTexto(''); handleSubmit(e)}}>Publicar</Button>
    </Box>}
    
    </div> );
}
 
export default NewsForm;