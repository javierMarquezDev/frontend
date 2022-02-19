let GrupoProyecto = class groupProject{


    constructor(codigoGrupo = null, empresa = null, 
                nombre = null, descripcion = null, administrador = null, 
                fechaHora = null, finalizado = false, usuarios = []){

        this.codigo = codigoGrupo;
        this.empresa = empresa;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.administrador = administrador;
        this.fechaHora = fechaHora;
        this.finalizado = finalizado;
        this.usuarios = usuarios;

    }

    validator(codigoGrupo, codigoProyecto, empresa, nombre, administrador){

        if(codigoGrupo === null || codigoProyecto === null || empresa === null ||
            nombre === null || administrador === null){
            
            return false;
        }

        return true;
    }

}

export default GrupoProyecto;