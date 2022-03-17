let Empresa = class Company{

    constructor(nif = null, razonSocial = null, nombre = null, 
                nombreVia = null, numVia = null, codigoPuerta = null, localidad = null, 
                provincia = null, grupoProyectos = []/*, usuarios = []*/){

        this.nif = nif
        this.razonSocial = razonSocial
        this.nombre = nombre
        this.nombreVia = nombreVia
        this.numVia = numVia
        this.codigoPuerta = codigoPuerta
        this.localidad = localidad;
        this.provincia = provincia;
        this.grupoProyectos = grupoProyectos
        //this.usuarios = usuarios

    }

    validator(nif = null, razonSocial = null, nombre = null, administrador = null,
            nombreVia = null, numVia = null){

            if(nif === null || razonSocial === null || nombre === null || administrador === null ||
                nombreVia === null || numVia === null){
                    return false;
            }

            return true;
    }

}

export default Empresa;