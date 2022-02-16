import Noticia from "../model/Noticia";
import Usuario from "../model/Usuario";
import Mapper from "../utils/mapper"
import SrvDaoUsuario from "../srvcDao/srvDaoUsuario";

let ControlUsuario = class controlUsuario {

    static async create(usuario){

        if(usuario === null)
            return("Error al procesar petición.");

        const usuarioJson = this.convert(usuario);

        const result = await SrvDaoUsuario.create(usuarioJson) ;

        return result;

    };

    static delete(usuario){

        if(usuario === null)
            return("Error al procesar petición.");

        const usuarioJson = this.convert(usuario);

        return SrvDaoUsuario.delete(usuarioJson);

    };

    static edit(usuario){

        if(usuario === null)
            return("Error al procesar petición.");

        const usuarioJson = this.convert(usuario);

        return SrvDaoUsuario.edit(usuarioJson);

    };

    //get

    static getById(email){

        if(email === null)
            return("Error al procesar petición.");

        const usuarioJson = SrvDaoUsuario.getById(email);

        return this.convert(usuarioJson);

    }

    static getByProyecto(codigogrupo, empresagrupo){

        if(codigogrupo === null || empresagrupo === null)
            return("Error al procesar petición.");

        const usuariosArray = SrvDaoUsuario.getByProyecto(codigogrupo, empresagrupo);

        let resultado = [];

        Array.from(usuariosArray).forEach(element => {

            const usuario = this.convert(element);

            resultado.push(usuario);
            
        });

        return resultado;
    }

    static createNtf(usuario, notificacion){

        if(notificacion === null || usuario === null)
            return("Error al procesar petición.");

        const notificacionJson = Mapper.notificacionToJson(notificacion);

        return SrvDaoUsuario.createNotificacion(usuario, notificacionJson);

    }

    static deleteNtf(id, usuario){

        if(id === null || usuario === null)
            return("Error al procesar petición.");

        return SrvDaoUsuario.deleteNotificacion(id, usuario);

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