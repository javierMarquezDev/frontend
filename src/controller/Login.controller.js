function handleLogin(request){
    fetch("http://localhost:8080/login",{
        method:'POST',
        //mode:'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(request)})
        .then(async (response) => {
  
            const responseObject = await response.json();
            const status = response.status;
            const message = responseObject.message;
    
    
            console.log(responseObject.token);
            console.log(responseObject.usuario)
            console.log(message)
            console.log(status)
    
            if(status==200){
            localStorage.setItem("token",responseObject.token);
            localStorage.setItem("usuario",responseObject.usuario);
            //useNavigate(-1);
            }
        
        }
      
      )
}

export default handleLogin;