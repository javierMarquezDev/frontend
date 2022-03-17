import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import ControlGrupo from '../../back/control/controlGrupoProyecto';
import GroupDetail from '../details/groupDetail';
import GroupForm from '../forms/groupForm';
import DataTable from '../tables/dataTable';
import NewsList from './newsList';
import {useHistory} from 'react-router-dom';
import ControlSesion from '../../back/control/controlSesion';
import { UserContext } from '../../App';
import AccessDenied from '../home/acessDenied';

import TaskList from './taskList';
import useNotificar from '../home/notificar';
import { Box } from '@mui/system';
import InputTexto from '../form/InputTexto';
import ControlEmpresa from '../../back/control/controlEmpresa';

const GroupList = () => {

    const notificar = useNotificar();

    const history = useHistory();
    const match = useRouteMatch();
    const [grupos, setGrupos] = useState([]);
    const [empresas,setEmpresas] = useState([])
    const [filterEmpresa,setFilterEmpresa] = useState(null)
    const [isPending,setIsPending] = useState(true)
    const [hasChanged,setHasChanged] = useState(false);
    const [filterNombre,setFilterNombre] = useState('');
    
    
    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    const handleDelete = (grupoempresa,grupocodigo)=>{

        ControlGrupo.delete({empresa:{nif:grupoempresa}, codigo:grupocodigo})
        .then(data => {
            notificar({type:"SUCCESS",message:data.message})
        })

    }

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlGrupo.getFromUsuario(usuario.email)
            .then(data=>{

                let gruposSorted = data;

                if(filterEmpresa !== null){
                    gruposSorted = gruposSorted.filter(element => element.empresa.nif == filterEmpresa.nif)
                }

                if(filterNombre !== ''){
                    gruposSorted = gruposSorted.filter(element => element.nombre.toLowerCase().includes(filterNombre.toLowerCase()));
                }
                
                setGrupos(gruposSorted);
                setHasChanged(false);

                ControlEmpresa.getEmpresasByUsuario(usuario)
                .then(data=>{
                    setEmpresas(data);
                    setIsPending(false);
                })
                
            })

            
        }, 1000)

        return abortCont.abort();

    },[usuario,setHasChanged,filterNombre,filterEmpresa])

    return ( 
        <div>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <h1>Grupos</h1>

                    <Button variant="contained"><Link to={`${match.url}/crear`} ><Typography sx={{color:'white'}}> Crear grupo</Typography></Link></Button>


                        <Box sx={{width:'40%'}} display='flex'>

                        
                            {empresas && <Autocomplete
                                        options={empresas}
                                        value={filterEmpresa}
                                        onChange={(e,value)=>setFilterEmpresa(value)}
                                        getOptionLabel={option => option.nombre}
                                        isOptionEqualToValue={(a,b)=> a.nif === b.nif}
                                        sx={{width:'50%',margin:2}}
                                        id="empresa"
                                    
                                        renderInput={(params) => (
                                            <TextField {...params} label="Empresa" variant="standard" />
                                            )}
                                        />
                            }
                        

                            <InputTexto formalName="Búsqueda por nombre" 
                                    id = "nombre"
                                    property={filterNombre} 
                                    setProperty={setFilterNombre} 
                                    errores={null}
                                    sx={{margin:2,width:'50%'}} />
                        </Box> 

                        
                    
                    { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                    {grupos && <DataTable rows={grupos} entidad="grupo" handleDelete={handleDelete} match={match} />}
                    
                </Route>
                <Route exact path={`/grupos/crear`}>
                    <GroupForm setHasChanged={setHasChanged} />
                </Route>
                <Route path={`${match.path}/:grupoempresa/:grupocodigo`}>
                    <GroupDetail />
                </Route>
                
                <Route path = "*">
                    <AccessDenied/>
                </Route>
                
            </Switch>
            
        </div>
    );
}
 
export default GroupList;