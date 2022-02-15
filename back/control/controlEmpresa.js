import Mapper from "../utils/mapper";
import SrvDaoEmpresa from "../srvcDao/srvDaoEmpresa";
import ControlUsuario from "./controlUsuario";
import ControlGrupoProyecto from "./controlGrupoProyecto";
import Empresa from "../model/Empresa";

let ControlEmpresa = class CtrlCompany{

    static edit(empresa){

        const empresaJson = this.convert(empresa)

        return SrvDaoEmpresa.edit(empresaJson);

    }

    static detele(empresa){

        const empresaJson = this.convert(empresa);

        return SrvDaoEmpresa.delete(empresaJson);

    }

    static create(empresa){

        const empresaJson = this.convert(empresa);

        return SrvDaoEmpresa.create(empresaJson);

    }

    //get

    static getByName(name){

        const empresasArray = SrvDaoEmpresa.getByName(name);

        let resultado = [];

        Array.from(empresasArray).forEach(element => {

            const empresa = this.convert(element);

            resultado.push(empresa);
            
        });

        return resultado;

    }

    static getById(nif){

        const empresaJson = SrvDaoEmpresa.getById(nif);

        return this.convert(empresaJson);

    }

    static getByAdmin(admin){

        const empresasArray = SrvDaoEmpresa.getByAdmin(admin);

        let resultado = [];

        Array.from(empresasArray).forEach(element => {

            const empresa = this.convert(element);

            resultado.push(empresa);
            
        });

        return resultado;

    }
    
    //convert

    static convert(data){

        let empresa = null;

        if(Empresa.prototype.isPrototypeOf(data)){

            empresa = Mapper.empresaToJson(data);
            

        }else if(typeof data == 'object'){

            const admin = ControlUsuario.getById(data.email);

            const grupos = ControlGrupoProyecto.getFromEmpresa(data.nif);

            empresa = Mapper.jsonToEmpresa(data,admin,grupos);

        }

        /**
         * @todo retrieve tareas + notificaciones?
         */

         return empresa;

    }

}

export default ControlEmpresa;