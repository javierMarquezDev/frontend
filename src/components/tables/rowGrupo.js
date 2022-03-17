import { Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import ControlGrupo from "../../back/control/controlGrupoProyecto";
import ControlSesion from "../../back/control/controlSesion";

const RowGrupo = (props) => {

    const row = props.row;
    const handleDelete = props.handleDelete;
    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;
    const [admin,setAdmin] = useState(false);

    useEffect(()=>{
        ControlGrupo.isAdmin(row,usuario).then((res)=>{
            (res)?setAdmin(true):setAdmin(false);
        })
    });

    

    return ( 
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.empresa+row.codigo}
            id={row.empresa+row.codigo}
        >
            
            
            <TableCell
            component="th"
            id={row.codigo}
            scope="row"
            sx={{fontWeight:'bold'}}
            >
            {row.nombre}
            </TableCell>
            <TableCell align="right">{row.descripcion}</TableCell>
            <TableCell align="right">{row.empresa.nif}</TableCell>
            <TableCell align="right">{row.administrador.email}</TableCell>
            <TableCell align="right">{<Typography align="left" sx={{flexGrow:1, fontSize:12}}>{row.fechaHora.getFullYear()+"-"+(parseInt(row.fechaHora.getMonth())+1)+
                                    "-"+row.fechaHora.getDate()+` `+row.fechaHora.getHours().toString().padStart(2,'0')+":"
                                    +row.fechaHora.getMinutes().toString().padStart(2,'0')+"h"}</Typography>}</TableCell>
            <TableCell align="right">{row.finalizado}</TableCell>
            <TableCell align="right">{admin && (admin)?"Admin":"No admin"}</TableCell>
            <TableCell align="right">
                <Button variant="outlined">
                    <Link style={{textDecoration:"none"}} to={"/grupos/"+row.empresa.nif+"/"+row.codigo+"/noticias"}>VER</Link>
                </Button>
            </TableCell>

            {(admin)?<CellEdit row={row}/>:""}
            {(admin)?<CellDelete row={row} handleDelete={handleDelete}/>:""}
            
            
        </TableRow>
     );
}

const CellEdit = (props) => {
    const row = props.row;

    return ( 
        <TableCell align="right">
            <Button variant="outlined">
                <Link style={{textDecoration:"none"}} to={"/grupos/"+row.empresa.nif+"/"+row.codigo+"/editar"}>EDITAR</Link>
            </Button>
        </TableCell>
     );
}

const CellDelete = (props) => {
    const row = props.row;
    const handleDelete = props.handleDelete;

    return ( 
        <TableCell align="right">
            <Button variant="contained" onClick={()=>{handleDelete(row.empresa.nif,row.codigo)}}>ELIMINAR</Button>
        </TableCell>
     );
}
 
export default RowGrupo;