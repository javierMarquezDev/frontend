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

    static async getAdminByEmpresa(empresa){

        if(empresa == null || empresa.nif == null || empresa.nif === "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getAdminsByEmpresa(empresa.nif);

        let resultado = [];

        empresasArray.forEach(async (element) => {

            const empresa = await ControlUsuario.getById(element.usuario);

            resultado.push(empresa);
            
        });

        return resultado;

    }

    static async getEmpresaByAdmin(admin){

        if(admin == null || admin == "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getEmpresasByAdmin(admin.email);

        let resultado = [];

        empresasArray.forEach(async (element) => {

            const empresa = await ControlEmpresa.getById(element.empresa);

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

    static async getEmpresasByUsuario(usuario){

        const empresasJson = await SrvDaoEmpresa.getEmpresasByUser(usuario.email);

        let result = [];

        empresasJson.forEach(async element =>{

            result.push(await this.getById(element.empresa))

        })

        return await result;

    }

    static async getUsuariosByEmpresa(empresa){

        const usuariosJson = await SrvDaoEmpresa.getUsersByEmpresa(empresa.nif);

        let result = [];

        usuariosJson.forEach(async element =>{

            const usuario = await ControlUsuario.getById(element.usuario)

            result.push(usuario)

        })

        return result;

    }
    
    //convert

    static async convert(data){

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