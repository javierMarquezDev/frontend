import config from "../config/config.json";

const connectionStr = config.route+"archivos/";

let SrvDaoArchivo = class DaoArchivo{

    static create(archivo){

        return fetch(
            connectionStr,
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(archivo)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    }

    static delete(codigo, tareacodigo, tareagrupocodigo, tareagrupoempresa){

        return fetch(
            connectionStr+tareagrupoempresa+"/"+tareagrupocodigo+"/"+tareacodigo+"/"+codigo,
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

    static edit(archivo){
        return fetch(
            connectionStr+archivo.tareagrupoempresa+"/"+archivo.tareagrupocodigo+"/"+archivo.tareacodigo+"/"+archivo.codigo,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(archivo)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
    }

    static getById(codigo, tareacodigo, tareagrupocodigo, tareagrupoempresa){

        return fetch(
            connectionStr+tareagrupoempresa+"/"+tareagrupocodigo+"/"+tareacodigo+"/"+codigo,
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

    static getByTarea(tareacodigo, tareagrupocodigo, tareagrupoempresa){
        return fetch(
            connectionStr+tareagrupoempresa+"/"+tareagrupocodigo+"/"+tareacodigo,
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

}

export default SrvDaoArchivo;