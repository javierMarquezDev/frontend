import config from "../config/config.json";

let SrvDaoSesion = class DaoSesion {

    static login(email, contrasena){

        const request = {"email": email, "contrasena": contrasena}

        fetch(config+"login",{
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

    static logout(){

        fetch(config+"logout",{
        method:'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token':localStorage.getItem('token')
        }}
        ).then((response)=>{

            response.json()
    
            /*localStorage.removeItem("usuario");
            localStorage.removeItem("token");
            return Redirect('home');*/
    
        }).then(data=>{
            
            console.log(data);
            return data;
            
        });

    }

}

export default SrvDaoSesion;