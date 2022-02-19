let Tarea = class Task{

    constructor(codigo = null, proyecto = null, 
                fechaHora = null, nombre = null, descripcion = null, 
                checked = false, atareado = null){
            
        this.codigo = codigo;
        this.grupo = proyecto
        this.fechaHora = fechaHora
        this.nombre = nombre
        this.descripcion = descripcion
        this.checked = checked
        this.atareado = atareado
    }

    validator(codigo, proyecto,nombre){
        if(codigo === null || proyecto === null || nombre === null)
            return false;
        return true;
    }

}

export default Tarea;