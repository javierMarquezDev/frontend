import config from "../config/config.json";

const connectionStr = config.route+"empresas/";

let SrvDaoEmpresa = class ServiceDaoEmpresa{

    static async create(empresaJson){

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
                body: JSON.stringify(empresaJson)

            }
        ).then((response) => response.json())
        .then(data => {
            
            return data;
        })

        

    };

    static getByName(nombre = ""){

        return fetch(
            connectionStr+"name/"+nombre,
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

        //return responseEmpresa.json;

    };

    static async getById(nif = ""){

        return await fetch(
            connectionStr+nif,
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

    static async getByAdmin(admin = ""){
        return await fetch(
            connectionStr+"admin/"+admin,
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

    static async edit(empresaJson){

        let cif = empresaJson.nif;
        empresaJson.nif = undefined;

        return await fetch(
            connectionStr+cif,
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
            
            return data;
        })

        

    };

    static async delete(nif){
        return await fetch(
            connectionStr+nif,
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

        
    };

}

export default SrvDaoEmpresa;