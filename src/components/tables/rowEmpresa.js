import { Button, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const RowEmpresa = (props) => {

    const row = props.row;
    const labelId = props.labelId;
    const handleDelete = props.handleDelete;

    return ( 
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.cif}
            id={row.cif}
        >
            
            
            <TableCell
            component="th"
            id={labelId}
            scope="row"
            
            >
            {row.cif}
            </TableCell>
            <TableCell align="right">{row.nombre}</TableCell>
            <TableCell align="right">{row.direccion}</TableCell>
            <TableCell align="right">{row.razonsocial}</TableCell>
            <TableCell align="right">{(row.admin)?"Admin":"No admin"}</TableCell>
            <TableCell align="right">
                <Button variant="outlined">
                    <Link style={{textDecoration:"none"}} to={"/empresas/"+row.cif}>VER</Link>
                </Button>
            </TableCell>

            {(row.admin)?<CellEdit row={row}/>:""}
            {(row.admin)?<CellDelete row={row} handleDelete={handleDelete} />:""}
            
            
        </TableRow>
     );
}

const CellEdit = (props) => {
    const row = props.row;

    return ( 
        <TableCell align="right">
            <Button variant="outlined">
                <Link style={{textDecoration:"none"}} to={"/empresas/"+row.cif+"/editar"}>EDITAR</Link>
            </Button>
        </TableCell>
     );
}

const CellDelete = (props) => {
    const row = props.row;
    const handleDelete = props.handleDelete;

    return ( 
        <TableCell align="right">
            <Button variant="contained" onClick={()=>{handleDelete(row.cif)}} >ELIMINAR</Button>
        </TableCell>
     );
}
 
export default RowEmpresa;