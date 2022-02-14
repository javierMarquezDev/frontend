import SrvDaoTarea from "./srvDaoTarea"

let SrvDaoArchivo = class DaoArchivo{

    static create(archivo){

        return fetch(
            "https://localhost:8080/api/archivos/",
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
            "https://localhost:8080/api/archivos/"+tareagrupoempresa+"/"+tareagrupocodigo+"/"+tareacodigo+"/"+codigo,
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

    static edit(archivo, codigo, tareacodigo, tareagrupocodigo, tareagrupoempresa){
        return fetch(
            "https://localhost:8080/api/archivos/"+tareagrupoempresa+"/"+tareagrupocodigo+"/"+tareacodigo+"/"+codigo,
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
            "https://localhost:8080/api/archivos/"+tareagrupoempresa+"/"+tareagrupocodigo+"/"+tareacodigo+"/"+codigo,
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
            "https://localhost:8080/api/archivos/"+tareagrupoempresa+"/"+tareagrupocodigo+"/"+tareacodigo,
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