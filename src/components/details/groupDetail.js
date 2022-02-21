import { Link, useRouteMatch } from "react-router-dom";
import { useParams, Switch, Route } from "react-router-dom";
import GroupForm from "../forms/groupForm";
import TaskList from "../lists/taskList";
import UserList from "../lists/userList";

const GroupDetail = () => {
    const {id} = useParams();
    const match = useRouteMatch();
    return ( 
        <div>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <h1>Detalle grupo {id}</h1>
                    <ul>
                        <li><Link to={`${match.url}/editar`}>Editar</Link></li>
                        <li><Link to={`${match.url}/eliminar`}>Eliminar</Link></li>
                        <li><Link to={`${match.url}/tareas`}>Tareas</Link></li>
                        <li><Link to={`${match.url}/usuarios`}>Miembros</Link></li>
                    </ul>
                </Route>
                <Route path={`${match.path}/editar`}>
                    <GroupForm />
                </Route>
                <Route path={`${match.path}/eliminar`}>
                    Eliminar
                </Route>
                <Route path={`${match.path}/tareas`}>
                    <TaskList/>
                </Route>
                <Route path={`${match.path}/usuarios`}>
                    <UserList/>
                </Route>
            </Switch>
        </div>
     );
}
 
export default GroupDetail;