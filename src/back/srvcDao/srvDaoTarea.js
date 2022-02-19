import config from "../config/config.json";

const connectionStr = config.route+"tareas/";

let SrvDaoTarea = class DaoTarea{

    static async create(tarea){

        return await fetch(
            connectionStr+tarea.grupoempresa+"/"+tarea.grupocodigo,
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tarea)

            }
        ).then((response) => response.json())
        .then(data => {
            
            return data;
        })

    }

    static async delete(tarea){

        return await fetch(
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
            
            return data;
        })

    }

    static async edit(tareaJson){

        return await fetch(
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
            
            return data;
        })

    }

    static async getAllFromGrupo(grupoempresa, grupocodigo){

        return await fetch(
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
            
            return data;
        })

    }

    static async getAllFromUsuario(usuario){

        return await fetch(
            connectionStr+usuario,
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

    }

    static async getOneById(grupoempresa, grupocodigo, tareacodigo){

        return await fetch(
            connectionStr+grupoempresa+"/"+grupocodigo+"/"+tareacodigo,
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

    }

    static async getUsuariotareaFromUsuario(usuario){

        return await fetch(
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
            
            return data;
        })

    }

    static async getUsuariotareaFromTarea(grupoempresa, grupocodigo, id){

        return await fetch(
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
            
            return data;
        })

    }

    static async getOneUsuariotarea(grupoempresa, grupocodigo, id, usuario){

        return await fetch(
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
            
            return data;
        })
        
    }

    static async createUsuariotarea(grupoempresa, grupocodigo, id, usuario){

        return await fetch(
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
            
            return data;
        })

    }

    static async deleteUsuariotarea(grupoempresa, grupocodigo, id, usuario){

        return await fetch(
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
            
            return data;
        })

    }

    static async editUsuariotarea(grupoempresa, grupocodigo, id, usuario, usuarioTarea){

        return await fetch(
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
            
            return data;
        })

    }

}

export default SrvDaoTarea;