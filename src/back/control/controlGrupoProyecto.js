import GrupoProyecto from "../model/GrupoProyecto";
import Mapper from "../utils/mapper";
import ControlEmpresa from "./controlEmpresa";
import ControlUsuario from "./controlUsuario";
import SrvDaoGrupoProyecto from "../srvcDao/srvDaoGrupoProyecto";
let ControlGrupo = class controlGrupo {

    
    static async edit(grupoProyecto){

        if(grupoProyecto === null || !GrupoProyecto.prototype.isPrototypeOf(grupoProyecto))
            return "Información no válida."

        const grupoProyectoJson = await this.convert(grupoProyecto)

        return await SrvDaoGrupoProyecto.edit(grupoProyectoJson);

    }

    static async delete(grupoProyecto){

        if(grupoProyecto === null || !GrupoProyecto.prototype.isPrototypeOf(grupoProyecto))
            return "Información no válida."

        const grupoProyectoJson = await this.convert(grupoProyecto);

        return await SrvDaoGrupoProyecto.delete(grupoProyectoJson);

    }

    static async create(grupoProyecto){

        if(grupoProyecto === null || !GrupoProyecto.prototype.isPrototypeOf(grupoProyecto))
            return "Información no válida."

        const grupoProyectoJson = await this.convert(grupoProyecto);

        return await SrvDaoGrupoProyecto.create(grupoProyectoJson);

    }
    
    //get

    static async getFromEmpresa(nif){

        const gruposJson = await SrvDaoGrupoProyecto.getAllFromEmpresa(nif);

        let result = [];

        Array.from(gruposJson).forEach(async (element) => {

            const grupo = await this.convert(element);

            result.push(grupo);
            
        });

        return result;

    }

    static async getFromUsuario(email){

        if(email === "" || email === null)
            return "Información no válida."

        const gruposJson = await SrvDaoGrupoProyecto.getAllFromUsuario(email);

        let result = [];

        Array.from(gruposJson).forEach(async (element) => {

            const grupo = await this.convert(element);

            result.push(grupo);
            
        });

        return result;

    }

    static async getById(empresa, codigo){

        if(empresa === "" || empresa === null || codigo === "" || codigo === null)
            return "Información no válida."

        const grupoJson = await SrvDaoGrupoProyecto.getOneById(empresa,codigo);

        return await this.convert(grupoJson);

    }

    static async getByFin(fin = false){

        const gruposJson = await SrvDaoGrupoProyecto.getAllByFin(fin);

        let result = [];

        Array.from(gruposJson).forEach(async (element) => {

            const grupo = await this.convert(element);

            result.push(grupo);
            
        });

        return result;

    }

    //convert

    
    static async convert(data){

        let grupo = null;

        if(GrupoProyecto.prototype.isPrototypeOf(data)){

            grupo = Mapper.grupoProyectoToJson(data);

        }else if(typeof data == 'object'){

            const admin = await ControlUsuario.getById(data.administrador);
            const empresa = await ControlEmpresa.getById(data.empresa);
            const usuarios = [];

            //const usuariosJson = await ControlUsuario.getByProyecto(data.codigo,data.empresa);

            //Array.from(usuariosJson).forEach(element => { usuarios.push(element) });

            grupo = Mapper.jsonToGrupoProyecto(data,admin,empresa,[]);

        }

         return grupo;

    }

}

export default ControlGrupo;