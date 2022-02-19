let Notificacion = class Notification{

    constructor(codigo = null, nombre = null, descripcion = null, link = null){

        if(this.validator(nombre) === false)
            return false;

        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.link = link;

    }

    validator(nombre){
        if(nombre === null)
            return false;
        
        return true;
    }

}

export default Notificacion;