import Mapper from "../utils/mapper";

let SrvDaoEmpresa = class ServiceDaoEmpresa{

    static create(empresaJson){

        return fetch(
            "https://localhost:8080/api/empresas",
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empresaJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

        

    };

    static getByName(nombre = ""){

        return fetch(
            "https://localhost:8080/api/empresas/name"+nombre,
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

        return responseEmpresa.json;

    };

    static getById(nif = ""){

        return fetch(
            "https://localhost:8080/api/empresas/"+nif,
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

        const administrador = srvDaoUsuario.getById(responseEmpresa.body.administrador);

        const usuarios = srvDaoUsuario.getByEmpresa(responseEmpresa.body.nif);

        const grupoProyectos = srvDaoGrupoProyecto.getByEmpresa(responseEmpresa.body.nif);

        const empresa = Mapper.jsonToEmpresa(responseEmpresa.json, administrador,usuarios, grupoProyectos);

        return empresa;
        
    };

    static getByAdmin(admin = ""){
        return fetch(
            "https://localhost:8080/api/empresas/admin"+admin,
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

    static edit(empresaJson){

        return fetch(
            "https://localhost:8080/api/empresas/"+empresaJson.nif,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empresaJson)

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data);
            return data;
        })

        

    };

    static delete(nif){
        return fetch(
            "https://localhost:8080/api/empresas/"+nif,
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

}

export default SrvDaoEmpresa;