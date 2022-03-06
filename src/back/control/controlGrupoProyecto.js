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

        if(grupoProyecto === null)
            return "Información no válida."

        return await SrvDaoGrupoProyecto.delete(grupoProyecto);

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

        Array.from(gruposJson).forEach(element => {

            const grupo = this.convert(element);

            result.push(grupo);
            
        });

        return result;

    }

    static async getUsuariosFromGrupo(grupo){

        const response = await SrvDaoGrupoProyecto.getUsuariosFromGrupo(grupo);

        let result = [];

        response.forEach(element =>{
            const usuario = ControlUsuario.convert(element);

            result.push(usuario);
        })

        return result;

    }

    static async getById(empresa, codigo){

        if(empresa === "" || empresa === null || codigo === "" || codigo === null)
            return "Información no válida."

        const grupoJson = await SrvDaoGrupoProyecto.getOneById(empresa,codigo);

        return await this.convert(grupoJson);

    }

    static async isMember(usuario,grupo){

        console.log(usuario,grupo)

        const response = await SrvDaoGrupoProyecto.isMember(usuario,grupo);

        console.log(response)

        if(response != null)
            return true;

        return false;

    }

    static async addUsuariosBulk(grupo,usuarios){

        return await SrvDaoGrupoProyecto.addUsuariosBulk(grupo,usuarios);

    }

    static async modifyUsuariosBulk(grupo,usuarios){

        return await SrvDaoGrupoProyecto.modifyUsuariosBulk(grupo,usuarios);

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

    static async addUser(email, grupocodigo, grupoempresa){

        const response = await SrvDaoGrupoProyecto.addUsuario(email,grupocodigo,grupoempresa);

        return response;

    }

    static async deleteUser(email, grupocodigo, grupoempresa){

        const response = await SrvDaoGrupoProyecto.removeUsuario(email,grupocodigo,grupoempresa);

        return response;

    }

    static async promoteUsuario(email, grupocodigo, grupoempresa){

    }

    static async degradeUsuario(email, grupocodigo, grupoempresa){
        
    }

    //convert

    
    static convert(data){

        let grupo = null;

        if(GrupoProyecto.prototype.isPrototypeOf(data)){

            grupo = Mapper.grupoProyectoToJson(data);

        }else if(typeof data == 'object'){
;

            //const usuariosJson = await ControlUsuario.getByProyecto(data.codigo,data.empresa);

            //Array.from(usuariosJson).forEach(element => { usuarios.push(element) });

            grupo = Mapper.jsonToGrupoProyecto(data);

        }

         return grupo;

    }

}

export default ControlGrupo;