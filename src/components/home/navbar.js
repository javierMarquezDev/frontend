import { AppBar, Badge, Button, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

const MenuBar = () => {

  let loggedIn = true;

  const usuario = {email:"higo@gmail.com"}

  return ( 
    <AppBar position="fixed">
      <Toolbar>

        <MenuItem sx={{flexGrow:1}}>
          <Link to="/" style={{textDecoration:"none", color:"white"}}>

          <Typography variant="h5">
            Pyramid
          </Typography>

          </Link>
          
        </MenuItem>

        {/*LOGIN / LOGOUT / SIGNUP*/}
        <MenuItem>
          
          <Link to='/login'>
            <Button variant="contained">Iniciar sesión</Button>
          </Link>
      
        </MenuItem>

        <MenuItem>

          <Link to='/logout'>
            <Button variant="contained">Cerrar sesión</Button>
          </Link>

        </MenuItem>

        <MenuItem>
          <Link to='/signup'>
            <Button variant="contained">Registrarse</Button>
          </Link>
        </MenuItem>

        {/*NOTIFICACIONES*/}
        {(loggedIn)?<MenuLogged usuario={usuario}/>:null}
        
      </Toolbar>
    </AppBar>
   );

}

const MenuLogged = (props)=>{

  const ntfs = 13;
  const usuario = props.usuario;

  return(

    <MenuItem>
      <MenuItem>
          <Link to="/ntfs" style={{color:"white"}}>

            <IconButton
              size="large"
              color="inherit"
            >
              <Badge badgeContent={ntfs} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
          </Link>
          
        </MenuItem>

        <MenuItem>
          <Link to={`/${usuario.email}/perfil`} style={{color:"white"}}>

            <IconButton
              size="large"
              color="inherit"
            >
              <PersonIcon/>
            </IconButton>
            
          </Link>
          
        </MenuItem>
    </MenuItem>

  )
}
 
export default MenuBar;