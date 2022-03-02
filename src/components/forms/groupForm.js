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
import {useEffect, useState} from 'react';
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

const GroupForm = () => {

    const {grupoempresa} = useParams() || '';
    const {grupocodigo} = useParams() || '';
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

    useEffect(()=>{
        const abortCont = new AbortController();

        
            setTimeout(()=>{
            ControlGrupo.getById({nif:grupoempresa},grupocodigo)
            .then(data=>{
                console.log(data)
                setGrupo(data)
                setNombre(data.nombre);
                setDescripcion(data.descripcion);
                setFechaHora(data.fechaHora);
                setFinalizado(data.finalizado);
                setAdministrador(data.administrador);
                setEmpresa(data.empresa);
                setIsPending(false)

                ControlGrupo.getUsuariosFromGrupo(data)
                .then(res => {
                    data.usuarios = res;
                    setGrupo(data)
                })
            })
        }, 1000)

        setIsPending(false)

        return abortCont.abort();
    },[grupoempresa,grupocodigo])

    const getEmpresas = (e)=>{
        const nombre = e.target.value;
    }

    

    return ( <div>
                <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Editar grupo {nombre || "nuevo"}</Typography>

        
                <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 2, width: '25ch' },
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
                        errores={errores.nombre || null} />
                    
                        <InputTexto formalName="Descripción" 
                        required = {true}
                        id = "descripcion"
                        property={descripcion} 
                        setProperty={setDescripcion} 
                        errores={errores.descripcion || null}
                        multiline={true} />
                    

                        <Box margin={2}>
                            <Typography>Finalizado</Typography>
                            <Switch label="Finalizado" id="finalizado" value={finalizado} onChange={(e)=>setFinalizado(e.target.value)} />
                        </Box>
                        

                        <TextField
                            id="fechaHora"
                            label="Fecha límite"
                            type="date"
                            defaultValue={fechaHora.getFullYear()+"-"+fechaHora.getMonth().toString().padStart(2,'0')+
                            "-"+fechaHora.getDate().toString().padStart(2,'0')}
                            value={fechaHora.getFullYear()+"-"+fechaHora.getMonth().toString().padStart(2,'0')+
                            "-"+fechaHora.getDate().toString().padStart(2,'0')}
                            onChange={()=>setFechaHora()}
                            sx={{ width: 220 }}
                            InputLabelProps={{
                            shrink: true,
                            }}/>
                            
                    </Box>


                    <Box margin={2}>
                        <Typography for="administrador" color="text.secondary" align="left" >Administrador</Typography>

                        <Box display="flex">
                        {(grupo.usuarios != null)?<Autocomplete
                        options={grupo.usuarios}
                        defaultValue={""}
                        value={administrador}
                        onChange={(e,value)=>setAdministrador(value)}
                        getOptionLabel={option => option.email}
                        id="administrador"
                        renderInput={(params) => (
                            <TextField {...params} label="Miembros" variant="standard" />
                            )}
                        />:null}
                    </Box>

                </Box>


                <Box margin={2}>
                    <Typography for="empresa" color="text.secondary" align="left" >Empresa</Typography>

                    <Box display="flex">
                        {(empresas.length)?<Autocomplete
                        options={empresas}
                        value={empresa}
                        onChange={()=>setEmpresa()}
                        onKeyUp={()=>getEmpresas()}
                        getOptionLabel={option => option.nif}
                        id="empresa"
                        renderInput={(params) => (
                            <TextField {...params} label="Empresas" variant="standard" />
                            )}
                        />:null}
                    </Box>
                </Box>

                <InputUsuario tabla={grupo} errores={errores.usuarios||null} usuarios={grupo.usuarios||null}/>
                </Box>

    </div> );
}
 
export default GroupForm;