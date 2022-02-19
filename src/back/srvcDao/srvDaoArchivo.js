import config from "../config/config.json";

const connectionStr = config.route+"archivos/";

let SrvDaoArchivo = class DaoArchivo{

    static async create(archivo){

        return await fetch(
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

    static async delete(archivo){

        return await fetch(
            connectionStr+archivo.tareagrupoempresa+"/"+archivo.tareagrupocodigo+"/"+archivo.tareacodigo+"/"+archivo.codigo,
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

    static async edit(archivo){
        return await fetch(
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

    static async getById(grupoempresa, grupocodigo, tareacodigo, codigo){

        return await fetch(
            connectionStr+grupoempresa+"/"+grupocodigo+"/"+tareacodigo+"/"+codigo,
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

    static async getByTarea(tareagrupoempresa,tareagrupocodigo,tareacodigo){
        return await fetch(
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