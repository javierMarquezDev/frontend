let Tarea = class Task{

    constructor(codigo = null, proyecto = null, 
                fechaHora = null, nombre = null, descripcion = null, 
                checked = false, archivo = null, atareado = null){

        if(this.validator(codigo,proyecto,atareado,nombre) === false)
            return false;
            
        this.codigo = codigo;
        this.grupo = proyecto
        this.fechaHora = fechaHora
        this.nombre = nombre
        this.descripcion = descripcion
        this.checked = checked
        this.archivo = archivo
        this.atareado = atareado
    }

    validator(codigo, proyecto,nombre){
        if(codigo === null || proyecto === null || nombre === null)
            return false;
        return true;
    }

}

export default Tarea;