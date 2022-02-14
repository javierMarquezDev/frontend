import GrupoProyecto from "../model/GrupoProyecto";
import Mapper from "../utils/mapper";
import ControlEmpresa from "./controlEmpresa";
import ControlUsuario from "./controlUsuario";
let ControlGrupo = class controlGrupo {

    static editGrupo(grupoProyecto)

    static delete(grupoProyecto)

    static create(grupoProyecto)
    
    //get

    static getFromEmpresa(nif)

    static getFromUsuario(email)

    static getById(empresa, codigo)

    static getByFin(fin)

    //convert

    
    static convert(data){

        let grupo = null;

        if(GrupoProyecto.prototype.isPrototypeOf(data)){

            grupo = Mapper.grupoProyectoToJson(data);

        }else if(typeof data == 'object'){

            const admin = ControlUsuario.getById(data.administrador);
            const empresa = ControlEmpresa.getById(data.empresa);
            const usuarios = [];

            const usuariosJson = ControlUsuario.getByProyecto(data.codigo,data.empresa);

            Array.from(usuariosJson).forEach(element => { usuarios.push(element) });

            const tareas;

            grupo = Mapper.jsonToGrupoProyecto(data,admin,empresa,usuarios);

        }

        /**
         * @todo retrieve tareas + notificacitareaones?
         */

         return grupo;

    }

}

export default ControlGrupo;