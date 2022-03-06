import config from "../config/config.json";

const connectionStr = config.route+"grupos/";

let srvDaoGrupoProyecto = class groupProject{

    static async getAllFromEmpresa(empresa = ""){

        return await fetch(
            connectionStr+"empresa/search/"+empresa,
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

    static async getAllFromUsuario(usuario = ""){

        return await fetch(
            connectionStr+"usuario/search/"+usuario,
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

    static async getUsuariosFromGrupo(grupo){
        const codigo = grupo.codigo;
        const empresa = grupo.empresa.nif;

        return await fetch(
            connectionStr+"usuarios/search/"+empresa+"/"+codigo,
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

    static async addUsuariosBulk(grupo, usuarios){

        let rows = [];

        usuarios.forEach(element => {

            rows.push({empresagrupo:grupo.empresa, codigogrupo:grupo.codigo, usuario:element.email, admin:false});
            
        });

        return await fetch(
            connectionStr+"grupousuarios/bulk/",
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

    static async modifyUsuariosBulk(grupo, usuarios){

        let rows = [];

        usuarios.forEach(element => {

            rows.push({empresagrupo:grupo.empresa.nif, codigogrupo:grupo.codigo, usuario:element.email, admin:false});
            
        });

        return await fetch(
            connectionStr+"grupousuarios/bulk/"+grupo.empresa.nif+"/"+grupo.codigo,
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

    static async isMember(usuario, grupo){

        console.log(usuario,grupo)

        const email = usuario.email;
        const grupocodigo = grupo.codigo;
        const grupoempresa = grupo.empresa.nif;

        return await fetch(
            config.route+"usuariogrupos/"+email+"/"+grupocodigo+"/"+grupoempresa,
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

    static async getOneById(empresa = "", id = ""){

        return await fetch(
            connectionStr+empresa.nif+"/"+id,
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

    /*static async getAllByFin(finalizado = false){

        return await fetch(
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
            
            return data;
        })        

    };*/

    static async edit(grupoJson){

        console.log(grupoJson)

        return await fetch(
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
            
            return data;
        })

    };

    static async delete(grupoJson){

        console.log(grupoJson)

        return await fetch(
            connectionStr+grupoJson.empresa.nif+"/"+grupoJson.codigo,
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

    static async create(grupoJson){

        console.log(grupoJson)

        return await fetch(
            connectionStr+grupoJson.empresa,
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
            return data;
        })

    };

    static async addUsuario(email, id, nif){

        const usuariogrupo = {
            "usuario":email,
            "codigogrupo":id,
            "empresagrupo":nif
        }

        console.log(usuariogrupo)

        return await fetch(
            connectionStr+nif+"/"+id,
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
            
            return data;
        })

    };

    static async removeUsuario(email, id, empresa){
        return await fetch(
            config.route+"usuariogrupos/"+email+"/"+id+"/"+empresa,
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
    };

}

export default srvDaoGrupoProyecto;