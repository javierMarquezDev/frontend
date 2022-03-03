import { Box, Button, Typography } from "@mui/material";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControlNoticia from "../../back/control/controlNoticia";
import Noticia from "../../back/model/Noticia";
import InputTexto from "../form/InputTexto";
import notificar from "../home/notificar";
import { useHistory } from "react-router-dom";
import ControlGrupo from "../../back/control/controlGrupoProyecto";


const NewsForm = () => {

    const email = "higo@gmail.com"
    const history = useHistory();

    const {grupoempresa,grupocodigo,autor,codigo} = useParams();
    const [errores,setErrores] = useState({})
    const [noticia,setNoticia] = useState(new Noticia())
    const [texto,setTexto] = useState('')
    const [noticiaCodigo,setCodigo] = useState('')
    const [usuario,setUsuario] = useState({email:email})
    const [grupo,setGrupo] = useState(null)
    const [fechaHora,setFechaHora] = useState(null)
    const [isPending, setIsPending] = useState(true);

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

            setIsPending(false)
          })}

          if(grupoempresa && grupocodigo){

            ControlGrupo.getById({nif:grupoempresa},grupocodigo)
            .then(data => {
              console.log(data)
              setGrupo(data)
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
        {(noticia || grupo) && <Box sx={{width:'100%'}} display="flex">
        <InputTexto formalName={(noticia.codigo)?"Editar noticia":"Escribir noticia" }
                    required = {true}
                    id = "texto"
                    property={texto} 
                    setProperty={setTexto} 
                    errores={errores.texto || null}
                    multiline={true}
                    sx={{width:'100%',margin:2}} />
        <Button variant="contained" onClick={(e)=>handleSubmit(e)}>Publicar</Button>
    </Box>}
    </div> );
}
 
export default NewsForm;