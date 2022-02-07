let Tarea = class Task{

    constructor(codigo = null, proyecto = null, usuario = null, 
                fechaHora = null, nombre = null, descripcion = null, 
                checked = false, archivo = null){

        if(this.validator(codigo,proyecto,usuario,nombre) === false)
            return false;
            
        this.codigo = codigo;
        this.proyecto = proyecto
        this.usuario = usuario
        this.fechaHora = fechaHora
        this.nombre = nombre
        this.descripcion = descripcion
        this.checked = checked
        this.archivo = archivo
    }

    validator(codigo, proyecto,usuario,nombre){
        if(codigo === null || proyecto === null || usuario === null || nombre === null)
            return false;
        return true;
    }

}

export default Tarea;