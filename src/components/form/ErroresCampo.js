import { FormHelperText } from "@mui/material";

const ErroresCampo = (props)=>{

    const errores = props.errores;

    console.log(errores)
    
    let array = [];

    for(let key in errores){
        array.push(errores[key])
    }

    return(
        array.map(error=>{
            return(
                <FormHelperText>{error}</FormHelperText>
            )
        })
    )
    
}

export default ErroresCampo;