let Archivo = class File{

    constructor(codigo = null, tarea = null, contenido = null, maxSizeKb = 32000, fileExtLetters = null){

        if(this.validator(codigo,tarea,fileExtLetters) === false){
            return false;
        }

        this.codigo = codigo
        this.tarea = tarea
        this.contenido = contenido
        this.maxSizeKb = maxSizeKb
        this.fileExtLetters = fileExtLetters

        this.prototype.toString = this.tarea.nombre+"."+this.fileExtLetters;

    }

    validator(codigo,tarea,fileExtLetters){

        if(codigo === null || tarea === null || fileExtLetters === null){
            return false;
        }

        return true;

    }

}

export default Archivo;