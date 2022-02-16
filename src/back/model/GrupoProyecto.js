let GrupoProyecto = class groupProject{


    constructor(codigoGrupo = null, codigoProyecto = null, empresa = null, 
                nombre = null, descripcion = null, administrador = null, 
                fechaHora = null, finalizado = false, usuarios = [], tareas = []){

        if(this.validator(codigoGrupo,codigoProyecto,empresa,nombre,administrador) === false){
            return false;
        }

        this.codigoGrupo = codigoGrupo;
        this.codigoProyecto = codigoProyecto;
        this.empresa = empresa;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.administrador = administrador;
        this.fechaHora = fechaHora;
        this.finalizado = finalizado;
        this.usuarios = usuarios;
        this.tareas = tareas;

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