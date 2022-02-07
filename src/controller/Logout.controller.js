import Redirect from "./Redirect.functions";

function HandleLogout (){

    fetch("http://localhost:8080/logout",{
      method:'POST',
      mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-token':localStorage.getItem('token')
      }}
    ).then((response)=>{
  
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      return Redirect('home');
  
    });

  }

export default HandleLogout;