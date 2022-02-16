import config from "../config/config.json";

const connectionStr = config.route+"usuarios/";

let srvDaoUsuario = class DaoUsuario{

    static async create(usuarioJson = {}){

        return await fetch(
            connectionStr,
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    //"access-token":localStorage.getItem('token')
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
            connectionStr+email,
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

        const email = usuarioJson.email

        usuarioJson.email = undefined;

        return fetch(
            connectionStr+email,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    //"access-token":localStorage.getItem('token'),
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

    static delete (usuarioJson){

        return fetch(
            connectionStr+usuarioJson.email,
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

        const responseUsuario = fetch(
            "http://localhost:8080/api/usuariogrupos/"+codigoGrupo+"/"+empresaGrupo,
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
            connectionStr+email+"/notificaciones",
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
            connectionStr+email+"/notificaciones/"+id,
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
            connectionStr+email+"/notificaciones",
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
            config.route+"/usuarios/"+email+"/notificaciones/"+id,
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