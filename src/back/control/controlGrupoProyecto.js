import GrupoProyecto from "../model/GrupoProyecto";
import Mapper from "../utils/mapper";
import ControlEmpresa from "./controlEmpresa";
import ControlUsuario from "./controlUsuario";
import SrvDaoGrupoProyecto from "../srvcDao/srvDaoGrupoProyecto";

/**
 * Clase para el control de la entidad Grupo
 */
let ControlGrupo = class controlGrupo {

    
    /**
     * Modificar un grupo existente
     * @param {GrupoProyecto} grupoProyecto
     * @returns {Object} Mensaje de confirmación
     */
    static async edit(grupoProyecto){

        if(grupoProyecto === null || !GrupoProyecto.prototype.isPrototypeOf(grupoProyecto))
            return "Información no válida."

        const grupoProyectoJson = await this.convert(grupoProyecto)

        return await SrvDaoGrupoProyecto.edit(grupoProyectoJson);

    }

    /**
     * Eliminar un grupo existente
     * @param {GrupoProyecto} grupoProyecto
     * @returns {Object} Mensaje de confirmación
     */
    static async delete(grupoProyecto){

        if(grupoProyecto === null)
            return "Información no válida."

        return await SrvDaoGrupoProyecto.delete(grupoProyecto);

    }

    /**
     * Crear un grupo
     * @param {GrupoProyecto} grupoProyecto
     * @returns {Object} Mensaje de confirmación
     */
    static async create(grupoProyecto){

        if(grupoProyecto === null || !GrupoProyecto.prototype.isPrototypeOf(grupoProyecto))
            return "Información no válida."

        const grupoProyectoJson = await this.convert(grupoProyecto);

        return await SrvDaoGrupoProyecto.create(grupoProyectoJson);

    }
    

    /**
     * Obtener grupos pertenecientes a una empresa
     * @param {GrupoProyecto} grupoProyecto
     * @returns {Object} Mensaje de confirmación
     */
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

    static async isAdmin(grupo, usuario){

        const response = await SrvDaoGrupoProyecto.isAdmin(grupo,usuario);
        
        return response.admin;

    }

    static async isMember(usuario,grupo){

        console.log(usuario,grupo)

        const response = await SrvDaoGrupoProyecto.isMember(usuario,grupo);

        console.log(response)

        if(response != null)
            return true;

        return false;

    }

    static async getAdminByGrupo(grupo){

        if(grupo == null || grupo.codigo,grupo.empresa == null || grupo.empresa.nif === null)
            return "Información no válida."

        const gruposArray = await SrvDaoGrupoProyecto.getAdminsFromGrupo(grupo);

        let resultado = [];

        gruposArray.forEach(element => {

            const usuario = ControlUsuario.convert(element);

            resultado.push(usuario);
            
        });

        return resultado;

    }

    static async getGruposByAdmin(admin){

        if(admin == null)
            return "Información no válida."

        const gruposArray = await SrvDaoGrupoProyecto.getGruposFromAdmin(admin.email);

        let resultado = [];

        gruposArray.forEach(element => {

            const empresa = this.convert(element);

            resultado.push(empresa);
            
        });

        return resultado;

    }

    static async isAdmin(usuario,grupo){

        const response = await SrvDaoGrupoProyecto.isAdmin(usuario,grupo);

        return response;

    }

    static async addUsuariosBulk(grupo,usuarios,admins){

        return await SrvDaoGrupoProyecto.addUsuariosBulk(grupo,usuarios,admins);

    }

    static async modifyUsuariosBulk(grupo,usuarios,admins){

        return await SrvDaoGrupoProyecto.modifyUsuariosBulk(grupo,usuarios,admins);

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

    /**
     * Mapear objeto de la clase Grupo para enviarlo a base de datos o viceversa
     * @param {Object} data 
     * @returns {Object} data
     */
    static convert(data){

        let grupo = null;

        if(GrupoProyecto.prototype.isPrototypeOf(data)){

            grupo = Mapper.grupoProyectoToJson(data);

        }else if(typeof data == 'object'){

            grupo = Mapper.jsonToGrupoProyecto(data);

        }

         return grupo;

    }

}

export default ControlGrupo;