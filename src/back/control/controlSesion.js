import SrvDaoSesion from "../srvcDao/srvDaoSesion";
import ControlUsuario from "./controlUsuario";
import Sesion from "../model/Sesion";

let ControlSesion = class controlSesion{

    //Crear objeto Sesión en el localStorage
    static async createSesion(email, pass){

        const responseLogin = await SrvDaoSesion.login(email,pass);

        if(responseLogin.usuario != undefined && responseLogin.token != undefined){

            const token = responseLogin.token;

            //set localstorage sesion object
            localStorage.setItem("usuario",JSON.stringify(responseLogin.usuario));
            localStorage.setItem("token",token);

        }

        return {usuario:responseLogin.usuario, token:responseLogin.token};

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

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        return "Sesión cerrada exitosamente."

    };

    //Get usuario de la sesión
    static getSessionUser(){
        return JSON.parse(localStorage.getItem("usuario") || null);
    }

    //Get token de la sesión
    static getSessionToken(){
        return localStorage.getItem("token") || null;
    }

}

export default ControlSesion;