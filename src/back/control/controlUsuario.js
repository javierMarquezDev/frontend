import validator from "validator";
import Noticia from "../model/Noticia";
import Usuario from "../model/Usuario";
import Mapper from "../utils/mapper"
import SrvDaoUsuario from "../srvcDao/srvDaoUsuario";

let ControlUsuario = class controlUsuario {

    static async create(usuario){

        if(usuario === null)
            return("Información no válida.");

        const usuarioJson = this.convert(usuario);

        const result = await SrvDaoUsuario.create(usuarioJson) ;

        return result;

    };

    static delete(usuario){

        if(usuario === null)
            return("Información no válida.");

        const usuarioJson = this.convert(usuario);

        return SrvDaoUsuario.delete(usuarioJson);

    };

    static edit(usuario){

        if(usuario === null)
            return("Información no válida.");

        const usuarioJson = this.convert(usuario);

        return SrvDaoUsuario.edit(usuarioJson);

    };

    //get

    static async getById(email){

        if(email === null || email === "" || !validator.isEmail(email))
            return("Información no válida.");

        const usuarioJson = await SrvDaoUsuario.getById(email);

        if(usuarioJson.email == null) return "El usuario no existe";

        return this.convert(usuarioJson);

    }

    static async getByProyecto(codigogrupo, empresagrupo){

        if(codigogrupo === null || empresagrupo === null || codigogrupo === "" || empresagrupo === "")
            return("Información no válida.");

        const usuariosArray = await SrvDaoUsuario.getByProyecto(codigogrupo, empresagrupo);

        let resultado = [];

        usuariosArray.forEach(async element => {

            let object = await SrvDaoUsuario.getById(element);

            const usuario = this.convert(object);

            resultado.push(usuario);
            
        });

        return resultado;
    }

    static async createNtf(usuario, notificacion){

        if(notificacion === null || usuario === null)
            return("Información no válida.");

        const notificacionJson = Mapper.notificacionToJson(notificacion);

        return await SrvDaoUsuario.createNotificacion(usuario, notificacionJson);

    }

    static async deleteNtf(id, usuario){

        if(id === null || usuario === null)
            return("Información no válida.");

        return await SrvDaoUsuario.deleteNotificacion(id, usuario);

    }

    static async getNtf(usuario){

        if(usuario === null || usuario === "")
            return "Información no válida";

        return await SrvDaoUsuario.getAllNtfsFromUsuario(usuario);

    }

    static async getOneNtf(usuario,codigo){

        if(usuario === null || usuario === "" || codigo === null || isNaN(parseInt(codigo)) || codigo < 0)
            return "Información no válida";

        return await SrvDaoUsuario.getOneNtfFromUsuario(usuario,codigo);

    }

    //convert

    static convert(data){

        let usuario = null;

        if(Usuario.prototype.isPrototypeOf(data)){

            usuario = Mapper.usuarioToJson(data);
 
        }else if(typeof data === 'object'){

            usuario = Mapper.jsonToUsuario(data);

        }

        /**
         * @todo retrieve tareas + notificacitareaones?
         */

         return usuario;

    }
}

export default ControlUsuario;