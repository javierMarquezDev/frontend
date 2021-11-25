import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Table } from '@mui/material';
import { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Logout } from '@mui/icons-material';

class NoticiaSet extends React.Component{
  render(){
    return(
      <Stack spacing={0.2}  alignItems="flex-start" sx={{fontSize:12}} id = "stack">

      {this.props.list.map((post)=>{
            return (<Box sx={{
              p: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"image name name name name name name"
              "image title title title title title title"
              "image content content content content content content"
              ". . . . footer footer footer"`,
              boxShadow: 3,
              borderRadius:'1%',
              width:'98%'
            }}>
              <Box sx={{ gridArea: 'image', p: 0.5, justifyContent:'center'}}>
                <Paper sx={{borderRadius:'50%',
              width:'70px',
              height:'70px',
              display:'block'}}>
                    <img src="public/logo512.png"></img>
                </Paper>
        
              </Box>
              <Box sx={{ gridArea: 'name', fontWeight:'bold', textAlign:'left',p: 0.5}}>{post.autor}</Box>
              <Box sx={{ gridArea: 'title', fontWeight:'light',textAlign:'left', p: 0.5}}>Friend from LucaTIC</Box>
              <Box sx={{ gridArea: 'content', textAlign:'left',p: 0.5 }}>{post.texto}</Box>
              <Box sx={{ gridArea: 'footer',  fontWeight:'light', fontSize:10, textAlign:'right',p: 0.5}}>{post.fechahora}</Box>
            </Box>);
          })}

      </Stack>
    );
    
        
  }
}

class ProfileInfo extends React.Component{
  render(){
    return(
      <Box sx={{p:"0",m:"0"}} id="profile">
          <Stack spacing={0.2} alignItems="flex-end" sx={{fontSize:12}}>
          <Box sx={{fontWeight:'bold'}}>{this.props.user.nombre} {this.props.user.apellido1} {this.props.user.apellido2}</Box>
          
          <Box >{this.props.user.email}</Box>
          </Stack>

      </Box>
    );
  };
}

class TaskSet extends React.Component{
  render(){
    return(
      <Box id="tasks" sx={{
            boxShadow:3,
            height:"85vh",
            p:1,
            ml:0.5,
            mt:"50px",
            width:"29.5%",
            overflowY:"scroll"
          }}
          position="fixed">
          
          <Stack sx={{m:0,p:0}}>
            {this.props.list.map((task)=>{
              
                    return(<Box 
                    sx={{
                    bgcolor:"#ddd",
                    borderRadius:"2%",
                    width:"94%",
                    height:"fit-content",
                    p:1,
                    ml:1,
                    mt:1
                    }}>
                          <Box display="flex"
                          alignItems="flex-start"
                          sx={{width:"100", ml:1, mt:1}}>
                            <span>{task.nombre}</span>
                          </Box>

                          <Box display="flex"
                          alignItems="flex-start"
                          sx={{width:"100", ml:1, mt:1, fontSize:11}}>
                            <span>{task.descripcion}</span>
                          </Box>

                          <Box display="flex"
                          alignItems="flex-start"
                          sx={{width:"100", ml:1, mt:1, fontSize:9}}>
                            <span>{task.fechahora}</span>
                          </Box>

                          <Box
                          display="flex"
                          alignItems="flex-start"
                          sx={{width:"100"}}>
                            <Button>Terminar</Button>
                          </Box>

                    </Box>)

            })}
            
          </Stack>
      </Box>
    );
  };
}

function App() {

  if(localStorage.getItem("token")!="null"){
    fetch("http://localhost:8080/api/noticias/79934734B/1",{mode:'cors',
    headers:{
      "access-token":localStorage.getItem("token")
    }})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      {ReactDOM.render(<NoticiaSet list={data}/>, document.getElementById("posts"))}
    });

    //Fetch tasks from user
    fetch("http://localhost:8080/api/tareas/marquez@appogeodigital.com/1",{mode:'cors',
    headers:{
      "access-token":localStorage.getItem("token")
    }})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      {ReactDOM.render(<TaskSet list={data}/>, document.getElementById("taskContainer"))}
    });
  }

  //Fetch user info

  if(localStorage.getItem("usuario")!="null"){
    fetch("http://localhost:8080/api/usuarios/"+localStorage.getItem("usuario"),{mode:'cors',
    headers:{
      "access-token":localStorage.getItem("token")
    }})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var temp = document.createElement("div");
      ReactDOM.render(<ProfileInfo user={data}/>, temp);
      var container = document.getElementById("toolbar");
      container.replaceChild(temp.querySelector("#profile"), document.getElementById("profile"));
    });
  }

  return(
     <div>
        <ul>
          <li>
            <Link to="/login" onClick={LogoutHandler}>Logout</Link>
          </li>          
        </ul>

        <Routes>
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/" element={<Main />}/>      
        </Routes>

        <div className="App">
          <Grid container spacing={2} sx={{ml:0.1}}>

            <Grid item xs={12}>

              <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                  <Toolbar variant="dense" id="toolbar" >
                    
                    
                      <Typography display={{xs:'flex'}} sx={{mr:2,mt:0.5}} variant="h6" color="inherit" component="div">
                        <Link to="/" style={{textDecoration:"none", color:"white"}}>
                          Pyramid @ 
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





function Main() {
    //Fetch posts from group
  

  return (
    <div className="App">
      <Grid container spacing={2} sx={{ml:0.1}}>
        <Grid item xs={12}>

          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
              <Toolbar variant="dense" id="toolbar" >
                
                <Typography display={{xs:'flex'}} sx={{mr:2,mt:0.5}} variant="h6" color="inherit" component="div">
                  Pyramid @ 
                </Typography>
              
                <Box sx={{ flexGrow: 1 }} />  

                <Box id="profile"></Box>
                
                  
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
  );

}

function LogoutHandler(){
  fetch("http://localhost:8080/logout",{
    method:'POST',
    //mode:'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }}
  ).then((response)=>{

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    return {message:response.message,status:response.status};

  });
}

class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {email: '',contrasena:''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    (event.target.name=="email")?this.setState({email: event.target.value}):this.setState({contrasena: event.target.value});
  }

  handleSubmit(event){
    fetch("http://localhost:8080/login",{
      method:'POST',
      //mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(this.state)})
    .then(async (response) => {

      const responseObject = await response.json();
      const status = response.status;
      const message = responseObject.message;


      console.log(responseObject.token);
      console.log(responseObject.usuario)
      console.log(message)
      console.log(status)

      localStorage.setItem("token",responseObject.token);
      localStorage.setItem("usuario",responseObject.usuario);
    
    }
    
    )
    //.then((data) =>{
//      console.log(data.status);
  //  })
    
    event.preventDefault();
  }

  render(){
    return(

      <div>
        <form onSubmit={this.handleSubmit}>

          <label>
            E-mail
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
          </label>
          <label>
            Password
            <input type="password" name="contrasena" value={this.state.contasena} onChange={this.handleChange}/>
          </label>
          <input type="submit" name="Iniciar sesi&ntildeo;n" />

        </form>
        
      </div>

  );
  }
}

export default App;
