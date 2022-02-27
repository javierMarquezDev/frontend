import { Button, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const RowGrupo = (props) => {

    const row = props.row;
    const labelId = props.labelId;
    const handleDelete = props.handleDelete;

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
            id={labelId}
            scope="row"
            
            >
            {row.cif}
            </TableCell>
            <TableCell align="right">{row.nombre}</TableCell>
            <TableCell align="right">{row.descripcion}</TableCell>
            <TableCell align="right">{row.empresa.nif}</TableCell>
            <TableCell align="right">{row.administrador}</TableCell>
            <TableCell align="right">{row.fechaHora}</TableCell>
            <TableCell align="right">{row.finalizado}</TableCell>
            <TableCell align="right">{(row.admin)?"Admin":"No admin"}</TableCell>
            <TableCell align="right">
                <Button variant="outlined">
                    <Link style={{textDecoration:"none"}} to={"/grupos/"+row.empresa.nif+"/"+row.codigo+"/noticias"}>VER</Link>
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
            <Button variant="contained" onClick={()=>{handleDelete(row.empresa,row.codigo)}}>ELIMINAR</Button>
        </TableCell>
     );
}
 
export default RowGrupo;