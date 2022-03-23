import { Button, Card, CardActions, CardContent, Container, IconButton, List, ListItem, Stack, TablePagination, Typography } from "@mui/material";
import { BempresaserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import CompanyDetail from "../details/companyDetail";
import CompanyForm from "../forms/companyForm";
import { Box } from "@mui/system";
import DataTable from "../tables/dataTable";
import React, { useEffect, useState } from "react";
import ControlEmpresa from "../../back/control/controlEmpresa";
import { UserContext } from "../../App";
import useNotificar from "../home/notificar";
import AccessDenied from "../home/acessDenied";
import InputTexto from "../form/InputTexto";


const CompanyList = () => {

    const notificar = useNotificar()
    
    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    const match = useRouteMatch();
    const [empresas, setEmpresas] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [hasChanged,setHasChanged] = useState(false);
    const [filterNombre,setFilterNombre] = useState('');

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlEmpresa.getEmpresasByUsuario(usuario)
            .then(data=>{

                let empresasSorted = data;

                if(filterNombre !== '')
                {
                    console.log(data)
                    empresasSorted = data.filter(element => element.nombre.toLowerCase().includes(filterNombre.toLowerCase()));
                }
                    

                setEmpresas(empresasSorted);
                setHasChanged(false);
                setIsPending(false)
            })
        }, 1000)

        return abortCont.abort();

    }, [usuario,hasChanged,filterNombre])

    const handleDelete = (idempresa) => {

        ControlEmpresa.delete(idempresa)
        .then(data => {
            notificar({type:"SUCCESS",message:data.message})
            setHasChanged(true)
        })

    }
    
    
    return ( 
        <div>

            <Switch>
                <Route exact path={match.path}>
                    
                    <Box sx={{width:'100%'}}> 

                    <h1>Empresas</h1>

                        <Button variant="contained">
                            <Link to={`${match.url}/crear`}>Nueva empresa</Link>
                        </Button>               

                        <Box>
                            <InputTexto formalName="Búsqueda por nombre" 
                                    id = "nombre"
                                    property={filterNombre} 
                                    setProperty={setFilterNombre} 
                                    errores={null}
                                    sx={{margin:2}} />
                        </Box> 

                        { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                        {empresas && <DataTable rows={empresas} entidad="empresa" handleDelete={handleDelete} match={match}/>}

                    </Box>
                
                </Route> 
                <Route path={`${match.path}/crear`}>
                    <CompanyForm setHasChanged={setHasChanged} />
                </Route>
                <Route path={`${match.path}/:idempresa`}>
                    <CompanyDetail setHasChanged={setHasChanged} />
                </Route>
                <Route>
                    <AccessDenied/>
                </Route>
                
            </Switch>
        </div>
     );
}
 
export default CompanyList;