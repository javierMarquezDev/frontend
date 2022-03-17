import config from "../config/config.json";
import ControlSesion from "../control/controlSesion";

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

    static async checkSesion(token){

        
        let valid = await fetch(`${config.route}token`,{
                method:'POST',
                mode:'cors',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({token:token})
            })
            .then(data => {
                return data.json()
            })
            .then(data => {
                
                return (data.unvalid === undefined)?true:false;
            })
        
        return valid;

    }

    static async checkPass(email,pass){

        let correct = await fetch(`${config.route}checkpass`,{
            method:'POST',
            mode:'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({email:email,pass:pass})
        })
        .then(data => {
            return data.json()
        })
        .then(data => {
            
            console.log(data)
            return data.valid;
        })
    
    return correct;

    }

}

export default SrvDaoSesion;