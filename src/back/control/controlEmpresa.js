import Mapper from "../utils/mapper";
import SrvDaoEmpresa from "../srvcDao/srvDaoEmpresa";
import ControlUsuario from "./controlUsuario";
import ControlGrupoProyecto from "./controlGrupoProyecto";
import Empresa from "../model/Empresa";

let ControlEmpresa = class CtrlCompany{

    static async edit(empresa){

        if(empresa == null || empresa == "" || empresa.nif === null || empresa.nif === "")
            return "Información no válida."

        const empresaJson = await this.convert(empresa)

        return await SrvDaoEmpresa.edit(empresaJson);

    }

    static async delete(empresa){

        if(empresa == null || empresa == "")
            return "Información no válida."

        return await SrvDaoEmpresa.delete(empresa);

    }

    static async create(empresa){

        if(empresa == null || empresa == "")
            return "Información no válida."

        const empresaJson = await this.convert(empresa);

        console.log(empresaJson);

        return await SrvDaoEmpresa.create(empresaJson);

    }

    //get

    static async getByName(name){

        if(name == null || name == "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getByName(name);

        let resultado = [];

        Array.from(empresasArray).forEach(async (element) => {

            const empresa = await this.convert(element);

            resultado.push(empresa);
            
        });

        return resultado;

    }

    static async getById(nif){

        if(nif == null || nif == "")
            return "Información no válida."

        const empresaJson = await SrvDaoEmpresa.getById(nif);

        return await this.convert(await empresaJson);

    }

    static async isAdmin(empresa, usuario){

        const response = await SrvDaoEmpresa.isAdmin(empresa,usuario);
        
        return response.admin;

    }

    static async isMember(empresa, usuario){

        const response = await SrvDaoEmpresa.isMember(empresa,usuario);

        console.log(response.length)

        if(response.length)
            return true;
        
        return false;

    }

    static async addUsuariosBulk(empresa,usuarios,admins){

        console.log(empresa,usuarios,admins)

        return await SrvDaoEmpresa.addUsuariosBulk(empresa,usuarios,admins);
        
    }

    static async moidfyUsuariosBulk(empresa,usuarios,admins){

        return await SrvDaoEmpresa.modifyUsuariosBulk(empresa,usuarios,admins);

    }

    static async getAdminByEmpresa(empresa){

        if(empresa == null || empresa.nif == null || empresa.nif === "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getAdminsByEmpresa(empresa.nif);

        let resultado = [];

        empresasArray.forEach(element => {

            const usuario = ControlUsuario.convert(element);

            resultado.push(usuario);
            
        });

        return resultado;

    }

    static async getEmpresaByAdmin(admin){

        if(admin == null || admin == "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getEmpresasByAdmin(admin.email);

        let resultado = [];

        empresasArray.forEach(element => {

            const empresa = this.convert(element);

            resultado.push(empresa);
            
        });

        return resultado;

    }

    static async addUsuario(empresa, usuario, admin){

        return await SrvDaoEmpresa.addUser(empresa.nif, usuario.email, admin);

    }

    static async deleteUsuario(empresa, usuario){

        return await SrvDaoEmpresa.deleteUser(empresa.nif, usuario.email);

    }

    static async promoteUsuario(empresa, usuario){
        
        const response = await SrvDaoEmpresa.promoteAdmin(empresa.nif, usuario.email, true);

        return response;

    }

    static async degradeUsuario(empresa, usuario){

        const response = await SrvDaoEmpresa.promoteAdmin(empresa.nif, usuario.email, false);

        return response;

    }

    static async getEmpresasByUsuario(usuario){

        const empresasJson = await SrvDaoEmpresa.getEmpresasByUser(usuario.email);

        let empresas = [];

        empresasJson.forEach(element => empresas.push(this.convert(element)));

        return empresas;

    }

    static async getUsuariosByEmpresa(empresa){

        const usuariosJson = await SrvDaoEmpresa.getUsersByEmpresa(empresa.nif);

        let usuarios = [];

        usuariosJson.forEach(element => usuarios.push(ControlUsuario.convert(element)));

        return usuarios;
    }
    
    //convert

    static convert(data){

        let empresa = null;

        if(Empresa.prototype.isPrototypeOf(data)){

            empresa = Mapper.empresaToJson(data);
            

        }else if(typeof data == 'object'){

            empresa = Mapper.jsonToEmpresa(data);

        }

         return empresa;

    }

}

export default ControlEmpresa;