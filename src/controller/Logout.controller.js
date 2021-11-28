function handleLogout(){
    fetch("http://localhost:8080/logout",{
      method:'POST',
      mode:'cors',
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

  export default handleLogout;