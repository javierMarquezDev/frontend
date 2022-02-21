import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserDetail from "../details/userDetail";

const UserList = () => {
    const {id} = useParams();
    const match = useRouteMatch();
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <h1>Usuarios grupo/empresa {id}</h1>
                <ul>
                    <li><Link to={`${match.url}/1`}>Detalle usuario 1</Link>
                        <Link>Eliminar</Link>                    
                    </li>
                    <li><Link to={`${match.url}/2`}>Detalle usuario 2</Link>
                        <Link>Eliminar</Link>                    
                    </li>
                    <li><Link to={`${match.url}/3`}>Detalle usuario 3</Link>
                        <Link>Eliminar</Link>                    
                    </li>
                </ul>
            </Route> 
            <Route path={`${match.url}/:idusuario`}>
                <UserDetail/>
            </Route>
        </Switch>
        </div>
     );
}
 
export default UserList;