import { useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GroupDetail from '../details/groupDetail';
import GroupForm from '../forms/groupForm';
import DataTable from '../tables/dataTable';
import NewsList from './newsList';

const GroupList = () => {

    const match = useRouteMatch();

    const rows = [
        {codigo:1,empresa:"E765849",nombre:"RRHH",descripcion:"Proyecto recursos humanos", administrador:"higo@gmail.com", fechaHora:"2022-03-02", finalizado:false, admin: false},
        {codigo:1,empresa:"E765849",nombre:"RRHH",descripcion:"Proyecto recursos humanos", administrador:"higo@gmail.com", fechaHora:"2022-03-02", finalizado:false, admin: false},
        {codigo:1,empresa:"E765849",nombre:"RRHH",descripcion:"Proyecto recursos humanos", administrador:"higo@gmail.com", fechaHora:"2022-03-02", finalizado:false, admin: true},
        {codigo:1,empresa:"E765849",nombre:"RRHH",descripcion:"Proyecto recursos humanos", administrador:"higo@gmail.com", fechaHora:"2022-03-02", finalizado:false, admin: false},
        {codigo:1,empresa:"E765849",nombre:"RRHH",descripcion:"Proyecto recursos humanos", administrador:"higo@gmail.com", fechaHora:"2022-03-02", finalizado:false, admin: false},
        {codigo:1,empresa:"E765849",nombre:"RRHH",descripcion:"Proyecto recursos humanos", administrador:"higo@gmail.com", fechaHora:"2022-03-02", finalizado:false, admin: true},
        {codigo:1,empresa:"E765849",nombre:"RRHH",descripcion:"Proyecto recursos humanos", administrador:"higo@gmail.com", fechaHora:"2022-03-02", finalizado:false, admin: false}
    ];

    return ( 
        <div>
            <Switch>
                <Route exact path={match.path}>
                    <h1>Grupos</h1>
                    
                    <DataTable rows={rows} entidad="grupo" handleDelete={()=>{}} />
                    
                </Route>
                <Route path={`${match.path}/:empresa/:codigo/noticias`}> 
                    <NewsList />
                </Route>
                <Route path={`${match.path}/:empresa/:codigo/detalle`}>
                    <GroupDetail />
                </Route>
                <Route excact path={`${match.path}/crear`}>
                    <GroupForm />
                </Route>
                <Route excact path={`${match.path}/:empresa/:codigo/editar`}>
                    <GroupForm />
                </Route>
            </Switch>
            
        </div>
    );
}
 
export default GroupList;