import { Button, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const RowUsuario = (props) => {

    const row = props.row;
    const labelId = props.labelId;
    const handleDelete = props.handleDelete;

    return ( 
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.email}
            id={row.email}
        >
            
            
            <TableCell
            component="th"
            id={labelId}
            scope="row"
            >
            {row.email}
            </TableCell>
            <TableCell align="right">{row.nombre}</TableCell>
            <TableCell align="right">{row.apellido1}</TableCell>
            {(apellido2)?<TableCell align="right">{row.apellido2}</TableCell>:""}
            <TableCell align="right">{row.tipovia}{row.nombrevia}&nbsp;{row.numvia}&nbsp;{row.codigoPuerta}</TableCell>
            <TableCell align="right">{row.fechaHora}</TableCell>
            <TableCell align="right">{row.finalizado}</TableCell>
            <TableCell align="right">{(row.admin)?"Admin":"No admin"}</TableCell>
            <TableCell align="right" >
                <Button variant="outlined">
                    <Link style={{textDecoration:"none"}} to={"/empresas/"+row.email}>VER</Link>
                </Button>
            </TableCell>

            {(row.admin)?<CellEdit row={row}/>:""}
            {(row.admin)?<CellDelete row={row} handleDelete={handleDelete}/>:""}
            
            
        </TableRow>
     );
}

const CellEdit = (props) => {
    const row = props.row;

    return ( 
        <TableCell align="right">
            <Button variant="outlined">
                <Link style={{textDecoration:"none"}} to={"/empresas/"+row.email+"/editar"}>EDITAR</Link>
            </Button>
        </TableCell>
     );
}

const CellDelete = (props) => {
    const row = props.row;
    const handleDelete = props.handleDelete;

    return ( 
        <TableCell align="right">
            <Button variant="contained" onClick={()=>{handleDelete(row.email)}}>ELIMINAR</Button>
        </TableCell>
     );
}
 
export default RowUsuario;