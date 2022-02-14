import Mapper from "../utils/mapper";
import SrvDaoEmpresa from "../srvcDao/srvDaoEmpresa";
import ControlUsuario from "./controlUsuario";
import ControlGrupoProyecto from "./controlGrupoProyecto";
import Empresa from "../model/Empresa";

let ControlEmpresa = class CtrlCompany{

    static editEmpresa(empresa){

        const json = Mapper.empresaToJson(empresa);

        return SrvDaoEmpresa.edit(json);

    }

    static deteleEmpresa(empresa){}

    static newEmpresa(empresa){}

    //get

    static getByName(name){}

    static getById(nif){}

    static getByAdmin(admin){}
    
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