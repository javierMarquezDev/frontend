import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import GroupDetail from "../details/groupDetail";
import NewsDetail from '../details/newsDetail';

const NewsList = () => {
    const {id} = useParams();
    const match = useRouteMatch();
    
    return ( 
        <div>
            <Switch>
            <Route exact path={match.path}>
                <h1>Noticias grupo {id}</h1>
                <nav><h2><Link to={`/grupos/${id}/detalle`}>Detalle grupo</Link></h2></nav>
                <ul>
                    <li><Link to={`${match.url}/1`}>Detalle noticia 1</Link>
                        <Link>Eliminar</Link>                    
                    </li>
                    <li><Link to={`${match.url}/2`}>Detalle noticia 2</Link>
                        <Link>Eliminar</Link>                    
                    </li>
                    <li><Link to={`${match.url}/3`}>Detalle noticia 3</Link>
                        <Link>Eliminar</Link>                    
                    </li>
                </ul>
            </Route> 
            <Route path={`${match.url}/:idnoticia`}>
                <NewsDetail/>
            </Route>
        </Switch>
        </div>
     );
}
 
export default NewsList;