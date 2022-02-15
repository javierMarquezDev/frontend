import Noticia from "../model/Noticia";
import ControlGrupo from "./controlGrupoProyecto";
import ControlUsuario from "./controlUsuario";
import SrvDaoNoticia from "../srvcDao/srvDaoNoticia";

let ControlNoticia = class ctrlNews{

    static edit(noticia = new Noticia()){

        const noticiaJson = this.convert(noticia)

        return SrvDaoNoticia.edit(noticiaJson);

    }

    static detele(noticia = new Noticia()){

        const noticiaJson = this.convert(noticia);

        return SrvDaoNoticia.delete(noticiaJson);

    }

    static create(noticia = new Noticia()){

        const noticiaJson = this.convert(noticia);

        return SrvDaoNoticia.create(noticiaJson);

    }

    //get

    static getByGrupo(grupoId){

        const noticiasArray = SrvDaoNoticia.getByGrupo(grupoId);

        let resultado = [];

        Array.from(noticiasArray).forEach(element => {

            const noticia = this.convert(element);

            resultado.push(noticia);
            
        });

        return resultado;

    }

    static getByUsuario(cif, grupocodigo, email){

        const noticiasArray = SrvDaoNoticia.getAllByUsuarioAndGrupo(cif,grupocodigo,email);

        let resultado = [];

        Array.from(noticiasArray).forEach(element => {

            const noticia = this.convert(element);

            resultado.push(noticia);
            
        });

        return resultado;


    }

    static getById(empresa,grupoId,autor,id){

        const noticiaJson = SrvDaoNoticia.getOneById(empresa,grupoId,autor,id);

        return this.convert(noticiaJson);

    }

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