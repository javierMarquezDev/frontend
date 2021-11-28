import React from 'react';
import ReactDOM, { render } from 'react-dom';
import TaskSet from '../components/TaskSet.component';
import NoticiaSet from '../components/NoticiaSet.component';
import ProfileInfo from '../components/ProfileInfo.component';
import App from '../App';

function groupTest(){
    setInterval(()=>{
        if(localStorage.getItem("token")!=undefined){
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
    
      if(localStorage.getItem("usuario")!=undefined){
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
      },100);
      
      return(
          <App />
      );
}

export default groupTest;