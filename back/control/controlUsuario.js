import { NewReleasesSharp } from "@mui/icons-material";
import Noticia from "../model/Noticia";
import Usuario from "../model/Usuario";
import Mapper from "../utils/mapper"

let ControlUsuario = class controlUsuario {

    static create(usuario)

    static delete(usuario)

    static edit(usuario)

    //get

    static getById(email)

    static getByProyecto(codigoGrupo,empresaGrupo)

    static createNtf(usuario)

    static deleteNtf(id, usuario)

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