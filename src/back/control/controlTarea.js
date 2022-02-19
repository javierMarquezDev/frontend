import SrvDaoTarea from "../srvcDao/srvDaoTarea";
import ControlGrupoProyecto from "./controlGrupoProyecto";
import ControlUsuario from "./controlUsuario";
import Mapper from "../utils/mapper";
import Tarea from "../model/Tarea"
import ControlArchivo from '../control/controlArchivo';

let ControlTarea = class controlTarea{

    static async create(tarea){

        if(tarea == null)
            return "Información no válida";

        const tareaJson = await this.convert(tarea);

        console.log(tareaJson);

        const resultTarea = await SrvDaoTarea.create(tareaJson);

        return resultTarea;

    };

    static async delete(tarea){


        if(tarea == null)
            return "Información no válida";

        const tareaJson = await this.convert(tarea);

        return await SrvDaoTarea.delete(tareaJson);

    };

    static async edit(tarea){

        if(tarea == null)
            return "Información no válida";

        const tareaJson = await this.convert(tarea);

        return await SrvDaoTarea.edit(tareaJson);

    };

    //get

    static async getFromGrupo(grupoEmpresa, grupoCodigo){

        if(grupoEmpresa === null || grupoEmpresa === "" || grupoCodigo === null || grupoCodigo === "")
            return "Información no válida";


        const tareasArray = await SrvDaoTarea.getAllFromGrupo(grupoEmpresa,grupoCodigo);

        let resultado = [];

        Array.from(tareasArray).forEach( async (element) => {

            const tarea = await this.convert(element);

            resultado.push(tarea);
            
        });

        return resultado;

    }

    static async getById(grupoEmpresa, grupoCodigo, id){

        if(grupoEmpresa === null || grupoEmpresa === "" || grupoCodigo === null || grupoCodigo === "" ||
        id === null || id === "")
            return "Información no válida";

        const tarea = await SrvDaoTarea.getOneById(grupoEmpresa,grupoCodigo,id);

        return await this.convert(tarea);

    }

    static async getFromUsuario(email){

        if(email === null || email === "")
            return "Información no válida";

        const tareasArray = await SrvDaoTarea.getAllFromUsuario(email);

        let resultado = [];

        Array.from(tareasArray).forEach(async element => {

            const tarea = await this.convert(element);

            resultado.push(tarea);
            
        });

        return resultado;

    }

    //convert

    /**
     * Convertir json en objeto Tarea,
     * y sus respectivos objetos anidados.
     * @param {*} data 
     */
     static async  convert(data){

        let tarea = null;

        if(Tarea.prototype.isPrototypeOf(data)){

            tarea = Mapper.tareaToJson(data);

        }else if(typeof data === 'object'){

            const grupoProyecto = await ControlGrupoProyecto.getById(data.grupoempresa,data.grupocodigo);

            const usuario = await ControlUsuario.getById(data.usuario);

            tarea = Mapper.jsonToTarea(data, grupoProyecto, usuario);

        }

        return tarea;

    }

}

export default ControlTarea;