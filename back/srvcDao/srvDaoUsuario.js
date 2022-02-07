import Notificacion from "../model/Notificacion";
import Usuario from "../model/Usuario";

let srvDaoUsuario = class DaoUsuario{

    static create(usuarioJson = {}){

        return fetch(
            "https://localhost:8080/api/usuarios",
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static getById(email = ""){

        return fetch(
            "https://localhost:8080/api/usuarios/"+email,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })        

    };

    static edit(usuarioJson){

        return fetch(
            "https://localhost:8080/api/usuarios/"+usuarioJson.email,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

        

    };

    static delete (email = ""){

        return fetch(
            "https://localhost:8080/api/usuarios/"+email,
            {
                mode: 'cors',
                method: 'DELETE',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

        

    };

    /**
     * ¿Funcionará?
     * @param String codigoGrupo 
     * @param String empresaGrupo 
     * @returns Array
     */
    static getByProyecto(codigoGrupo, empresaGrupo){

        const responseUsuario = await fetch(
            "https://localhost:8080/api/usuariogrupos/"+codigoGrupo+"/"+empresaGrupo,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

        let arrayUsuarioGrupos = Array.from(responseUsuario.json());

        let arrayUsuarios = [];

        arrayUsuarioGrupos.forEach(element => {

            arrayUsuarios.push(element.usuario);
            
        });

        return arrayUsuarios;

    };

    static createNotificacion(email = "", ntfJson = {}){

        return fetch(
            "https://localhost:8080/api/usuarios/"+email+"/notificaciones",
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ntfJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static deleteNotificacion(id = "", email = ""){

        return fetch(
            "https://localhost:8080/api/usuarios/"+email+"/notificaciones/"+id,
            {
                mode: 'cors',
                method: 'DELETE',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static getAllNtfsFromUsuario(email = ""){

        return fetch(
            "https://localhost:8080/api/usuarios/"+email+"/notificaciones",
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static getOneNtfFromUsuario(id = "", email = ""){

        return fetch(
            "https://localhost:8080/api/usuarios/"+email+"/notificaciones/"+id,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    //static getByEmpresa(){};

}

export default srvDaoUsuario;