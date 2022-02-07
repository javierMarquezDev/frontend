let Noticia = class News{

    constructor(codigo = null, usuario = null, grupoProyecto = null, texto = null, 
                fechaHora = null, imagenes = [], archivos = []){

        if(this.validator(codigo,usuario,grupoProyecto,texto,fechaHora) === false)
            return false;
        
        this.codigo = codigo;
        this.usuario = usuario;
        this.grupoProyecto = grupoProyecto;
        this.texto = texto;
        this.fechaHora = fechaHora;
        this.imagenes = imagenes;
        this.archivos = archivos;
        
    }

    validator(codigo, usuario, grupoProyecto, texto, fechaHora){

        if(codigo === null || usuario === null || grupoProyecto === null || texto === null || fechaHora === null)
            return false;

        return true;
    }

}

export default Noticia;