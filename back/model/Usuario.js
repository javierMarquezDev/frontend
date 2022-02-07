let Usuario = class User {

    //Constructor genérico
    constructor(email = null, contrasena = null, dni = null, nombre = null, apellido1 = null, apellido2 = null, 
                tipovia = null, nombrevia = null, numvia = null, codigoPuerta = null,
                notificaciones = [], tareas = [], grupoProyectos = []){
        
        if(this.validator(email,dni,nombre,apellido1,tipovia,nombrevia,numvia,notificaciones === false)){
            return false;
        }

        this.email = email;
        this.contrasena = contrasena;
        this.dni = dni;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.tipovia = tipovia;
        this.nombrevia = nombrevia;
        this.numvia = numvia;
        this.codigoPuerta = codigoPuerta;
        this.notificaciones = notificaciones;
        this.tareas = tareas;
        this.grupoProyectos = grupoProyectos;

        this.prototype.toString = function(){nombre + " " + apellido1 + " " + apellido1};

    }

    //Validador ¿tipado?
    validator(email = null, dni = null, nombre = null, apellido1 = null, 
        tipovia = null, nombrevia = null, numvia = null,
        notificaciones = null){

            if(email === null || dni === null || nombre === null || apellido1 === null || tipovia === null ||
                nombrevia === null || numvia === null || notificaciones === null){
                    return false;
            }

            return true;

    }

}

export default Usuario;