import { Autocomplete, Button, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import InputTexto from "../form/InputTexto";

const TaskForm = () => {

    const grupo = {};
    const optionsUsuarios = [];
    let errores = [];
    let tarea = {}

    const submit = ()=>{}

    const [descripcion,setDescripcion] = useState(tarea.texto || '')
    const [nombre,setNombre] = useState(tarea.descripcion || '')
    const [fechaHora,setFechaHora] = useState(tarea.fechaHora || new Date())
    const [checked,setChecked] = useState(tarea.checked || false)
    const [atareadoId,setAtareadoId] = useState(null)


    return ( <Box>

        <InputTexto formalName="Nombre" 
                    required = {true}
                    id = "nombre"
                    property={nombre} 
                    setProperty={setNombre} 
                    errores={errores.nombre || null}
                    />
        <InputTexto formalName="Descripción" 
                    required = {true}
                    id = "descripcion"
                    property={descripcion} 
                    setProperty={setDescripcion} 
                    errores={errores.descripcion || null}
                    multiline={true}
                    />
        <TextField
                        id="fechaHora"
                        label="Fecha límite"
                        type="date"
                        defaultValue={fechaHora}
                        value={fechaHora}
                        onChange={()=>setFechaHora()}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}/>

        <Box margin={2}>
                        <Typography>Tarea finalizada</Typography>
                        <Switch label="Finalizada" id="checked" value={checked} onChange={()=>setChecked()} />
                    </Box>

        <Box margin={2}>
          <Typography for="atareado" color="text.secondary" align="left" >Asignar a usuario</Typography>

          <Box display="flex">
              {(optionsUsuarios.length)?<Autocomplete
              options={optionsUsuarios}
              defaultValue={atareadoId}
              value={atareadoId}
              onChange={()=>setAtareadoId()}
              id="administrador"
              renderInput={(params) => (
                  <TextField {...params} label="Miembros" variant="standard" />
                )}
              />:null}
          </Box>

        </Box>

        <Button variant="contained" onClick={()=>submit()}>Publicar</Button>
    </Box> );
}
 
export default TaskForm;