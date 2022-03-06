import { Autocomplete, FormLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete"
import List from "@mui/material/List"
import Button from "@mui/material/Button"
import ListItem from "@mui/material/ListItem"
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person'
import React, {useEffect, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Empresa from "../../back/model/Empresa";
import Grid from "@mui/material/Grid"
import InputUsuario from "../form/InputUsuario";
import GrupoProyecto from "../../back/model/GrupoProyecto";
import InputTexto from "../form/InputTexto";
import { useParams } from "react-router-dom";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import notificar from "../home/notificar";
import { useHistory } from "react-router-dom";
import ControlEmpresa from "../../back/control/controlEmpresa";
import ErroresCampo from "../form/ErroresCampo";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";

const GroupForm = () => {

    const {grupoempresa} = useParams() || '';
    const {grupocodigo} = useParams() || '';
    const history = useHistory();
    
    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    console.log(value)

    const [codigo,setCodigo] = useState('')
    const [empresas,setEmpresas] = useState([])
    const [errores,setErrores] = useState({});
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaHora, setFechaHora] = useState(new Date());
    const [finalizado, setFinalizado] = useState(false);
    const [administrador, setAdministrador] = useState(null);
    const [empresa, setEmpresa] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [grupo,setGrupo] = useState(new GrupoProyecto())
    const [usuarios,setUsuarios] = useState([]);
    const [usuarioIsAdmin,setUsuarioIsAdmin] = useState(false);

    useEffect(()=>{
        const abortCont = new AbortController();
  
        setTimeout(()=>{

            if(grupoempresa){
                ControlGrupo.getById({nif:grupoempresa},grupocodigo)
                .then(data=>{

                    if(data.administrador.email == usuario.email){
                        setUsuarioIsAdmin(true);

                        setGrupo(data)

                        setCodigo(data.codigo)
                        setNombre(data.nombre);
                        setDescripcion(data.descripcion);
                        setFechaHora(data.fechaHora);
                        setFinalizado(data.finalizado);
                        setAdministrador(data.administrador);
                        setEmpresa(data.empresa);
                        

                        ControlGrupo.getUsuariosFromGrupo(data)
                        .then(res => {
                            data.usuarios = res;
                            setGrupo(data)
                        })

                        ControlEmpresa.getEmpresaByAdmin(usuario)
                        .then(res =>{
                            console.log(res)
                            setEmpresas(res);
                            setIsPending(false)
                        })


                    }
                    
                    
            
            
                })

            }else{
                ControlEmpresa.getEmpresaByAdmin(usuario)
                .then(res =>{
                    console.log(res)
                    setEmpresas(res);
                    setIsPending(false)
                })

                setIsPending(false)
            }                

            

        }, 1000)

        return abortCont.abort();
    },[grupoempresa,grupocodigo])

    const handleSubmit = (e) =>{

        console.log(fechaHora)

        const nuevoGrupo = new GrupoProyecto(codigo, empresa, nombre,
                                            descripcion, administrador, fechaHora,
                                            finalizado)

        if(grupocodigo && grupoempresa){
            
            console.log(nuevoGrupo)            

            ControlGrupo.edit(nuevoGrupo)
            .then(data => {
                if(data.error != null){
                    notificar(data.message+" "+data.error.message)
                }else
                if(data.message != null){
                    
                    notificar(data.message)

                    console.log(usuarios)

                }
                    setErrores(data);

                    ControlGrupo.modifyUsuariosBulk(nuevoGrupo, usuarios)
                    .then(res => {
                        
                        if(res.administrador){
                            data.administrador = res.administrador;
                            setErrores(data);

                        }
                            
                        
                    })
                    
                })
            
        
        }else{
            ControlGrupo.create(nuevoGrupo)
            .then(data => {
                if(data.error != null){
                    notificar(data.message+" "+data.error)
                  }else

                  if(data.message != null){

                    notificar(data.message)

                    console.log(data.grupo)

                    ControlGrupo.addUsuariosBulk(data.grupo, usuarios)
                    .then(data => {
                        notificar(data.message)
                        //history.push('/grupos')
                    })
                  }
                    setErrores(data);
            })
        }

    }

    return ( 
            <div>

        {(usuarioIsAdmin || (grupocodigo,grupoempresa == null))
        ?<div>
                <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Editar grupo {nombre || "nuevo"}</Typography>

                <Box display="flex">
                    <Button variant="contained" onClick={(e)=>handleSubmit(e)}>Terminar</Button>
                </Box>
        
                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                {grupo && <Box>
                <Box
                component="form"
                sx={{
                
                width:'70%'
                }}
                noValidate
                autoComplete="off"
                >

                    <Box
                    display="flex"
                    >
                    
                        <InputTexto formalName="Nombre" 
                        required = {true}
                        id = "nombre"
                        property={nombre} 
                        setProperty={setNombre} 
                        errores={errores.nombre || null}
                        sx={{margin:2}} />
                    
                        <InputTexto formalName="Descripción" 
                        required = {true}
                        id = "descripcion"
                        property={descripcion} 
                        setProperty={setDescripcion} 
                        errores={errores.descripcion || null}
                        multiline={true}
                        sx={{margin:2}} />
                    

                        <Box margin={2}>
                            
                                <Typography>Finalizado</Typography>
                                <Switch label="Finalizado" id="finalizado" defaultValue={false} value={finalizado} onChange={(e)=>setFinalizado(e.target.value)} />
                                <ErroresCampo errores={errores.finalizado}/>
                            
                        </Box>
                        

                        <Box>
                            <TextField
                                id="fechaHora"
                                label="Fecha límite"
                                type="date"
                                defaultValue={fechaHora.getFullYear()+"-"+(parseInt(fechaHora.getMonth())+1).toString().padStart(2,'0')+
                                "-"+fechaHora.getDate().toString().padStart(2,'0')}
                                value={fechaHora.getFullYear()+"-"+(parseInt(fechaHora.getMonth())+1).toString().padStart(2,'0')+
                                "-"+fechaHora.getDate().toString().padStart(2,'0')}
                                onChange={(e)=>setFechaHora(new Date(e.target.value))}
                                sx={{ width: 220,margin:2 }}
                                InputLabelProps={{
                                shrink: true,
                                }}/>
                            <ErroresCampo errores={errores.fechahora}/>
                        </Box>
                        
                            
                    </Box>


                    <Box margin={2}>
                        <Typography for="administrador" color="text.secondary" align="left" >Administrador</Typography>

                        <Box display="flex">
                        {(usuarios)?<Autocomplete
                        options={usuarios}
                        defaultValue={administrador}
                        value={administrador}
                        onChange={(e,value)=>setAdministrador(value)}
                        getOptionLabel={option => option.email}
                        sx={{width:'30%'}}
                        id="administrador"
                        
                        renderInput={(params) => (
                            <TextField {...params} label="Miembros" variant="standard" />
                            )}
                        />:null}
                        <ErroresCampo errores={(errores != null)?errores.administrador:null}/>
                    </Box>

                </Box>

                {(!grupoempresa)?<Box margin={2}>
                    <Typography for="empresa" color="text.secondary" align="left">Empresa</Typography>

                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }

                    {empresas && <Box display="flex">
                        {(empresas != null)?<Autocomplete
                        options={empresas}
                        value={empresa}
                        defaultValue=""
                        onChange={(e,value)=>setEmpresa(value)}
                        getOptionLabel={option => option.nif}
                        id="empresa"
                        sx={{width:'30%'}}
                        renderInput={(params) => (
                            <TextField {...params} label="Empresas" variant="standard" />
                            )}
                        />:null}
                    </Box>}
                    <ErroresCampo errores={errores.empresa}/>
                </Box>:""}

                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                    {(empresa && ((grupoempresa && grupocodigo)?grupo.usuarios:true)) && <InputUsuario empresa={empresa} 
                                              tabla={grupo} 
                                              errores={errores.usuarios||null} 
                                              usuarios={grupo.usuarios}
                                              setUsuarios={setUsuarios}/>}
                </Box>
                </Box>
                }

        </div>
        :<AccessDenied/>}

            </div>
     );
}
 
export default GroupForm;