import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import CompanyDetail from "../details/companyDetail";
import GroupDetail from "../details/groupDetail";
import CompanyForm from "../forms/companyForm";

const CompanyList = () => {
    const {id} = useParams();
    const match = useRouteMatch();
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <h1>Empresas</h1>
                <ul>
                    <li><Link to={`${match.url}/1`}>Detalle empresa 1</Link>
                        <Link>Eliminar</Link>               
                    </li>
                    <li><Link to={`${match.url}/2`}>Detalle empresa 2</Link>
                        <Link>Eliminar</Link>                    
                    </li>
                    <li><Link to={`${match.url}/3`}>Detalle empresa 3</Link>
                        <Link>Eliminar</Link>                    
                    </li>
                    <li><Link to={`${match.url}/crear`}>Crear empresa</Link>           
                    </li>
                </ul>
            </Route> 
            <Route exact path={`${match.path}/crear`}>
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