import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControlNoticia from "../../back/control/controlNoticia";
import Noticia from "../../back/model/Noticia";
import InputTexto from "../form/InputTexto";



const NewsForm = () => {

    const submit = ()=>{}

    const {grupoempresa,grupocodigo,autor,codigo} = useParams();
    const [errores,setErrores] = useState({})
    const [noticia,setNoticia] = useState(new Noticia())
    const [texto,setTexto] = useState('')
    const [noticiaCodigo,setCodigo] = useState('')
    const [usuario,setUsuario] = useState(null)
    const [grupo,setGrupo] = useState(null)
    const [fechaHora,setFechaHora] = useState(null)
    const [isPending, setIsPending] = useState(true);

    useEffect(()=>{

        const abortCont = new AbortController();

        if(grupoempresa && grupocodigo && autor && codigo){setTimeout(()=>{
          ControlNoticia.getById(grupoempresa,grupocodigo,autor,codigo)
          .then(res =>{
              console.log(res)


            setNoticia(res)

            setCodigo(res.codigo)
            setTexto(res.texto)
            setUsuario(res.usuario)
            setGrupo(res.grupo)
            setFechaHora(res.fechaHora)

            setIsPending(false)
          })
        }, 1000)}

        return abortCont.abort();

    },[grupoempresa,grupocodigo])

    return ( <div>
        {noticia && <Box sx={{width:'100%'}} display="flex">
        <InputTexto formalName={(noticia.codigo)?"Editar noticia":"Escribir noticia" }
                    required = {true}
                    id = "texto"
                    property={texto} 
                    setProperty={setTexto} 
                    errores={errores.texto || null}
                    multiline={true}
                    sx={{width:'100%',margin:2}} />
        <Button variant="contained" onClick={()=>submit()}>Publicar</Button>
    </Box>}
    </div> );
}
 
export default NewsForm;