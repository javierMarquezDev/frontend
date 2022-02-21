import { Link, useRouteMatch } from "react-router-dom";
import CompanyForm from "../forms/companyForm";
import { useParams, Switch, Route } from "react-router-dom";
import UserList from '../lists/userList';

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
                <UserList/>
            </Route>
        </Switch>
    </div> );
}
 
export default CompanyDetail;