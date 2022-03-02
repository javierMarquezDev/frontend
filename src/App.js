import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GroupList from './components/lists/groupList';
import './components/lists/notificationList';
import NotificationList from './components/lists/notificationList';
import CompanyList from './components/lists/companyList';
import LoginForm from './components/forms/loginForm';
import UserDetail from './components/details/userDetail';
import PrimarySearchAppBar from './components/home/navbar';
import MenuBar from './components/home/navbar';
import UserForm from './components/forms/userForm';
import { Button } from '@mui/material';
import ControlEmpresa from './back/control/controlEmpresa';

function App() {

  const usuario = {email:"higo@gmail.com"}
  return (
    <Router>

      <div className="App">
        <div className="bar">
          <MenuBar/>
        </div>
        <div className="content" style={{marginTop:63, padding:20}}>
          <Switch>
            <Route exact path="/">
                <h1>Inicio</h1>

                <ul>
                  <li>
                    <Link to='/grupos'>Grupos</Link>
                  </li>
                  <li>
                    <Link to='/empresas'>Empresas</Link>
                  </li>
                  <li>
                    <Link to='/ntfs'>Notificaciones</Link>
                  </li>
                  <li>
                    <Link to={`${usuario.email}/perfil`}>Perfil</Link>
                  </li>
                </ul>
            </Route>
            <Route path="/grupos">
                <GroupList />
            </Route>
            <Route path="/empresas">
                <CompanyList/>
            </Route>
            <Route path="/login">
                <LoginForm/>
            </Route>
            <Route path="/logout">
                Logout
            </Route>
            <Route path="/signup">
                <UserForm/>
            </Route>
            <Route path="/ntfs">
                <NotificationList />
            </Route>
            <Route path="/:idusuario/perfil">
                <UserDetail />
            </Route>
          </Switch>


        </div>
      </div>

    </Router>
    )};

export default App;
