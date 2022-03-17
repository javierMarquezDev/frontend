import { Autocomplete, TextField, Typography, Switch as CheckBox} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../App";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import ControlTarea from "../../back/control/controlTarea";
import InputTexto from "../form/InputTexto";
import useNotificar from "../home/notificar";
import DataTable from "../tables/dataTable";

const UserTasksList = () => {

    const notificar = useNotificar()

    const value = React.useContext(UserContext);
    const usuario = value.usuario;

    const match = useRouteMatch();

    const sorterFechaHoraDesc = (a,b) => (a.fechaHora < b.fechaHora)?1:(-1);
    const sorterFechaHoraAsc = (a,b) => (a.fechaHora > b.fechaHora)?1:(-1);
    const sorterCheckedAsc = (a,b) => a.checked?1:(-1);
    const sorterCheckedDesc = (a,b) => !a.checked?1:(-1);


    const [tareas,setTareas] = useState([]);
    const [isPending,setIsPending] = useState(true);
    const [hasChanged,setHasChanged] = useState(false);
    const [filterChecked,setFilterChecked] = useState(null)
    const [filterGrupo, setFilterGrupo] = useState(null);


    const handleDone = tarea =>{

        (tarea.checked)?tarea.checked=false:tarea.checked = true;
    
        ControlTarea.edit(tarea)
        .then(data => {
            setHasChanged(true)
        })

    }

    /**
     * Obtener lista de tareas
     */
    useEffect(()=>{
        const abortCont = new AbortController();

        setTimeout(()=>{

            ControlTarea.getFromUsuario(usuario.email)
            .then(data => {

                let tareasSorted = data;

                if(filterGrupo !== null)
                    tareasSorted = tareasSorted.filter(element => element.grupo.codigo === filterGrupo.codigo)

                if(filterChecked !== null)
                {
                    if(filterChecked){
                        tareasSorted = tareasSorted.filter(element => element.checked);
                    }else{
                        tareasSorted = tareasSorted.filter(element => !element.checked);
                    }
                }
                    


                setTareas(tareasSorted)
                setIsPending(false);
                setHasChanged(false)

            })

        },1000)

        return abortCont.abort();
    },[usuario, hasChanged,filterChecked,filterGrupo]);

    return ( 
       <Switch>
           <Route path={`${match.path}`}>
                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                <h1>Tareas</h1>

                <Box display="flex">
                    <FormGrupoFilter usuario={usuario} setFilterGrupo={setFilterGrupo}/>

                    <Box sx={{margin:2}}>
                        <Typography sx={{fontSize:10}}>Filtrar por esrtado de consecución</Typography>
                        <CheckBox onChange={(e,value)=>{setFilterChecked(value)}} />
                    </Box>
                </Box>
                
                {tareas && <DataTable rows={tareas} match={match} handleDone={handleDone} entidad="tarea" />}
           </Route>
           <Route path="*">

           </Route>
       </Switch> 
     );
}

const FormGrupoFilter = (props)=>{

    const [grupos,setGrupos] = useState([]);
    const [grupo,setGrupo] = useState(null);
    const [isPending,setIsPending] = useState(true);

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{

            ControlGrupo.getFromUsuario(props.usuario.email)
            .then(data => {
                setGrupos(data);
                setIsPending(false);
            })

        },1000)

        return abortCont.abort();

    },[])

    return(
        <Box display="flex" sx={{width:'20%'}}>
            {grupos && <Autocomplete
            options={grupos}
            value={grupo}
            defaultValue=""
            onChange={(e,value)=>{setGrupo(value);props.setFilterGrupo(value)}}
            getOptionLabel={option => option.nombre}
            id="filterGrupo"
            sx={{width:'100%',margin:2}}
            renderInput={(params) => (
                <TextField {...params} label="Filtrar por grupo" variant="standard" />
            )}/>}
        </Box>
    )

}
 
export default UserTasksList;