import { AppBar, Badge, Button, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";

const MenuBar = () => {
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
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </MenuItem>
      </Toolbar>
    </AppBar>
   );

}
 
export default MenuBar;