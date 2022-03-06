import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GroupList from './components/lists/groupList';
import './components/lists/notificationList';
import CompanyList from './components/lists/companyList';
import LoginForm from './components/forms/loginForm';
import UserDetail from './components/details/userDetail';
import MenuBar from './components/home/navbar';
import UserForm from './components/forms/userForm';
import ControlSesion from './back/control/controlSesion';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const UserContext = React.createContext()
export const NotificationsContext = React.createContext();

function App() {

  const [usuario,setUsuario] = useState(ControlSesion.getSessionUser || null)
  const [token,setToken] = useState(ControlSesion.getSessionToken || null)

  return (
    <UserContext.Provider value={{usuario:usuario, setUsuario:setUsuario,token:token, setToken:setToken}}>
      
        <RouterComponent/>
      
    </UserContext.Provider>
  )
};

const RouterComponent = () => {

  const value = React.useContext(UserContext);
  const usuario = value.usuario;

  return ( 
    <Router>

    <div className="App">
      <div className="bar">
        <MenuBar/>
      </div>
      <div className="content" style={{marginTop:63, padding:20}}>

        <Switch>
          <Route exact path="/">
              {(usuario)
              ?<Box display="flex" sx={{height:'100%', alignItems:'center',marginTop:5}}>  
                <Card sx={{margin:2, width:'45%'}}>
                  <CardContent>
                    <Typography variant="h4">Mis grupos</Typography>
                    <Typography>Grupos a los que pertenezco</Typography>
                  </CardContent>
                  <CardActions>
                    <Link to='/grupos'><Button>Ver</Button></Link>
                  </CardActions>
                </Card>

                <Card sx={{margin:2, width:'45%'}}>
                  <CardContent>
                    <Typography variant="h4">Empresas</Typography>
                    <Typography>Empresas de las que soy miembro</Typography>
                  </CardContent>
                  <CardActions>
                    <Link to='/empresas'><Button>Ver</Button></Link>
                  </CardActions>
                </Card>

              </Box>
              :<Box>
                <Link to="/login"> <Typography sx={{color:'text.primary'}} align="center" variant="h3">Inicia sesión para comenzar</Typography> </Link>
              </Box>
              }
          </Route>
          <Route path="/grupos">
              {(usuario)
              ?<GroupList />
              :<LoginForm/>}
          </Route>
          <Route path="/empresas">
          {(usuario)
              ?<CompanyList />
              :<LoginForm/>}
          </Route>
          <Route path="/login">
              <LoginForm/>
          </Route>
          <Route path="/signup">
              <UserForm/>
          </Route>
          {/*<Route path="/ntfs">
              <NotificationList />
          </Route>*/}
          <Route path="/:idusuario/perfil">
              <UserDetail />
          </Route>
        </Switch>


      </div>
    </div>

    </Router>

   );
}

export default App;
