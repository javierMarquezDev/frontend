import Usuario from "../model/Usuario";
import Archivo from "../model/Archivo";
import Tarea from "../model/Tarea";
import GrupoProyecto from "../model/GrupoProyecto";
import Empresa from "../model/Empresa";
import Noticia from "../model/Noticia";
import Notificacion from "../model/Notificacion";
import Sesion from "../model/Sesion";
import Tarea from "../model/Tarea";



let Mapper = class mapper{

    static usuarioToJson(user = new Usuario()) {

        userJson = {};

        userJson.email = user.email;
        userJson.dni = user.dni;
        userJson.nombre = user.nombre;
        userJson.apellido1 = user.apellido1;
        userJson.apellido2 = user.apellido2;
        userJson.tipovia = user.tipovia;
        userJson.nombrevia = user.nombrevia;
        userJson.numvia = user.numvia;
        userJson.codigopuerta = user.codigopuerta && null;
        userJson.notificaciones = user.notificaciones && [];

        return userJson;
    }


    //Parametro de entrada tiene que ser un objeto JSON

    static jsonToUsuario(str,tareas = [], grupoProyectos = []){

        return new Usuario(
            str.email, str.contrasena, str.dni,
            str.nombre, str.apellido1, str.apellido2,
            str.tipovia, str.nombrevia, str.numvia, str.codigopuerta && null,
            str.notificaciones && [], tareas && [], grupoProyectos && []
        );

    }

    static archivoToJson(archivo = new Archivo()){

        archivoJson = {};

        archivoJson.codigo = archivo.codigo;
        archivoJson.tareacodigo =  archivo.tarea.codigo;
        archivoJson.tareacodigoproyecto = archivo.tarea.proyecto.codigoProyecto;
        archivoJson.tareaadministradorproyecto = archivo.tarea.proyecto.administrador;
        archivoJson.archivo = archivo.contenido;
        archivoJson.maxsizeKb = archivo.maxSizeKb;
        archivoJson.fileextletters = archivo.fileExtLetters;

        return archivoJson;
    }

    //Necesita un método en utils para las entidades anidadas.
    static JsonToArchivo(jsonArchivo, tarea = new Tarea()){

        return new Archivo(
            jsonArchivo.codigo, tarea, jsonArchivo.contenido,
            jsonArchivo.maxsizekb, jsonArchivo.fileextletters
        )

    }

    static empresaToJson(empresa = new Empresa()){

        empresaJson = {};

        empresaJson.nif = empresa.nif;
        empresaJson.razonsocial = empresa.razonSocial;
        empresaJson.nombre = empresa.nombre;
        empresaJson.administrador = empresa.administrador.email;
        empresaJson.tipovia = empresa.tipoVia;
        empresaJson.nombrevia = empresa.nombreVia;
        empresaJson.numvia = empresa.numVia;
        empresaJson.codigopuerta = empresa.codigoPuerta && null;

        return empresaJson;
    }

    static jsonToEmpresa(str, admin, grupoProyectos = [], usuarios = []){

        return new Empresa(
            str.nif, str.razonsocial, str.nombre,
            admin, str.tipovia, str.nombrevia,
            str.numvia, str.codigopuerta && null, grupoProyectos, 
            usuarios); 

    }

    static grupoProyectoToJson(grupo = new GrupoProyecto()){

        grupoJson = {};
        proyectoJson = {};

        grupoJson.codigo = grupo.codigoGrupo;
        grupoJson.empresa = grupo.empresa;
        grupoJson.nombre, proyectoJson.nombre = grupo.nombre;
        grupoJson.descripcion, proyectoJson.descripcion = grupo.descripcion;
        proyectoJson.fechahora = grupo.fechaHora;
        proyectoJson.finalizado = grupo.finalizado;
        proyectoJson.administrador = grupo.administrador.email;

        return [grupoJson,proyectoJson];

    }

    static jsonToGrupoProyecto(grupoJson, proyectoJson, admin, 
        empresa, usuarios = [], tareas = []){

        return new GrupoProyecto(
            grupoJson.codigo, proyectoJson.codigo,
            empresa, grupoJson.nombre, grupoJson.descripcion,
            admin, proyectoJson.fechahora, proyectoJson.finalizado,
            usuarios, tareas
        )

    }

    static noticiaToJson(noticia = new Noticia()){

        noticiaJson = {};

        noticiaJson.codigo = noticia.codigo;
        noticiaJson.autor = noticia.usuario.email;
        noticiaJson.grupocodigo = noticia.grupoProyecto.grupocodigo;
        noticiaJson.grupoempresa = noticia.grupoProyecto.empresa.nif;
        noticiaJson.texto = noticia.texto;
        noticiaJson.fechahora = noticia.fechaHora;
        noticiaJson.imagen1 = noticia.imagenes[0] && null;
        noticiaJson.imagen2 = noticia.imagenes[1] && null;
        noticiaJson.imagen3 = noticia.imagenes[2] && null;
        noticiaJson.imagen4 = noticia.imagenes[3] && null;

        return noticiaJson;

    }

    static jsonToNoticia(str, usuario, grupoProyecto){
        return new Noticia(
            str.codigo, usuario, grupoProyecto,
            str.texto, str.fechahora, 
            [str.imagen1 && null, str.imagen2  && null, 
            str.imagen3  && null, str.imagen4 && null]
        )
    }

    static notificacionToJson(notificacion = new Notificacion()){

        notiJson = {};

        notiJson.codigo = notificacion.codigo;
        notiJson.nombre = notificacion.nombre;
        notiJson.descripcion = notificacion.descripcion;
        notiJson.link = notificacion.link;

        return notiJson;
    }

    static jsonToNotificacion(str){
        return new Notificacion(
            str.codigo, str.nombre, str.descripcion,
            str.link
        )
    }

    static sesionToJson(sesion = new Sesion()){
        
        sesionJson = {};

        sesionJson.token = sesion.token;
        sesionJson.usuario = sesion.usuario.email;

        return sesionJson;
    }

    static jsonToSesion(str, usuario){
        return new Sesion(usuario, str.token);
    }

    static tareaToJson(tarea = new Tarea()){
        tareajson = {};

        tareaJson.codigo = tarea.codigo;
        tareaJson.codigoproyecto = tarea.proyecto.codigoproyecto;
        tareaJson.administradorproyecto = tarea.proyecto.administrador;
        tareaJson.nombre = tarea.nombre;
        tareaJson.descripcion = tarea.descripcion;
        tareaJson.checked = tarea.checked;
        tareaJson.fechaHora = tarea.fechaHora;
    }

    static jsonToTarea(str, grupoProyecto,usuario, archivo){
        new Tarea(str.codigo, grupoProyecto.codigoProyecto,
            usuario, str.fechahora, str.nombre, str.descripcion,
            str.checked, archivo)
    }
}

export default Mapper;