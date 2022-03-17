import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Usuario from "../../back/model/Usuario";
import InputTexto from "../form/InputTexto";

import ControlUsuario from "../../back/control/controlUsuario";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ErroresCampo from "../form/ErroresCampo";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";
import useNotificar from "../home/notificar";

const UserForm = (props) => {

    const notificar = useNotificar();

    
    const {idusuario} = useParams();
    const [usuario,setUsuario] = useState(new Usuario());
    const history = useHistory();

    const valueSesion = React.useContext(UserContext);
    const usuarioSesion = valueSesion.usuario;

    const [email,setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [dni,setDni] = useState('');
    const [nombre,setNombre] = useState('');
    const [apellido1,setApellido1] = useState('');
    const [apellido2,setApellido2] = useState('');
    
    const [nombreVia,setNombreVia] = useState('');
    const [numVia,setNumVia] = useState('');
    const [codigoPuerta,setCodigoPuerta] = useState('');
    const [errores,setErrores] = useState({});
    const [isPending,setIsPending] = useState(false);
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [usuarioIsAdmin, setUsuarioIsAdmin] = useState(false);

    useEffect(()=>{

        const abortCont = new AbortController();

        if(usuarioSesion){
          if(usuarioSesion.email === idusuario){
            setUsuarioIsAdmin(true);

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
                
                setNombreVia(res.nombrevia)
                setNumVia(res.numvia)
                setCodigoPuerta(res.codigoPuerta || '')
                setLocalidad(res.localidad)
                setProvincia(res.provincia)
    
                setIsPending(false)
              })
            }, 1000)}
    


          }

        }
          

        
        return abortCont.abort();

    },[idusuario])
    
    const handleCreate = (e) =>{

      e.preventDefault();

      const nuevoUsuario = new Usuario(email, null, dni, nombre,
        apellido1, apellido2, nombreVia,
        numVia, codigoPuerta,null,localidad,provincia);

      if(idusuario){
        ControlUsuario.edit(nuevoUsuario)
        .then(data =>{
          if(data.error != null){
            notificar({type:"ERROR",message:data.message})
          }else
          if(data.message != null){
            props.setHasChanged(true)
            history.push(`/${idusuario}/perfil`)
            notificar({type:"SUCCESS",message:data.error})
          }
            setErrores(data);
        })
      }else{
        ControlUsuario.create(nuevoUsuario)
        .then(data => {
          if(data.error != null){
            notificar({type:"ERROR",message:data.message})
          }else
          if(data.message != null){
            history.push('/login')
            notificar({type:"SUCCESS",message:data.message})
          }
            setErrores(data);
        })
      }

    }

    return ( <div>
      <Box sx={{margin:2}}>

        { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }

        <Typography align="left" variant="h5" marginTop={4} marginBottom={2} >Editar usuario {(usuario.email==null)?"nuevo":usuario.email}</Typography>

        <Button variant="contained" onClick={(e)=>handleCreate(e)}>Terminar</Button>

        {usuario && <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            width:'70%'
          }}
        >
            <InputTexto formalName="Dirección de e-mail" 
                        required = {true}
                        id = "email"
                        property={email} 
                        setProperty={setEmail} 
                        errores={errores.email || null}
                        disabled={(idusuario)?true:false}
                        sx={{margin:2}}
                        />

            {/*<InputTexto formalName="Contraseña" 
                        required = {true}
                        id = "contrasena"
                        property={contrasena} 
                        setProperty={setContrasena} 
                        errores={errores.contrasena || null}
                        
                        password={true}
                        sx={{margin:2}}
        />*/}

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

            {/*<Box sx={{margin:2}}>
                <Box display="flex">
                    {(tiposVia.length)?<Autocomplete
                    options={tiposVia}
                    defaultValue={{label:"C./", id:"C./"}}
                    value={tipoVia}
                    onChange={(e,value)=>setTipoVia(value)}
                    id="tipoVia"
                    renderInput={(params) => (
                        <TextField {...params} label="Tipo de vía" variant="standard" />
                        )}
                    />:null}
                </Box>

                <ErroresCampo errores={errores.tipovia}/>
            </Box>*/}

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

            <InputTexto formalName="Localidad" 
                      id = "localidad"
                      property={localidad} 
                      setProperty={setLocalidad} 
                      errores={errores.localidad || null}
                      sx={{margin:2}}/>

            <InputTexto formalName="Provincia" 
                      id = "provincia"
                      property={provincia} 
                      setProperty={setProvincia} 
                      errores={errores.provincia || null}
                      sx={{margin:2}}/>
            </Box>}

        
    </Box>
    
    </div>);
}
 
export default UserForm;