function handleLogout(){
    fetch("http://localhost:8080/logout",{
      method:'POST',
      mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}
    ).then((response)=>{
  
      localStorage.setItem("usuario",null);
      localStorage.setItem("token",null);
      return {message:response.message,status:response.status};
  
    });
  }

  export default handleLogout;