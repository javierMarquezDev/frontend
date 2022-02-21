import NewsForm from "../forms/newsForm";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
    const {id} = useParams();
    const match = useRouteMatch();
    return ( 
        <div>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <h1>Detalle noticia {id}</h1>
                    <ul>
                        <li><Link to={`${match.url}/editar`}>Editar</Link></li>
                        <li><Link to={`${match.url}/eliminar`}>Eliminar</Link></li>
                    </ul>
                </Route>
                <Route path={`${match.path}/editar`}>
                    <NewsForm/>
                </Route>
                <Route path={`${match.path}/eliminar`}>
                    Eliminar
                </Route>
            </Switch>
        </div>
        );
}
 
export default NewsDetail;