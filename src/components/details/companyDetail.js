import { Link, useRouteMatch } from "react-router-dom";
import CompanyForm from "../forms/companyForm";
import { useParams, Switch, Route } from "react-router-dom";
import CompanyUserList from '../lists/companyUserList';

const CompanyDetail = () => {

    const match = useRouteMatch();
    const {id} = useParams();

    return ( <div>
        <Switch>
            <Route exact path={`${match.path}`}>
                <h1>Detalle empresa {id}</h1>
                <ul>
                    <li><Link to={`${match.url}/editar`}>Editar</Link></li>
                    <li><Link to={`${match.url}/usuarios`}>Miembros</Link></li>
                    <li><Link>Eliminar</Link></li>
                </ul>
            </Route>
            <Route path={`${match.path}/editar`}>
                <CompanyForm />
            </Route>
            <Route path={`${match.path}/usuarios`}>
                <CompanyUserList/>
            </Route>
        </Switch>
    </div> );
}
 
export default CompanyDetail;