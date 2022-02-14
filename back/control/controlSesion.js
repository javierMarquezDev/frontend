import SrvDaoSesion from "../srvcDao/srvDaoSesion";
import ControlUsuario from "./controlUsuario";
import Sesion from "../model/Sesion";

let ControlSesion = class controlSesion{

    //Crear objeto Sesión en el localStorage
    static createSesion(email, pass){

        const responseLogin = SrvDaoSesion.login(email,pass);

        if(responseLogin.status != 200)
            return responseLogin;

        //TODO
        const usuario = ControlUsuario.getById(email);

        const token = responseLogin.token;

        const currentSesion = new Sesion(usuario, token);

        //set localstorage sesion object
        localStorage.setItem("currentsesion",currentSesion);

    };

    //Editar objeto Sesión en el localStorage
    static editSesion(usuario = null, token = ""){
        
        let sesion = localStorage.getItem("sesion");

        if(usuario !== null)
            sesion.usuario = usuario;

        if(token !== "")
            sesion.token = token;

        localStorage.setItem("sesion", sesion);

    };

    //Destruir objeto Sesión en el localStorage (reload necesario)
    static destroySesion(){

        localStorage.removeItem("sesion");

    };

}

export default ControlSesion;