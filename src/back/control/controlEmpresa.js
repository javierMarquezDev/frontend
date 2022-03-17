import Mapper from "../utils/mapper";
import SrvDaoEmpresa from "../srvcDao/srvDaoEmpresa";
import ControlUsuario from "./controlUsuario";
import ControlGrupoProyecto from "./controlGrupoProyecto";
import Empresa from "../model/Empresa";

/**
 * Clase para el control de la entidad Empresa
 */
let ControlEmpresa = class CtrlCompany{

    /**
     * Modificar una empresa existente
     * @param {Empresa} empresa 
     * @returns {Object} Mensaje de confirmación
     */
    static async edit(empresa){

        if(empresa == null || empresa == "" || empresa.nif === null || empresa.nif === "")
            return "Información no válida."

        const empresaJson = await this.convert(empresa)

        return await SrvDaoEmpresa.edit(empresaJson);

    }

    /**
     * Eliminar una empresa existente
     * @param {Empresa} empresa 
     * @returns {Object} Mensaje de confirmación
     */
    static async delete(empresa){

        if(empresa == null || empresa == "")
            return "Información no válida."

        return await SrvDaoEmpresa.delete(empresa);

    }

    /**
     * Crear una nueva empresa
     * @param {Empresa} empresa 
     * @returns {Object} Mensaje de confirmación
     */
    static async create(empresa){

        if(empresa == null || empresa == "")
            return "Información no válida."

        const empresaJson = await this.convert(empresa);

        console.log(empresaJson);

        return await SrvDaoEmpresa.create(empresaJson);

    }

    /**
     * Obtener empresas según su nombre
     * @param {String} name 
     * @returns {Array} empresas
     */
    static async getByName(name){

        if(name == null || name == "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getByName(name);

        let resultado = [];

        Array.from(empresasArray).forEach(async (element) => {

            const empresa = await this.convert(element);

            resultado.push(empresa);
            
        });

        return resultado;

    }

    /**
     * Obtener empresa según su Id (CIF)
     * @param {String} cif
     * @returns {Empresa} empresa
     */
    static async getById(nif){

        if(nif == null || nif == "")
            return "Información no válida."

        const empresaJson = await SrvDaoEmpresa.getById(nif);

        return await this.convert(await empresaJson);

    }

    /**
     * Comprobar si un usuario es administrador de una empresa
     * @param {Empresa} empresa
     * @param {Usuario} usuario
     * @returns {Boolean} respuesta
     */
    static async isAdmin(empresa, usuario){

        const response = await SrvDaoEmpresa.isAdmin(empresa,usuario);
        
        return response.admin;

    }

    /**
     * Comprobar si un usuario es miembro de una empresa
     * @param {Empresa} empresa
     * @param {Usuario} usuario
     * @returns {Boolean} respuesta
     */
    static async isMember(empresa, usuario){

        console.log(empresa,usuario)

        const response = await SrvDaoEmpresa.isMember(empresa,usuario);

        console.log(response.length)

        if(response.length)
            return true;
        
        return response;

    }

    /**
     * Asociar varios usuarios a una empresa
     * @param {Empresa} empresa
     * @param {Array} usuarios
     * @param {Array} admins
     * @returns {Object} respuesta
     */
    static async addUsuariosBulk(empresa,usuarios,admins){

        console.log(empresa,usuarios,admins)

        return await SrvDaoEmpresa.addUsuariosBulk(empresa,usuarios,admins);
        
    }

    /**
     * Modificar lista de miembros de una empresa
     * @param {Empresa} empresa
     * @param {Array} usuarios
     * @param {Array} admins
     * @returns {Object} respuesta
     */
    static async moidfyUsuariosBulk(empresa,usuarios,admins){

        return await SrvDaoEmpresa.modifyUsuariosBulk(empresa,usuarios,admins);

    }

    /**
     * Obtener lista de usuarios administradores de una empresa
     * @param {Empresa} empresa
     * @returns {Array} admins
     */
    static async getAdminByEmpresa(empresa){

        if(empresa == null || empresa.nif == null || empresa.nif === "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getAdminsByEmpresa(empresa.nif);

        let resultado = [];

        empresasArray.forEach(element => {

            const usuario = ControlUsuario.convert(element);

            resultado.push(usuario);
            
        });

        return resultado;

    }

    /**
     * Obtener lista de empresas administradas por un usuario
     * @param {Usuario} admin
     * @returns {Array} empresas
     */
    static async getEmpresaByAdmin(admin){

        if(admin == null || admin == "")
            return "Información no válida."

        const empresasArray = await SrvDaoEmpresa.getEmpresasByAdmin(admin.email);

        let resultado = [];

        empresasArray.forEach(element => {

            const empresa = ControlEmpresa.getById(element.nif)
            .then(data => {
                return data;
            })
            
            empresa = this.convert(empresa);

            resultado.push(empresa);
            
        });

        return resultado;

    }

    /**
     * Asociar un usuario a una empresa indicando si la administra
     * @param {Empresa} empresa 
     * @param {Usuario} usuario 
     * @param {Boolean} admin 
     * @returns {Object} Confirmación
     */
    static async addUsuario(empresa, usuario, admin){

        return await SrvDaoEmpresa.addUser(empresa.nif, usuario.email, admin);

    }

    /**
     * Eliminar a un usuario de la lista de miembros de una empresa
     * @param {Empresa} empresa 
     * @param {Usuario} usuario 
     * @returns {Object} Confirmación
     */
    static async deleteUsuario(empresa, usuario){

        return await SrvDaoEmpresa.deleteUser(empresa.nif, usuario.email);

    }

    
    // static async promoteUsuario(empresa, usuario){
        
    //     const response = await SrvDaoEmpresa.promoteAdmin(empresa.nif, usuario.email, true);

    //     return response;

    // }

    // static async degradeUsuario(empresa, usuario){

    //     const response = await SrvDaoEmpresa.promoteAdmin(empresa.nif, usuario.email, false);

    //     return response;

    // }

    /**
     * Obtener lista de empresas de las que forma parte un usuario
     * @param {Usuario} usuario 
     * @returns {Array} empresas
     */
    static async getEmpresasByUsuario(usuario){

        const empresasJson = await SrvDaoEmpresa.getEmpresasByUser(usuario.email);

        let empresas = [];

        empresasJson.forEach(element => empresas.push(this.convert(element)));

        return empresas;

    }

    /**
     * Obtener lista de usuarios miembros de una empresa
     * @param {Empresa} empresa
     * @returns {Array} miembros
     */
    static async getUsuariosByEmpresa(empresa){

        const usuariosJson = await SrvDaoEmpresa.getUsersByEmpresa(empresa.nif);

        let usuarios = [];

        usuariosJson.forEach(element => usuarios.push(ControlUsuario.convert(element)));

        return usuarios;
    }
    

    /**
     * Mapear objeto de la clase Empresa para enviarlo a base de datos o viceversa
     * @param {Object} data 
     * @returns {Object} data
     */
    static convert(data){

        let empresa = null;

        if(Empresa.prototype.isPrototypeOf(data)){

            empresa = Mapper.empresaToJson(data);
            

        }else if(typeof data == 'object'){

            empresa = Mapper.jsonToEmpresa(data);

        }

         return empresa;

    }

}

export default ControlEmpresa;