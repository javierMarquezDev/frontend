import config from "../config/config.json";
import SrvDaoArchivo from "./srvDaoArchivo";

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

    static async getAdminsFromGrupo(grupo){
        const codigo = grupo.codigo;
        const empresa = grupo.empresa.nif;

        console.log(grupo)

        return await fetch(
            connectionStr+"admins/search/"+empresa+"/"+codigo,
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

    static async getGruposFromAdmin(admin){
        const email = admin.email;

        return await fetch(
            connectionStr+"admin/search/"+email,
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

    static async addUsuariosBulk(grupo, usuarios, admins){

        let rows = [];

        usuarios.forEach(element => {

            let usuarioEsAdmin;

            (admins.find(usuario => usuario.email === element.email ))?usuarioEsAdmin=true:usuarioEsAdmin=false;

            rows.push({empresagrupo:grupo.empresa, codigogrupo:grupo.codigo, usuario:element.email, administrador: usuarioEsAdmin});
            
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

    static async modifyUsuariosBulk(grupo, usuarios, admins){

        

        let rows = [];

        usuarios.forEach(element => {

            let usuarioEsAdmin;

            (admins.find(usuario => usuario.email === element.email ))?usuarioEsAdmin=true:usuarioEsAdmin=false;
            
            rows.push({empresagrupo:grupo.empresa.nif, codigogrupo:grupo.codigo, usuario:element.email, administrador:usuarioEsAdmin});
            
        });

        console.log("admins",rows)

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

    static async isAdmin(grupo, usuario){

        console.log(grupo)

        const grupocodigo = grupo.codigo;
        const grupoempresa = grupo.empresa.nif;
        const email = usuario.email;

        return await fetch(
            connectionStr+"checkadmin/"+grupoempresa+"/"+grupocodigo+"/"+email,
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

    static async isMember(usuario, grupo){

        

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

        console.log(empresa,id)

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