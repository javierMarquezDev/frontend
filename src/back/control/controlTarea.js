import SrvDaoTarea from "../srvcDao/srvDaoTarea";
import ControlGrupoProyecto from "./controlGrupoProyecto";
import ControlUsuario from "./controlUsuario";
import Mapper from "../utils/mapper";
import Tarea from "../model/Tarea"

let ControlTarea = class controlTarea{

    static create(tarea, email){

        const tareaJson = this.convert(tarea);

        const resultTarea = SrvDaoTarea.create(tareaJson);

        const resultAsignar = this.assignTarea(resultTarea.grupocodigo, resultTarea.grupoempresa, resultTarea.id, email);

        return [resultTarea,resultAsignar];

    };

    static delete(tarea){

        const tareaJson = this.convert(tarea);

        return SrvDaoTarea.delete(tareaJson);

    };

    static edit(tarea){

        const tareaJson = this.convert(tarea);

        return SrvDaoTarea.edit(tareaJson);

    };

    //get

    static getFromGrupo(grupoEmpresa, grupoCodigo){


        const tareasArray = SrvDaoTarea.getAllFromGrupo(grupoEmpresa,grupoCodigo);

        let resultado = [];

        Array.from(tareasArray).forEach(element => {

            const tarea = this.convert(element);

            resultado.push(tarea);
            
        });

        return resultado;

    }

    static getById(grupoEmpresa, grupoCodigo, id)

    static getFromUsuario(email){

        const tareasArray = SrvDaoTarea.getAllFromUsuario(email);

        let resultado = [];

        Array.from(tareasArray).forEach(element => {

            const tarea = this.convert(element);

            resultado.push(tarea);
            
        });

        return resultado;

    }

    static getUsuarioFromTarea(grupoEmpresa, grupoCodigo, id){

        const usuariotarea = SrvDaoTarea.getUsuariotareaFromTarea(grupoEmpresa,grupoCodigo,id);

        const usuario = ControlUsuario.getById(usuariotarea.usuario);

        return ControlUsuario.convert(usuario);

    }

    static assignTarea(grupoEmpresa, grupoCodigo, id, usuario){

        return SrvDaoTarea.createUsuariotarea(grupoEmpresa,grupoCodigo,id,usuario);

    }

    static unassignTarea(grupoEmpresa, grupoCodigo, id, usuario){

        return SrvDaoTarea.deleteUsuariotarea(grupoEmpresa,grupoCodigo,id,usuario);

    }

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