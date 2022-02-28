import { Button, Card, CardActions, CardContent, Container, IconButton, List, ListItem, Stack, TablePagination, Typography } from "@mui/material";
import { BempresaserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import CompanyDetail from "../details/companyDetail";
import CompanyForm from "../forms/companyForm";
import { Box } from "@mui/system";
import DataTable from "../tables/dataTable";
import { useEffect, useState } from "react";
import ControlEmpresa from "../../back/control/controlEmpresa";


const CompanyList = () => {
    
    const usuario = {email:"higo@gmail.com"}

    const match = useRouteMatch();
    const [empresas, setEmpresas] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlEmpresa.getEmpresasByUsuario(usuario)
            .then(data=>{
                setEmpresas(data);
                setIsPending(false)
            })
        }, 1000)

        return abortCont.abort();

    }, [])
    
    
    return ( 
        <div>

            <Switch>
                <Route exact path={match.path}>
                    
                    <h1>Empresas</h1>

                    <Box sx={{width:'100%'}}> 

                        { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                        {empresas && <DataTable rows={empresas} entidad="empresa" handleDelete={()=>{}} match={match}/>}

                    </Box>

                    <Container>
                        <Button variant="contained">
                            <Link to={`${match.url}/crear`}>Nueva empresa</Link>
                        </Button>
                    </Container>
                
                </Route> 
                <Route exact path={`${match.path}/crear`}>
                    <CompanyForm/>
                </Route>
                <Route exact path={`${match.path}/editar/:idempresa`}>
                    <CompanyForm/>
                </Route>
                <Route path={`${match.path}/:idempresa`}>
                    <CompanyDetail/>
                </Route>
            </Switch>
        </div>
     );
}
 
export default CompanyList;