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

        console.log(empresaJson)

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

    static async addUser(empresa, user, admin){

        return await fetch(
            config.route+"empresausuarios/",
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({empresa:empresa, usuario:user, admin:admin})

            }
        ).then((response) => response.json())
        .then(data => {
            
            return data;
        })

    }

    static async deleteUser(empresa, user){

        return await fetch(
            config.route+"empresausuarios/"+empresa+"/"+user,
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
            return data;
        })

    }

    static async getUsersByEmpresa(empresa){

        return await fetch(
            connectionStr+"/usuarios/"+empresa,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })

    }

    static async getEmpresasByUser(user){

        return await fetch(
            connectionStr+"/usuario/"+user,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })

    }

    static async getEmpresasByAdmin(usuario){

        return await fetch(
            connectionStr+"empresasadmin/"+usuario,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data)
            return data;
        })

    }

    static async isAdmin(empresa, usuario){
        const cif = empresa.nif;
        const email = usuario.email;

        console.log(cif,email)

        return await fetch(
            connectionStr+"checkadmin/"+cif+"/"+email,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            console.log(data)
            return data[0];
        })
    }

    static async isMember(empresa, usuario){
        const cif = empresa.nif;
        const email = usuario.email;

        return await fetch(
            connectionStr+"checkmember/"+cif+"/"+email,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })
    }

    static async addUsuariosBulk(empresa, usuarios,admins){

        let rows = [];

        if(admins.length < 1)
            return {administrador:"El campo debe incluir al menos un administrador"}

        usuarios.forEach(element => {

            let usuarioEsAdmin;

            (admins.find(usuario => usuario.email === element.email ))?usuarioEsAdmin=true:usuarioEsAdmin=false;

            rows.push({empresa:empresa.nif, usuario:element.email, admin: usuarioEsAdmin });
            
        });

        console.log(rows)

        return await fetch(
            connectionStr+"empresausuarios/bulk/",
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rows)

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })

    }

    static async modifyUsuariosBulk(empresa, usuarios,admins){

        let rows = [];

        if(admins.length < 1)
            return {administrador:"El campo debe incluir al menos un administrador"}

        usuarios.forEach(element => {

            let usuarioEsAdmin;

            (admins.find(usuario => usuario.email === element.email ))?usuarioEsAdmin=true:usuarioEsAdmin=false;

            rows.push({empresa:empresa.nif, usuario:element.email, admin: usuarioEsAdmin });
            
        });

        console.log(rows)

        return await fetch(
            connectionStr+"empresausuarios/bulk/"+empresa.nif,
            {
                mode: 'cors',
                method: 'POST',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rows)

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })

    }

    static async getAdminsByEmpresa(empresa){

        return await fetch(
            connectionStr+"adminsempresa/"+empresa,
            {
                mode: 'cors',
                method: 'GET',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })

    }

    static async promoteAdmin(empresa, usuario, admin){
        return await fetch(
            config.str+"empresausuarios/"+empresa+"/"+usuario,
            {
                mode: 'cors',
                method: 'PUT',
                headers:{
                    "access-token":localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({admin:admin})

            }
        ).then((response) => response.json())
        .then(data => {
            return data;
        })
    }

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