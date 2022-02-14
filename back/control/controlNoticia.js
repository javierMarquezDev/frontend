import Noticia from "../model/Noticia";
import ControlGrupo from "./controlGrupoProyecto";
import ControlUsuario from "./controlUsuario";

let ControlNoticia = class ctrlNews{

    static editNoticia(noticia)

    static delete(noticia)

    static create(noticia)

    //get

    static getByGrupo(grupoId)

    static getByUsuario(email)

    static getById(empresa,grupoId,autor,id)

    //convert

    
    static convert(data){

        let noticia = null;

        if(Noticia.prototype.isPrototypeOf(data)){

            noticia = Mapper.noticiaToJson(data);

        }else if(typeof data == 'object'){

            const usuario = ControlUsuario.getById(data.autor);

            const grupoproyecto = ControlGrupo.getById(data.grupoempresa, data.grupocodigo);

            noticia = Mapper.jsonToNoticia(data,usuario,grupoproyecto);

        }

        /**
         * @todo retrieve tareas + notificacitareaones?
         */

         return noticia;

    }

}

export default ControlNoticia;