import Archivo from "../model/Archivo";
import SrvDaoArchivo from "../srvcDao/srvDaoArchivo";
import Mapper from "../utils/mapper";
import ControlTarea from "./controlTarea";

let ControlArchivo = class ctrlArchivo{

    static create(archivo = new Archivo()){

        const archivoJson = this.convert(archivo);

        return SrvDaoArchivo.create(archivoJson);

    };

    static delete(archivo = new Archivo()){

        return SrvDaoArchivo.delete(archivo.codigo, archivo.tarea.codigo, 
                                archivo.tarea.grupo.codigo, archivo.tarea.grupo.empresa.nif);

    };

    static edit(archivo = new Archivo()){

        const archivoJson = this.convert(archivo);

        return SrvDaoArchivo.edit(archivoJson)

    };

    //get

    static getByTarea(tarea){

        const archivoJson = SrvDaoArchivo.getByTarea(tarea.codigo, tarea.grupo.codigo, tarea.grupo.empresa.nif);

        return this.convert(archivoJson);

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