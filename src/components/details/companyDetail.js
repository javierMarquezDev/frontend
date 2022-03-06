import { Link, useRouteMatch } from "react-router-dom";
import CompanyForm from "../forms/companyForm";
import { useParams, Switch, Route } from "react-router-dom";
import CompanyUserList from '../lists/companyUserList';
import UserForm from "../forms/userForm";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { List, ListItem } from "@mui/material";
import Empresa from "../../back/model/Empresa";
import ControlEmpresa from "../../back/control/controlEmpresa";
import React, { useEffect, useState } from "react";
import { useButton } from "@mui/base";
import ControlSesion from "../../back/control/controlSesion";
import { UserContext } from "../../App";
import AccessDenied from "../home/acessDenied";

const handleDelete = (usuario)=>{}

const CompanyDetail = () => {

    const value = React.useContext(UserContext);
    const usuario = value.usuario;
    const token = value.token;

    const {idempresa} = useParams();
    const [empresa, setEmpresa] = useState(null);
    const match = useRouteMatch();
    const [isPending, setIsPending] = useState(true);
    const [usuarios, setUsuarios] = useState(null);
    const [member,setMember] = useState(false);

    useEffect(()=>{

        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlEmpresa.isMember({nif:idempresa},usuario)
            .then(data => {
                setMember(data);
                if(data){
                    ControlEmpresa.getById(idempresa)
                    .then(data=>{
                    
                        setEmpresa(data);

                        ControlEmpresa.getUsuariosByEmpresa(data)
                        .then(data => {
                            setUsuarios(data);
                        })

                        ControlEmpresa.isAdmin({nif:idempresa},usuario).then((res)=>{
                            (res)?data.admin = true:data.admin = false;
                            setEmpresa(data);
                            setIsPending(false)
                        })


                    })
                }
            })
            
        }, 1000)

        return abortCont.abort();

    }, [idempresa])

    return ( <div>
        {(member)
        ?<Switch>
            <Route exact path={`${match.path}`}>
                { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
                { empresa && <CompanyInfo empresa={empresa} usuarios={usuarios} isPending={isPending} match={match}/>}
            </Route>
            <Route path={`${match.path}/editar`}>
                {empresa && (empresa.admin)
                ?<CompanyForm />
                :<AccessDenied/>}
            </Route>
            <Route path={`${match.path}/usuarios`}>
                <CompanyUserList empresa={empresa} />
            </Route>
        </Switch>
        :<AccessDenied/>}
    </div> );
}

const ListaUsuarios = (props)=>{

    const usuarios = props.usuarios;
    const match = props.match;

    return(

        <Box id="usuarios" margin={1} padding={1}>
            <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Miembros</Typography>
            <Link to={`${match.url}/usuarios`} align="left"><Typography sx={{color:"text.primary", textDecoration:"none"}}>Ver miembros</Typography> </Link>
            <List spacing={2} sx={{height:300, overflowY:"scroll"}}>
                {usuarios.map(usuario=>{
                    return(
                        <ListItem id={usuario.email} sx={{padding:1, overflow:"hidden"}}>
                            
                            <Typography id="nombre"  align="left">{usuario.nombre}</Typography>&nbsp;
                            <Typography id="apellido1" align="left">{usuario.apellido1}</Typography>&nbsp;
                            <Typography id="apellido2" align="left">{usuario.apellido2}</Typography>
                            
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    );

}

const BotonesEditable = (props)=>{

    const empresa = props.empresa;
    const match = props.match;

    return(
        <Box display="contained">
            <Button variant="outlined">
                <Link to={`${match.url}/editar`} sx={{margin:1}} sx={{textDecoration:"none",color:"text.primary"}}>
                Editar</Link></Button>
            <Button onClick={()=>{handleDelete(empresa)}} variant="contained" sx={{margin:1}}>Eliminar</Button>
        </Box>
    )
}

const CompanyInfo = (props) =>{

    const empresa = props.empresa;
    const usuarios = props.usuarios;
    const isPending = props.isPending;
    const match = props.match

    return(

        <Box>
            <Typography variant="h4" marginTop={4} marginBottom={2} align="left">Información de {empresa.nombre}</Typography>

            {(empresa.admin?<BotonesEditable match={match} handleDelete={handleDelete} empresa={empresa}/>:null)}

            <Grid container spacing={2} marginTop={2}>

                <Grid item xs={4} sx={{padding:1}}>
                    <Box id="nombre" margin={1} padding={1}>
                        <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Nombre</Typography>
                        <Box display="flex">
                            <Typography id="nombre"  align="left">{empresa.nombre}</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={4} sx={{padding:1}}>
                    <Box id="razonsocial" margin={1} padding={1}>
                        <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Razón social</Typography>
                        <Box display="flex">
                            <Typography id="nombre"  align="left">{empresa.razonSocial}</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={4} sx={{padding:1}}>
                    <Box id="nif" margin={1} padding={1}>
                        <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">CIF</Typography>
                        <Box display="flex">
                            <Typography id="nombre"  align="left">{empresa.nif}</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={8} sx={{padding:1}}>
                    <Box id="direccion" margin={1} padding={1}>
                        <Typography sx={{fontSize:12, color:"text.secondary"}} align="left">Dirección postal</Typography>
                        <Box display="flex" sx={{flexDirection:"row"}} align="left">
                            <Typography id="tipovia" align="left">{empresa.tipoVia}</Typography>&nbsp;
                            <Typography id="nombrevia" align="left">{empresa.nombreVia}</Typography>&nbsp;
                            <Typography id="numvia" align="left">{empresa.numVia}</Typography>&nbsp;
                            <Typography id="codigopuerta" align="left">{empresa.codigoPuerta}</Typography>&nbsp;
                            <Typography id="codigopuerta" align="left">{`${empresa.localidad}, ${empresa.provincia}`}</Typography>&nbsp;
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={4}></Grid>                    

                <Grid item xs={4}>
                    {usuarios && <ListaUsuarios usuarios={usuarios} match={match} empresa={empresa}/>}
                </Grid>

            </Grid>
        </Box>

    );
}
 
export default CompanyDetail;