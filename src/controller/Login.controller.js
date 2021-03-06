import Redirect from "./Redirect.functions";

function HandleLogin(request){
  
  fetch("http://localhost:8080/login",{
        method:'POST',
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
                
                return (Redirect('/'));
                
            }
        
        }
      
      )
}

export default HandleLogin;