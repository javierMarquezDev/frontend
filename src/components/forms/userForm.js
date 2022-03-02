import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Usuario from "../../back/model/Usuario";
import InputTexto from "../form/InputTexto";
import TiposVia from "../../back/model/TiposVia";
import ControlUsuario from "../../back/control/controlUsuario";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ErroresCampo from "../form/ErroresCampo";
import notificar from "../home/notificar";

const UserForm = () => {

    const tiposVia = TiposVia;
    const {idusuario} = useParams();
    const [usuario,setUsuario] = useState(new Usuario());
    const history = useHistory();

    const [email,setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [dni,setDni] = useState('');
    const [nombre,setNombre] = useState('');
    const [apellido1,setApellido1] = useState('');
    const [apellido2,setApellido2] = useState('');
    const [tipoVia,setTipoVia] = useState('');
    const [nombreVia,setNombreVia] = useState('');
    const [numVia,setNumVia] = useState('');
    const [codigoPuerta,setCodigoPuerta] = useState('');
    const [errores,setErrores] = useState({});
    const [isPending,setIsPending] = useState(false);

    useEffect(()=>{

        const abortCont = new AbortController();

        if(idusuario){setTimeout(()=>{
          ControlUsuario.getById(idusuario)
          .then(res =>{
              console.log(res)
            setUsuario(res)

            setEmail(res.email)
            setDni(res.dni)
            setNombre(res.nombre)
            setApellido1(res.apellido1)
            setApellido2(res.apellido2 || '')
            setTipoVia(res.tipovia)
            setNombreVia(res.nombrevia)
            setNumVia(res.numvia)
            setCodigoPuerta(res.codigoPuerta || '')

            setIsPending(false)
          })
        }, 1000)}

        return abortCont.abort();

    },[idusuario])
    
    const handleCreate = (e) =>{

      e.preventDefault();

      const nuevoUsuario = new Usuario(email, contrasena, dni, nombre,
        apellido1, apellido2, tipoVia.id, nombreVia,
        numVia, codigoPuerta);

      console.log(nuevoUsuario)

      if(idusuario){
        ControlUsuario.edit(nuevoUsuario)
        .then(data =>{
          if(data.message != null){
            history.go(-2)
            notificar(data.message)
          }
            setErrores(data);
        })
      }else{
        ControlUsuario.create(nuevoUsuario)
        .then(data => {
          if(data.message != null){
            history.go(-3)
            notificar(data.message)
          }
            setErrores(data);
        })
      }

    }

    return ( <div>
        <Typography align="left" variant="h5">Editar usuario {(usuario.email==null)?"nuevo":""}</Typography>

        
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            width:'70%'
          }}
          noValidate
          autoComplete="off"
        >
            <InputTexto formalName="Dirección de e-mail" 
                        required = {true}
                        id = "email"
                        property={email} 
                        setProperty={setEmail} 
                        errores={errores.email || null}
                        disabled={true}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Contraseña" 
                        required = {true}
                        id = "contrasena"
                        property={contrasena} 
                        setProperty={setContrasena} 
                        errores={errores.contrasena || null}
                        
                        password={true}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="DNI" 
                        required = {true}
                        id = "dni"
                        property={dni} 
                        setProperty={setDni} 
                        errores={errores.dni || null}
                        
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Nombre" 
                        required = {true}
                        id = "nombre"
                        property={nombre} 
                        setProperty={setNombre} 
                        errores={errores.nombre || null}
            
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Primer apellido" 
                        required = {true}
                        id = "apellido1"
                        property={apellido1} 
                        setProperty={setApellido1} 
                        errores={errores.apellido1 || null}
                        
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Segundo apellido" 
                        required = {false}
                        id = "apellido2"
                        property={apellido2} 
                        setProperty={setApellido2} 
                        errores={errores.apellido2 || null}
                        
                        sx={{margin:2}}
                        />

            <Box sx={{margin:2}}>
                <Box display="flex">
                    {(tiposVia.length)?<Autocomplete
                    options={tiposVia}
                    defaultValue={tipoVia || "C./"}
                    value={tipoVia}
                    onChange={(e,value)=>setTipoVia(value)}
                    id="tipoVia"
                    renderInput={(params) => (
                        <TextField {...params} label="Tipo de vía" variant="standard" />
                        )}
                    />:null}
                </Box>

                <ErroresCampo errores={errores.tipovia}/>
            </Box>

            <InputTexto formalName="Nombre de vía" 
                        required = {true}
                        id = "nombrevia"
                        property={nombreVia} 
                        setProperty={setNombreVia} 
                        errores={errores.nombrevia || null}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Número de vía" 
                        required = {true}
                        id = "numvia"
                        property={numVia} 
                        setProperty={setNumVia} 
                        errores={errores.numvia || null}
                        sx={{margin:2}}
                        />

            <InputTexto formalName="Código de puerta" 
                        id = "codigopuerta"
                        property={codigoPuerta} 
                        setProperty={setCodigoPuerta} 
                        errores={errores.codigopuerta || null}
                        sx={{margin:2}}
                        />
            </Box>

        <Button variant="contained" onClick={(e)=>handleCreate(e)}>Terminar</Button>
    </div> );
}
 
export default UserForm;