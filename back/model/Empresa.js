let Empresa = class Company{

    constructor(nif = null, razonSocial = null, nombre = null, 
                administrador = null, tipoVia = null, 
                nombreVia = null, numVia = null, codigoPuerta = null,
                grupoProyectos = [], usuarios = []){

        if(this.validator(nif,razonSocial,nombre,administrador,tipoVia,nombreVia,numVia) === false){
            return false;
        }

        this.nif = nif
        this.razonSocial = razonSocial
        this.nombre = nombre
        this.administrador = administrador
        this.tipoVia = tipoVia
        this.nombreVia = nombreVia
        this.numVia = numVia
        this.codigoPuerta = codigoPuerta
        this.grupoProyectos = grupoProyectos
        this.usuarios = usuarios

        this.prototype.toString = () => this.razonSocial;

    }

    validator(nif = null, razonSocial = null, nombre = null, administrador = null,
            tipoVia = null, nombreVia = null, numVia = null){

            if(nif === null || razonSocial === null || nombre === null || administrador === null ||
                tipoVia === null || nombreVia === null || numVia === null){
                    return false;
            }

            return true;
    }

}

export default Empresa;