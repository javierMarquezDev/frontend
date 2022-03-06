import { AppBar, Badge, Button, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import ControlSesion from "../../back/control/controlSesion";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../App";

const MenuBar = () => {

  const value = React.useContext(UserContext);

  const history = useHistory();

  const logout = ()=>{
    ControlSesion.destroySesion();
    value.setToken(null)
    value.setUsuario(null)
    history.push('/login')
  }

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
        {(!value.usuario)
        ?<MenuItem>
          
          <Link to='/login'>
            <Button variant="contained">Iniciar sesión</Button>
          </Link>
      
        </MenuItem>
        :""}

        {(value.usuario)
        ?<MenuItem>

          <Button variant="contained" onClick={()=>logout()}>Cerrar sesión</Button>

        </MenuItem>
        :""}

        {(!value.usuario)
        ?<MenuItem>
          <Link to='/signup'>
            <Button variant="contained">Registrarse</Button>
          </Link>
        </MenuItem>
        :""}

        {/*NOTIFICACIONES*/}

        
        {value.usuario && <MenuLogged usuario={value.usuario}/>}
        
      </Toolbar>
    </AppBar>
   );

}

const MenuLogged = (props)=>{

  const ntfs = 13;
  const usuario = props.usuario;

  return(

    <MenuItem>
      {/*<MenuItem>
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
          
      </MenuItem>*/}

        <MenuItem >
          <Link to={`/${usuario.email}/perfil`} style={{color:"white"}} >
            <Box display="flex" alignItems="center">

              <IconButton
                size="large"
                color="inherit"
              >
                <PersonIcon/>
              </IconButton>
              <Typography color='white'>{usuario.nombre}&nbsp;{usuario.apellido1}&nbsp;{usuario.apellido2 || ''}</Typography>

            </Box>
            
          </Link>
          
        </MenuItem>
    </MenuItem>

  )
}


 
export default MenuBar;