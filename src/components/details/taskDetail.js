import { Link, useRouteMatch } from "react-router-dom";
import TaskForm from "../forms/taskForm";
import { useParams, Switch, Route } from "react-router-dom";

const TaskDetail = () => {

    const match = useRouteMatch();
    const {id} = useParams();

    return ( <div>
        <Switch>
            <Route exact path={`${match.path}`}>
                <h1>Detalle tarea {id}</h1>
                <ul>
                    <li><Link to={`${match.url}/editar`}>Editar</Link></li>
                    <li><Link>Eliminar</Link></li>
                    <li><Link>Marcar como hecha</Link></li>
                </ul>
            </Route>
            <Route path={`${match.path}/editar`}>
                <TaskForm />
            </Route>
        </Switch>
    </div> );
}
 
export default TaskDetail;