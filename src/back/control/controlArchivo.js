import Archivo from "../model/Archivo";
import SrvDaoArchivo from "../srvcDao/srvDaoArchivo";
import SrvDaoSesion from "../srvcDao/srvDaoSesion";
import SrvDaoTarea from "../srvcDao/srvDaoTarea";
import Mapper from "../utils/mapper";
import ControlTarea from "./controlTarea";

let ControlArchivo = class ctrlArchivo{

    static async create(archivo = new Archivo()){

        const archivoJson = await this.convert(archivo);

        return await SrvDaoArchivo.create(archivoJson);

    };

    static async delete(archivo){

        const archivoJson = await this.convert(archivo);

        return await SrvDaoArchivo.delete(archivoJson);

    };

    static async edit(archivo){

        const archivoJson = await this.convert(archivo);

        return await SrvDaoArchivo.edit(archivoJson)

    };

    //get

    static async getByTarea(tarea){

        const archivoJson = await SrvDaoArchivo.getByTarea(tarea.grupo.empresa.nif, tarea.grupo.codigo,tarea.codigo);

        return this.convert(archivoJson);

    }

    static async getById(grupoempresa, grupocodigo, tareacodigo, codigo){

        const tareaJson = await SrvDaoArchivo.getById(grupoempresa, grupocodigo, tareacodigo, codigo);

        return await this.convert(tareaJson);

    }

    //convert


    static async convert(data){

        let archivo = null;

        if(Archivo.prototype.isPrototypeOf(data)){
            
            archivo = Mapper.archivoToJson(data);            

            console.log(archivo)

        }else if(typeof data == 'object'){

            const tarea = await ControlTarea.getById(data.tareagrupoempresa, data.tareagrupocodigo,
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