import Usuario from "../model/Usuario";
import Archivo from "../model/Archivo";
import Tarea from "../model/Tarea";
import GrupoProyecto from "../model/GrupoProyecto";
import Empresa from "../model/Empresa";
import Noticia from "../model/Noticia";
import Sesion from "../model/Sesion";



let Mapper = class mapper{

    static usuarioToJson(user = new Usuario()) {

        let userJson = {};

        userJson.email = user.email;
        userJson.dni = user.dni;
        userJson.contrasena = user.contrasena;
        userJson.nombre = user.nombre;
        userJson.apellido1 = user.apellido1;
        userJson.apellido2 = user.apellido2;
        userJson.nombrevia = user.nombrevia;
        userJson.numvia = user.numvia;
        userJson.codigopuerta = user.codigoPuerta || '';
        userJson.localidad = user.localidad;
        userJson.provincia = user.provincia;
        userJson.notificaciones = user.notificaciones && {};

        return userJson;
    }


    //Parametro de entrada tiene que ser un objeto JSON

    static jsonToUsuario(str){

        return new Usuario(
            str.email, str.contrasena, str.dni,
            str.nombre, str.apellido1, str.apellido2,
            str.nombrevia, str.numvia, str.codigopuerta || null, str.notificaciones && [],
            str.localidad, str.provincia
        );

    }

    static archivoToJson(archivo = new Archivo()){

        let archivoJson = {};

        archivoJson.codigo = archivo.codigo;
        archivoJson.tareacodigo =  archivo.tarea.codigo;
        archivoJson.tareagrupocodigo = archivo.tarea.grupo.codigo;
        archivoJson.tareagrupoempresa = archivo.tarea.grupo.empresa.nif;
        archivoJson.archivo = archivo.contenido;
        archivoJson.maxsizekb = archivo.maxSizeKb;
        archivoJson.fileextletters = archivo.fileExtLetters;

        return archivoJson;
    }

    //Necesita un método en utils para las entidades anidadas.
    static jsonToArchivo(jsonArchivo, tarea = new Tarea()){

        return new Archivo(
            jsonArchivo.codigo, tarea, jsonArchivo.contenido,
            jsonArchivo.maxsizekb, jsonArchivo.fileextletters
        )

    }

    static empresaToJson(empresa = new Empresa()){

        let empresaJson = {};

        empresaJson.nif = empresa.nif;
        empresaJson.razonsocial = empresa.razonSocial;
        empresaJson.nombre = empresa.nombre;
        empresaJson.nombrevia = empresa.nombreVia;
        empresaJson.numvia = empresa.numVia;
        empresaJson.codigopuerta = empresa.codigoPuerta;
        empresaJson.localidad = empresa.localidad;
        empresaJson.provincia = empresa.provincia;

        return empresaJson;
    }

    static jsonToEmpresa(str, admin, grupoProyectos = [], usuarios = []){

        return new Empresa(
            str.nif, str.razonsocial, str.nombre, str.nombrevia,
            str.numvia, str.codigopuerta, str.localidad, str.provincia, grupoProyectos);  

    }

    static grupoProyectoToJson(grupo = new GrupoProyecto()){

        let grupoJson = {};

        grupoJson.codigo = grupo.codigo;
        grupoJson.empresa = (grupo.empresa != null)?grupo.empresa.nif:null;
        grupoJson.nombre = grupo.nombre;
        grupoJson.descripcion= grupo.descripcion;
        try{ grupoJson.fechahora =  grupo.fechaHora.toISOString()}catch(e){
            delete grupoJson.fechahora
        }
        grupoJson.finalizado = grupo.finalizado;
        grupoJson.administrador = (grupo.administrador != null)?grupo.administrador.email:null;

        return grupoJson;

    }

    static jsonToGrupoProyecto(grupoJson){

        let grupo = null

        try
        {grupo = new GrupoProyecto(
            grupoJson.codigo, 
            {nif:grupoJson.empresa}, grupoJson.nombre, grupoJson.descripcion,
            {email:grupoJson.administrador}, this.parseISOString(grupoJson.fechahora), grupoJson.finalizado
        )}
        catch(e){
            grupo = new GrupoProyecto(grupoJson.codigo, 
            {nif:grupoJson.empresa}, grupoJson.nombre, grupoJson.descripcion,
            {email:grupoJson.administrador}, null, grupoJson.finalizado)
        }

        return grupo;

    }

    static noticiaToJson(noticia){

        let noticiaJson = {};

        noticiaJson.codigo = noticia.codigo || '';
        noticiaJson.autor = noticia.usuario.email;
        noticiaJson.grupocodigo = noticia.grupoProyecto.codigo;
        noticiaJson.grupoempresa = noticia.grupoProyecto.empresa.nif;
        noticiaJson.texto = noticia.texto;
        noticiaJson.fechahora = noticia.fechaHora.toISOString();
        noticiaJson.imagen1 = noticia.imagenes[0] && null;
        noticiaJson.imagen2 = noticia.imagenes[1] && null;
        noticiaJson.imagen3 = noticia.imagenes[2] && null;
        noticiaJson.imagen4 = noticia.imagenes[3] && null;

        console.log(noticiaJson)

        return noticiaJson;

    }

    static jsonToNoticia(str){
        return new Noticia(
            str.codigo, {email:str.autor}, {codigo: str.grupocodigo, empresa:{nif:str.grupoempresa}},
            str.texto, this.parseISOString(str.fechahora) , 
            [str.imagen1 && null, str.imagen2  && null, 
            str.imagen3  && null, str.imagen4 && null]
        )
    }

    static sesionToJson(sesion = new Sesion()){
        
        let sesionJson = {};

        sesionJson.token = sesion.token;
        sesionJson.usuario = sesion.usuario.email;

        return sesionJson;
    }

    static jsonToSesion(str, usuario){
        return new Sesion(usuario, str.token);
    }

    static tareaToJson(tarea = new Tarea()){
        let tareaJson = {};

        tareaJson.codigo = tarea.codigo;
        tareaJson.grupocodigo = tarea.grupo.codigo;
        tareaJson.grupoempresa = tarea.grupo.empresa;
        tareaJson.nombre = tarea.nombre;
        tareaJson.descripcion = tarea.descripcion;
        tareaJson.checked = tarea.checked;
        tareaJson.fechahora = tarea.fechaHora.toISOString();
        tareaJson.usuario = tarea.atareado.email;

        return tareaJson;
    }

    static jsonToTarea(str){
        return new Tarea(str.codigo, {codigo:str.grupocodigo,empresa:str.grupoempresa},
            this.parseISOString(str.fechahora), str.nombre, str.descripcion,
            str.checked, {email:str.usuario})
    }

    static parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
      }
}

export default Mapper;