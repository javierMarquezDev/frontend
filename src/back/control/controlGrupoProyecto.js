import GrupoProyecto from "../model/GrupoProyecto";
import Mapper from "../utils/mapper";
import ControlEmpresa from "./controlEmpresa";
import ControlUsuario from "./controlUsuario";
import SrvDaoGrupoProyecto from "../srvcDao/srvDaoGrupoProyecto";
let ControlGrupo = class controlGrupo {

    
    static edit(grupoProyecto = new grupoProyecto()){

        const grupoProyectoJson = this.convert(grupoProyecto)

        return SrvDaoGrupoProyecto.edit(grupoProyectoJson);

    }

    static detele(grupoProyecto = new grupoProyecto()){

        const grupoProyectoJson = this.convert(grupoProyecto);

        return SrvDaoGrupoProyecto.delete(grupoProyectoJson);

    }

    static create(grupoProyecto = new grupoProyecto()){

        const grupoProyectoJson = this.convert(grupoProyecto);

        return SrvDaoGrupoProyecto.create(grupoProyectoJson);

    }
    
    //get

    static getFromEmpresa(nif){

        const gruposJson = SrvDaoGrupoProyecto.getAllFromEmpresa(nif);

        let result = [];

        Array.from(gruposJson).forEach(element => {

            const grupo = this.convert(element);

            result.push(grupo);
            
        });

        return result;

    }

    static getFromUsuario(email){

        const gruposJson = SrvDaoGrupoProyecto.getAllFromUsuario(email);

        let result = [];

        Array.from(gruposJson).forEach(element => {

            const grupo = this.convert(element);

            result.push(grupo);
            
        });

        return result;

    }

    static getById(empresa, codigo){

        const grupoJson = SrvDaoGrupoProyecto.getOneById(empresa,codigo);

        return this.convert(grupoJson);

    }

    static getByFin(fin = false){

        const gruposJson = SrvDaoGrupoProyecto.getAllByFin(fin);

        let result = [];

        Array.from(gruposJson).forEach(element => {

            const grupo = this.convert(element);

            result.push(grupo);
            
        });

        return result;

    }

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