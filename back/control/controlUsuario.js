import Noticia from "../model/Noticia";
import Usuario from "../model/Usuario";
import Mapper from "../utils/mapper"
import SrvDaoUsuario from "../srvcDao/srvDaoUsuario";

let ControlUsuario = class controlUsuario {

    static create(usuario){

        const usuarioJson = this.convert(usuario);

        return SrvDaoUsuario.create(usuarioJson);

    };

    static delete(usuario){

        const usuarioJson = this.convert(usuario);

        return SrvDaoUsuario.delete(usuarioJson);

    };

    static edit(usuario){

        const usuarioJson = this.convert(usuario);

        return SrvDaoUsuario.edit(usuarioJson);

    };

    //get

    static getById(email){

        const usuarioJson = SrvDaoUsuario.getById(email);

        console.log(usuarioJson);

        return this.convert(usuarioJson);

    }

    static getByProyecto(codigogrupo, empresagrupo){

        const usuariosArray = SrvDaoUsuario.getByProyecto(codigogrupo, empresagrupo);

        let resultado = [];

        Array.from(usuariosArray).forEach(element => {

            const usuario = this.convert(element);

            resultado.push(usuario);
            
        });

        return resultado;
    }

    static createNtf(usuario, notificacion){

        const notificacionJson = Mapper.notificacionToJson(notificacion);

        return SrvDaoUsuario.createNotificacion(usuario, notificacionJson);

    }

    static deleteNtf(id, usuario){

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