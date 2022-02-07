let Notificacion = class Notification{

    constructor(codigo = null, nombre = null, descripcion = null, link = null){

        if(this.validator(codigo,nombre) === false)
            return false;

        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.link = link;

    }

    validator(codigo, nombre){
        if(codigo === null || nombre === null)
            return false;
        
        return true;
    }

}

export default Notificacion;