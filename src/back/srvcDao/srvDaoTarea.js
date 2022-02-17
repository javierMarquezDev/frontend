import config from "../config/config.json";

const connectionStr = config.route+"tareas/";

let SrvDaoTarea = class DaoTarea{

    static create(tareaJson){

        return fetch(
            connectionStr+tarea.grupoempresa+"/"+tarea.grupocodigo,
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tareaJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    }

    static delete(tarea){

        return fetch(
            connectionStr+tarea.grupoempresa+"/"+tarea.grupocodigo+"/"+tarea.codigo,
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

    }

    static edit(tareaJson){

        return fetch(
            connectionStr+tareaJson.grupoempresa+"/"+tareaJson.grupocodigo+"/"+tareaJson.codigo,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tareaJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    }

    static getAllFromGrupo(grupoempresa, grupocodigo){

        return fetch(
            connectionStr+grupoempresa+"/"+grupocodigo,
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

    }

    static getAllFromUsuario(usuario){

        

    }

    static getOneById(grupoempresa, grupocodigo, id){

        return fetch(
            connectionStr+grupoempresa+"/"+grupocodigo+"/"+id,
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

    }

    static getUsuariotareaFromUsuario(usuario){

        return fetch(
            config+"usuariotareas/"+usuario,
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

    }

    static getUsuariotareaFromTarea(grupoempresa, grupocodigo, id){

        return fetch(
            config+"usuariotareas/"+grupoempresa+"/"+grupocodigo+"/"+id,
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

    }

    static getOneUsuariotarea(grupoempresa, grupocodigo, id, usuario){

        return fetch(
            config+"usuariotareas/"+grupoempresa+"/"+grupocodigo+"/"+id+"/"+usuario,
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
        
    }

    static createUsuariotarea(grupoempresa, grupocodigo, id, usuario){

        return fetch(
            config+"usuariotareas/"+grupoempresa+"/"+grupocodigo+"/"+id,
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"usuario":usuario})

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    }

    static deleteUsuariotarea(grupoempresa, grupocodigo, id, usuario){

        return fetch(
            config+"usuariotareas/"+grupoempresa+"/"+grupocodigo+"/"+id+"/"+usuario,
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

    }

    static editUsuariotarea(grupoempresa, grupocodigo, id, usuario, usuarioTarea){

        return fetch(
            config+"usuariotareas/"+grupoempresa+"/"+grupocodigo+"/"+id+"/"+usuario,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioTarea)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    }

}

export default SrvDaoTarea;