import { Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import ControlGrupo from "../../back/control/controlGrupoProyecto";

const RowTarea = (props) => {

    const value = React.useContext(UserContext);
    const usuario = value.usuario;

    const row = props.row;
    const labelId = props.labelId;
    const handleDone = props.handleDone;
    
    const [grupo,setGrupo] = useState(null)
    const [admin,setAdmin] = useState(false)
    const [isPending,setIsPending] = useState(true);

    /**
     * Obtener información de grupo
     */
     useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{

            ControlGrupo.getById({nif:row.grupo.empresa},row.grupo.codigo)
            .then(data => {

                setGrupo(data);

                ControlGrupo.isAdmin(data,usuario)
                .then(res => {

                    setAdmin(res)
                    setIsPending(false);

                })

            })

        },1000)

        return abortCont.abort();
    },[row]);

    return ( 
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.codigo}
            id={row.codigo}
        >
            { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
            <TableCell
            component="th"
            id={labelId}
            scope="row"
            >
            {row.nombre}
            </TableCell>
            <TableCell align="right">{row.descripcion}</TableCell>
            {grupo && <TableCell align="right"><Link to={`/grupos/${grupo.empresa.nif}/${grupo.codigo}`}>{grupo.nombre}</Link></TableCell>}
            <TableCell align="right">{<Typography align="left" sx={{flexGrow:1, fontSize:12}}>{row.fechaHora.getFullYear()+"-"+(parseInt(row.fechaHora.getMonth())+1)+
                                    "-"+row.fechaHora.getDate()+` `+row.fechaHora.getHours().toString().padStart(2,'0')+":"
                                    +row.fechaHora.getMinutes().toString().padStart(2,'0')+"h"}</Typography>}</TableCell>
            <TableCell align="right">{row.checked?'Finalizada':'Pendiente'}</TableCell>
            <TableCell align="right" >
                <Button variant="contained" onClick={()=>{handleDone(row)}}>
                    {row.checked?'Marcar como no hecha':'Marcar como hecha'}
                </Button>
            </TableCell>

            {(admin)?<CellEdit row={row}/>:""}
            
            
        </TableRow>
     );
}

const CellEdit = (props) => {
    const row = props.row;

    return ( 
        <TableCell align="right">
            <Button variant="outlined">
                <Link   style={{textDecoration:"none"}} 
                        to={`/grupos/${row.grupo.empresa}/${row.grupo.codigo}/tareas/${row.codigo}/editar`}>
                    EDITAR
                </Link>
            </Button>
        </TableCell>
     );
}

 
export default RowTarea;