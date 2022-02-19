import Noticia from "../model/Noticia";
import ControlGrupo from "./controlGrupoProyecto";
import ControlUsuario from "./controlUsuario";
import SrvDaoNoticia from "../srvcDao/srvDaoNoticia";
import Mapper from "../utils/mapper";

let ControlNoticia = class ctrlNews{

    static async edit(noticia){

        const noticiaJson = await this.convert(noticia)

        return await SrvDaoNoticia.edit(noticiaJson);

    }

    static async delete(noticia = new Noticia()){

        const noticiaJson = await this.convert(noticia);

        return await SrvDaoNoticia.delete(noticiaJson);

    }

    static async create(noticia = new Noticia()){

        const noticiaJson = await await this.convert(noticia);

        return await SrvDaoNoticia.create(noticiaJson);

    }

    //get

    static async getByGrupo(grupoempresa, grupocodigo){

        const noticiasArray = await SrvDaoNoticia.getAllByGrupo(grupoempresa, grupocodigo);

        let resultado = [];

        Array.from(noticiasArray).forEach(async element => {

            const noticia = await this.convert(element);

            resultado.push(noticia);
            
        });

        return resultado;

    }

    static async getByUsuario(cif, grupocodigo, email){

        const noticiasArray = await SrvDaoNoticia.getAllByUsuarioAndGrupo(cif,grupocodigo,email);

        let resultado = [];

        Array.from(noticiasArray).forEach(async element => {

            const noticia = await this.convert(element);

            resultado.push(noticia);
            
        });

        return resultado;


    }

    static async getById(empresa, grupocodigo, autor, codigo){

        const noticiaJson = await SrvDaoNoticia.getOneById(empresa, grupocodigo, autor, codigo);

        return await this.convert(noticiaJson);

    }

    //convert
    
    static async convert(data){

        let noticia = null;

        if(Noticia.prototype.isPrototypeOf(data)){

            noticia = Mapper.noticiaToJson(data);

        }else if(typeof data == 'object'){

            const usuario = await ControlUsuario.getById(data.autor);

            const grupoproyecto = await ControlGrupo.getById(data.grupoempresa, data.grupocodigo);

            noticia = Mapper.jsonToNoticia(data,usuario,grupoproyecto);

        }

         return noticia;

    }

}

export default ControlNoticia;