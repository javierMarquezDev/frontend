import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import ControlGrupo from '../../back/control/controlGrupoProyecto';
import GroupDetail from '../details/groupDetail';
import GroupForm from '../forms/groupForm';
import DataTable from '../tables/dataTable';
import NewsList from './newsList';

const GroupList = () => {

    const match = useRouteMatch();
    const [grupos, setGrupos] = useState(null);
    const [isPending,setIsPending] = useState(true)
    const usuario = {email:"higo@gmail.com"}

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlGrupo.getFromUsuario(usuario.email)
            .then(data=>{
                
                setGrupos(data);
                setIsPending(false);
                
            })
        }, 1000)

        return abortCont.abort();

    },[usuario])

    return ( 
        <div>
            <Switch>
                <Route exact path={match.path}>
                    <h1>Grupos</h1>

                    <Button variant="contained"><Link to={`${match.url}/crear`}>Crear grupo</Link></Button>
                    
                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                    {grupos && <DataTable rows={grupos} entidad="grupo" handleDelete={()=>{}} match={match} />}
                    
                </Route>
                <Route path={`${match.path}/:grupoempresa/:grupocodigo/noticias`}> 
                    <NewsList />
                </Route>
                <Route path={`${match.path}/:grupoempresa/:grupocodigo/detalle`}>
                    <GroupDetail/>
                </Route>
                <Route excact path={`${match.path}/crear`}>
                    <GroupForm />
                </Route>
                <Route excact path={`${match.path}/:grupoempresa/:grupocodigo/editar`}>
                    <GroupForm />
                </Route>
            </Switch>
            
        </div>
    );
}
 
export default GroupList;