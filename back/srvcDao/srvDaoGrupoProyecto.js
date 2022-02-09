import { DataSaverOff } from "@mui/icons-material";

let srvDaoGrupoProyecto = class groupProject{

    static getAllFromEmpresa(empresa = ""){

        return fetch(
            "https://localhost:8080/api/grupos/"+empresa,
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
            "https://localhost:8080/api/grupos/usuarios/search/"+usuario,
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
            "https://localhost:8080/api/grupos/usuarios/"+empresa+"/"+id,
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
            "https://localhost:8080/api/grupos/fin/search/"+(finalizado)?"true":"false",
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

    static edit(codigo = "", empresa = "", grupoJson){

        return fetch(
            "https://localhost:8080/api/grupos/"+empresa+"/"+codigo,
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

    static delete(codigo="", empresa = ""){

        return fetch(
            "https://localhost:8080/api/grupos/usuarios/"+empresa+"/"+codigo,
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
            "https://localhost:8080/api/grupos/",
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
            "https://localhost:8080/api/usuariogrupos/",
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
            "https://localhost:8080/api/usuariogrupos/"+email+"/"+id+"/"+empresa,
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