import SrvDaoTarea from "../srvcDao/srvDaoTarea";
import ControlGrupoProyecto from "./controlGrupoProyecto";
import ControlUsuario from "./controlUsuario";
import Mapper from "../utils/mapper";
import Tarea from "../model/Tarea"

let ControlTarea = class controlTarea{

    static create(tarea, atareado);

    static delete(tarea);

    static edit(tarea);

    //get

    static getFromGrupo(grupoEmpresa, grupoCodigo)

    static getById(grupoEmpresa, grupoCodigo, id)

    static getFromUsuario(email)

    static getUsuarioFromTarea(grupoEmpresa, grupoCodigo, id)

    static assignTarea(grupoEmpresa, grupoCodigo, id, usuario)

    static unassignTarea(grupoEmpresa, grupoCodigo, id, usuario)

    //convert

    /**
     * Convertir json en objeto Tarea,
     * y sus respectivos objetos anidados.
     * @param {*} data 
     */
     static convert(data){

        let tarea = null;

        if(Tarea.prototype.isPrototypeOf(data)){

            tarea = Mapper.tareaToJson(data);

        }else if(typeof data === 'object'){

            const grupoProyecto = ControlGrupoProyecto.getById(data.grupoempresa,data.grupocodigo);

            const usuario = this.getUsuarioFromTarea(data.grupoempresa, data.grupocodigo, data.codigo);

            const archivo = ControlArchivo.getByTarea(data.codigo,data.grupocodigo,data.grupoempresa);

            tarea = Mapper.jsonToTarea(data, grupoProyecto, archivo, usuario);

        }

        /**
         * @todo retrieve tareas + notificaciones?
         */

         return tarea;

    }

}

export default ControlTarea;