import config from "../config/config.json";

let SrvDaoSesion = class DaoSesion {

    static async login(email, contrasena){

        const request = {"email": email, "contrasena": contrasena}

        return await fetch(config.route+"login",{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(request)})
        .then((response) => response.json()
      
      )

    }

    static async logout(){

        await fetch(config+"logout",{
        method:'POST',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token':localStorage.getItem('token')
        }}
        ).then((response)=>{

            response.json()
    
            localStorage.removeItem("usuario");
            localStorage.removeItem("token");
    
        }).then(data=>{
            
            return data;
            
        });

    }

}

export default SrvDaoSesion;