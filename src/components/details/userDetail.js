import { Link, useRouteMatch } from "react-router-dom";
import UserForm from "../forms/userForm";
import { useParams, Switch, Route } from "react-router-dom";

const UserDetail = () => {

    const match = useRouteMatch();
    const {id} = useParams();

    return ( <div>
        <Switch>
            <Route exact path={`${match.path}`}>
                <h1>Detalle usuario {id}</h1>
                <ul>
                    <li><Link to={`${match.url}/editar`}>Editar</Link></li>
                    <li><Link>Eliminar</Link></li>
                </ul>
            </Route>
            <Route path={`${match.path}/editar`}>
                <UserForm />
            </Route>
        </Switch>
    </div> );
}
 
export default UserDetail;