import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

const InputTexto = (props)=>{

    const id = props.id;
    const property = props.property;
    const setProperty = props.setProperty;
    const errores = props.errores;
    const formalName = props.formalName;
    const required = props.required;
    const multiline = props.multiline;
    const password = props.password;
    const sx = props.sx;

    return(
        <FormControl variant="standard" sx={{margin:1}} sx={sx}>
            <InputLabel htmlFor={`${id}`}>{formalName}</InputLabel>
            {(multiline)?
            <Input
            required={(required)?"true":"false"}
            error={(errores === null)?false:true}
            id={`${id}`}
            value={property}
            defaultValue={property}
            multiline
            onChange={(e)=>setProperty(e.target.value)}
            />:
            <Input
            required={(required)?"true":"false"}
            error={(errores === null)?false:true}
            id={`${id}`}
            value={property}
            defaultValue={property}
            onChange={(e)=>setProperty(e.target.value)}
            type={(password == true)?"password":""}
            />}

                {(errores)?<ErroresCampo errores={errores}/>:null}

          </FormControl>
    )

}


const ErroresCampo = (props)=>{

    const errores = props.errores;
    
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
    
export default InputTexto;