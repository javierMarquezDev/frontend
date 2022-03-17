import { Button, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import ControlEmpresa from "../../back/control/controlEmpresa";

const RowEmpresa = (props) => {

    const row = props.row;
    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;
    const handleDelete = props.handleDelete;

    const [admin,setAdmin] = useState(false);

    useEffect(()=>{
        ControlEmpresa.isAdmin(row,usuario).then((res)=>{
            if(res)setAdmin(true)
        })
    });

    return ( 
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.nif}
            id={row.nif}
        >
            
            
            <TableCell
            component="th"
            scope="row"
            sx={{fontWeight:'bold',marginLeft:2}}
            >
            {row.nif}
            </TableCell>
            <TableCell align="right">{row.nombre}</TableCell>
            <TableCell align="right">{row.razonSocial}</TableCell>
            <TableCell align="right">{row.nombreVia}&nbsp;{row.numVia}&nbsp;{row.codigoPuerta}</TableCell>
            <TableCell align="right">{(admin)?"Admin":"No admin"}</TableCell>
            <TableCell align="right">
                <Button variant="outlined">
                    <Link style={{textDecoration:"none"}} to={"/empresas/"+row.nif}>VER</Link>
                </Button>
            </TableCell>

            {(admin)?<CellEdit row={row}/>:""}
            {(admin)?<CellDelete row={row} handleDelete={handleDelete} />:""}
            
            
        </TableRow>
     );
}

const CellEdit = (props) => {
    const row = props.row;

    return ( 
        <TableCell align="right">
            <Button variant="outlined">
                <Link style={{textDecoration:"none"}} to={"/empresas/"+row.nif+"/editar"}>EDITAR</Link>
            </Button>
        </TableCell>
     );
}

const CellDelete = (props) => {
    const row = props.row;
    const handleDelete = props.handleDelete;

    return ( 
        <TableCell align="right">
            <Button variant="contained" onClick={()=>{handleDelete(row.nif)}} >ELIMINAR</Button>
        </TableCell>
     );
}
 
export default RowEmpresa;