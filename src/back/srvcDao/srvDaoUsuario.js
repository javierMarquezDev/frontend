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
            
            return data;
        })

    };

    static async getById(email = ""){

        return await fetch(
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
            return data;
        })        

    };

    static edit(usuarioJson){

        console.log(usuarioJson);

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
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('token')
                },
                body: JSON.stringify(usuarioJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data)
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
            //
            return data;
        })

    };

    /**
     * ¿Funcionará?
     * @param String codigoGrupo 
     * @param String empresaGrupo 
     * @returns Array
     */
    static async getByProyecto(codigoGrupo, empresaGrupo){

        const responseUsuario = await fetch(
            connectionStr+"grupo/"+empresaGrupo+"/"+codigoGrupo,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token')
                }

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })

        let arrayUsuarios = [];

        responseUsuario.forEach(element => {

            arrayUsuarios.push(element.usuario);
            
        });

        return arrayUsuarios;

    };

    static async createNotificacion(email = "", ntfJson = {}){

        return await fetch(
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
            
            return data;
        })

    };

    static async deleteNotificacion(id = "", email = ""){

        return await fetch(
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
            
            return data;
        })

    };

    static async getAllNtfsFromUsuario(usuario){

        return await fetch(
            connectionStr+usuario.email+"/notificaciones",
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            
            return data;
        })

    };

    static async getOneNtfFromUsuario(email = "", id = ""){

        return await fetch(
            connectionStr+email+"/notificaciones/"+id,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            
            return data;
        })

    };

    //static getByEmpresa(){};

}

export default srvDaoUsuario;