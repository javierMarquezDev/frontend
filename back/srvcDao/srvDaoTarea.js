let SrvDaoTarea = class DaoTarea{

    static create(adminproyecto, codigoproyecto, tareaJson){

        return fetch(
            "https://localhost:8080/api/tareas/"+adminproyecto+"/"+codigoproyecto,
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

    static delete(adminproyecto, codigoproyecto, id){

        return fetch(
            "https://localhost:8080/api/tareas/"+adminproyecto+"/"+codigoproyecto+"/"+id,
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

    static edit(adminproyecto, codigoproyecto, id, tareaJson){

        return fetch(
            "https://localhost:8080/api/tareas/"+adminproyecto+"/"+codigoproyecto+"/"+id,
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

    static getAllFromGrupo(adminproyecto, codigoproyecto){

        return fetch(
            "https://localhost:8080/api/tareas/"+adminproyecto+"/"+codigoproyecto,
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

    static getOneById(adminproyecto, codigoproyecto, id){

        return fetch(
            "https://localhost:8080/api/tareas/"+adminproyecto+"/"+codigoproyecto+"/"+id,
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
            "https://localhost:8080/api/usuariotareas/"+usuario,
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

    static getUsuariotareaFromTarea(adminproyecto, codigoproyecto, id){

        return fetch(
            "https://localhost:8080/api/usuariotareas/"+adminproyecto+"/"+codigoproyecto+"/"+id,
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

    static getOneUsuariotarea(adminproyecto, codigoproyecto, id, usuario){

        return fetch(
            "https://localhost:8080/api/usuariotareas/"+adminproyecto+"/"+codigoproyecto+"/"+id+"/"+usuario,
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

    static createUsuariotarea(adminproyecto, codigoproyecto, id, usuario){

        return fetch(
            "https://localhost:8080/api/usuariotareas/"+adminproyecto+"/"+codigoproyecto+"/"+id,
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

    static deleteUsuariotarea(adminproyecto, codigoproyecto, id, usuario){

        return fetch(
            "https://localhost:8080/api/usuariotareas/"+adminproyecto+"/"+codigoproyecto+"/"+id+"/"+usuario,
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

    static editUsuariotarea(adminproyecto, codigoproyecto, id, usuario, usuarioTarea){

        return fetch(
            "https://localhost:8080/api/usuariotareas/"+adminproyecto+"/"+codigoproyecto+"/"+id+"/"+usuario,
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