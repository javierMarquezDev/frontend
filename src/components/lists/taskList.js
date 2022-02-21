
import { useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GroupDetail from '../details/groupDetail';
import TaskDetail from '../details/taskDetail';
import NewsList from './newsList';
import TaskForm from '../forms/taskForm';

const TaskList = () => {

    const match = useRouteMatch();

    return ( 
        <div>
            <Switch>
                <Route exact path={match.path}>
                    <h1>Tareas</h1>
                    <ul>
                        <li>
                            <Link to={`${match.url}/1`}>Tarea 1</Link>
                            <Link>Eliminar</Link>
                            <Link>Marcar como hecha</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/2`}>Tarea 2</Link>
                            <Link>Eliminar</Link>
                            <Link>Marcar como hecha</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/3`}>Tarea 3</Link>
                            <Link>Eliminar</Link>
                            <Link>Marcar como hecha</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/crear`}>Tarea nueva</Link>
                        </li>
                    </ul>
                    
                </Route>
                <Route exact path={`${match.path}/crear`}>
                    <TaskForm/>
                </Route>
                <Route path={`${match.path}/:id`}>
                    <TaskDetail />
                </Route>
                
            </Switch>
            
        </div>
    );
}
 
export default TaskList;