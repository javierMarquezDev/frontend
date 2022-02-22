import { Button, Card, CardActions, CardContent, Container, IconButton, List, ListItem, Stack, TablePagination, Typography } from "@mui/material";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import CompanyDetail from "../details/companyDetail";
import CompanyForm from "../forms/companyForm";
import { Box } from "@mui/system";
import DataTable from "../tables/dataTable";

function createData(cif, nombre, direccion, razonsocial, admin) {
    return { cif, nombre, direccion, razonsocial, admin };
}

const CompanyList = () => {
    const {id} = useParams();
    const match = useRouteMatch();

    const rows = [
        createData('E765849', "Aceites Benatae", "C/ Hernani 51", "Benatae SA", true),
        createData('E765849', "Aceites Benatae", "C/ Hernani 51", "Benatae SA", true),
        createData('E765849', "Aceites Benatae", "C/ Hernani 51", "Benatae SA", true),
        createData('E765849', "Aceites Benatae", "C/ Hernani 51", "Benatae SA", false),
        createData('E765849', "Aceites Benatae", "C/ Hernani 51", "Benatae SA", false),
        createData('E765849', "Aceites Benatae", "C/ Hernani 51", "Benatae SA", false),
        createData('E765849', "Aceites Benatae", "C/ Hernani 51", "Benatae SA", false),
    ];
    
    return ( 
        <div>

            <Switch>
                <Route exact path={match.path}>
                    
                    <h1>Empresas</h1>

                    <Box sx={{width:'100%'}}> 

                        <DataTable rows={rows} entidad="empresa" handleDelete={()=>{}} />

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