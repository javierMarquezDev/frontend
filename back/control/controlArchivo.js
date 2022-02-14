import Archivo from "../model/Archivo";
import SrvArchivo from "../srvcDao/srvDaoArchivo";
import Mapper from "../utils/mapper";
import ControlTarea from "./controlTarea";

let ControlArchivo = class ctrlArchivo{

    static create();

    static delete();

    static edit();

    //get

    static getByTarea(tarea){

        

    }

    static getById()

    //convert


    static convert(data){

        let archivo = null;

        if(Archivo.prototype.isPrototypeOf(data)){
            
            archivo = Mapper.archivoToJson(data);            

        }else if(typeof data == 'object'){

            const tarea = ControlTarea.getById(data.tareagrupoempresa, data.tareagrupocodigo,
                data.tareacodigo);

            archivo = Mapper.jsonToArchivo(data, tarea);

        }

        /**
         * @todo retrieve tareas + notificaciones?
         */

         return archivo;

    }

}

export default ControlArchivo;