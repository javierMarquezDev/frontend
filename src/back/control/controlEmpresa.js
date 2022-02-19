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

    static async getByAdmin(admin){

        if(admin == null || admin == "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getByAdmin(admin);

        let resultado = [];

        empresasArray.forEach(async (element) => {

            const empresa = await this.convert(element);

            resultado.push(empresa);
            
        });

        return resultado;

    }
    
    //convert

    static async convert(data){

        let empresa = null;

        if(Empresa.prototype.isPrototypeOf(data)){

            empresa = Mapper.empresaToJson(data);
            

        }else if(typeof data == 'object'){

            const admin = await ControlUsuario.getById(data.administrador);

            empresa = Mapper.jsonToEmpresa(data,await admin);

        }

         return empresa;

    }

}

export default ControlEmpresa;