import { useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GroupDetail from '../details/groupDetail';
import GroupForm from '../forms/groupForm';
import NewsList from './newsList';

const GroupList = () => {

    const match = useRouteMatch();

    return ( 
        <div>
            <Switch>
                <Route exact path={match.path}>
                    <h1>Grupos</h1>
                    <ul>
                        <li>
                            <Link to={`${match.url}/1/noticias`}>Grupo 1</Link>
                            <Link>Eliminar</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/2/noticias`}>Grupo 2</Link>
                            <Link>Eliminar</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/2/noticias`}>Grupo 3</Link>
                            <Link>Eliminar</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/crear`}>Grupo nuevo</Link>
                        </li>
                    </ul>
                    
                </Route>
                <Route path={`${match.path}/:id/noticias`}> 
                    <NewsList />
                </Route>
                <Route path={`${match.path}/:id/detalle`}>
                    <GroupDetail />
                </Route>
                <Route excact path={`${match.path}/crear`}>
                    <GroupForm />
                </Route>
            </Switch>
            
        </div>
    );
}
 
export default GroupList;