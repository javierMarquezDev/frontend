import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import InputTexto from "../form/InputTexto";

const nuevoUsuario = (usuario,empresa) =>{

}

const NewUserCompanyForm = (props) => {

    const [usuarioNuevo,setUsuarioNuevo] = useState(null)
    const [errores,setErrores] = useState(null)

    //const empresa = props.empresa;
    const empresa = {nombre:"Aceites Benatae S.A.", nif: "E90671611"};
    return ( <div>
        <Box marginTop={3}>
            <Typography for="usuarios" align="left" fontWeight="bold">Añadir usuarios a la empresa {empresa.nombre}</Typography>

            <Box display="flex">
                <InputTexto formalName="Añadir miembro" 
                id = "usuarionuevo"
                property={usuarioNuevo} 
                setProperty={setUsuarioNuevo} 
                errores={(errores != null)?errores:null} />
            </Box>
            <Box display="flex" margin={2}>
                <Button variant="contained" onClick={()=>nuevoUsuario(usuarioNuevo,empresa)}>
                    Añadir usuario
                </Button>
            </Box>
        </Box>
            
                
    </div> );
}
 
export default NewUserCompanyForm;