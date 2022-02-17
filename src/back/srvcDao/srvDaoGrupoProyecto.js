import config from "../config/config.json";

const connectionStr = config.route+"grupos/";

let srvDaoGrupoProyecto = class groupProject{

    static getAllFromEmpresa(empresa = ""){

        return fetch(
            connectionStr+empresa,
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

    static getAllFromUsuario(usuario = ""){

        return fetch(
            connectionStr+"usuarios/search/"+usuario,
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

    static getOneById(empresa = "", id = ""){

        return fetch(
            connectionStr+"usuarios/"+empresa+"/"+id,
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

    static getAllByFin(finalizado = false){

        return fetch(
            connectionStr+"fin/search/"+(finalizado)?"true":"false",
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

    static edit(grupoJson){

        return fetch(
            connectionStr+grupoJson.empresa+"/"+grupoJson.codigo,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(grupoJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static delete(grupoJson){

        return fetch(
            connectionStr+"usuarios/"+grupoJson.empresa+"/"+grupoJson.codigo,
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

    static create(grupoJson){

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
                body: JSON.stringify(grupoJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static addUsuario(email, id, nif){

        usuariogrupo = {
            "usuario":email,
            "codigogrupo":id,
            "empresagrupo":nif
        }

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
                body: JSON.stringify(usuariogrupo)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

    };

    static removeUsuario(email, id, empresa){
        return fetch(
            connectionStr+email+"/"+id+"/"+empresa,
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

}

export default srvDaoGrupoProyecto;