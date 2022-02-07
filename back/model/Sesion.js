let Sesion = class Session{

    constructor(usuario = null, token = null){

        if(this.validator(usuario,token) === false)
            return false;

        this.usuario = usuario;
        this.token = token;

    }

    validator(usuario, token){

        if(usuario === null || token === null)
            return false
        
        return true;

    }

}

export default Sesion;