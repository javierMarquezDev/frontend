import handleLogout from './controller/Logout.controller';
import NoticiaSet from './components/NoticiaSet.component';
import './App.css';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import {Link} from "react-router-dom";
import HandleLogout from './controller/Logout.controller';
import {Button} from '@mui/material';

function App() {

  return(
     <div>
       

        <div className="App">
          <Grid container spacing={2} sx={{ml:0.1}}>

            <Grid item xs={12}>

              <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                  <Toolbar variant="dense" id="toolbar" >
                    
                    
                      <Typography display={{xs:'flex'}} sx={{mr:2,mt:0.5}} variant="h6" color="inherit" component="div">
                        <Link to="/" style={{textDecoration:"none", color:"white"}}>
                          Pyramid
                        </Link>
                      </Typography>
                    
                  
                    <Box sx={{ flexGrow: 1 }} />  

                    <Box sx={{p:"0",m:"0"}} id="profile">
                      <Typography spacing={0.2} alignItems="flex-end" sx={{fontSize:12}}>
                        <Link to="/login">
                          Login
                        </Link>
                      </Typography>
                    </Box>
                    
                      
                  </Toolbar>
                </AppBar>
              </Box>

            </Grid>

            <Grid item xs={8} id="posts" sx={{mt:"50px"}}>
          
            </Grid>
  
            <Grid item xs={4} id="taskContainer">
            
            </Grid>

          </Grid>
        </div>

      </div>
      
  );

}


class LogoutButton extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <Link to="/login" onClick={HandleLogout}>
        Logout
      </Link>
    );
  }
}

export default App;
