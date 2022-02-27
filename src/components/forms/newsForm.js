import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import InputTexto from "../form/InputTexto";

const NewsForm = () => {

    const grupo = {};
    let errores = [];
    let noticia = {}

    const submit = ()=>{}

    const [texto,setTexto] = useState((noticia.texto === null)?'':noticia.texto)

    return ( <Box sx={{width:'100%'}} display="flex">
        <InputTexto formalName="Escribir noticia" 
                    required = {true}
                    id = "texto"
                    property={texto} 
                    setProperty={setTexto} 
                    errores={errores.texto || null}
                    multiline={true}
                    sx={{width:'100%',margin:2}} />
        <Button variant="contained" onClick={()=>submit()}>Publicar</Button>
    </Box> );
}
 
export default NewsForm;