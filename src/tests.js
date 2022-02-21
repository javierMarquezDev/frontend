import {Button} from "@mui/material";
import ControlUsuario from "./back/control/controlUsuario";
import Usuario from "./back/model/Usuario";
import Notificacion from './back/model/Notificacion';
import ControlSesion from './back/control/controlSesion';
import Empresa from './back/model/Empresa';
import ControlEmpresa from './back/control/controlEmpresa';
import ControlGrupo from './back/control/controlGrupoProyecto';
import GrupoProyecto from './back/model/GrupoProyecto';
import Noticia from './back/model/Noticia';
import ControlNoticia from './back/control/controlNoticia';
import Tarea from './back/model/Tarea';
import ControlTarea from './back/control/controlTarea';
import Archivo from './back/model/Archivo';
import ControlArchivo from './back/control/controlArchivo';


<div>
      <Button variant="outlined" onClick={
        async ()=>{

          //let usuario = new Usuario("higo@gmail.com","abc123.","34022039W","Rodrigo","Díaz","de Vivar","C./","Hernani","47", "1D");
          const email = "higo@gmail.com";
          const pass = "abc123.";

          console.log(await ControlSesion.createSesion(email,pass)); 

        }
      }> login </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          //let usuario = new Usuario("higo@gmail.com","abc123.","34022039W","Rodrigo","Díaz","de Vivar","C./","Hernani","47", "1D");
          const email = "higo@gmail.com";
          const pass = "abc123.";

          console.log(await ControlSesion.destroySesion()); 

        }
      }> logout </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let usuario = new Usuario("higo@gmail.com","abc123.","84219583T","Rodrigo","Díaz","de Vivar","C./","Oviedo","47", "1D");

          console.log(await ControlUsuario.edit(usuario))

        }
      }> editar pardillo </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let usuario = new Usuario("higo@gmail.com","abc123.","84219583T",null,null,"de Vivar","C./","Oviedo","47", "1D");

          console.log(await ControlUsuario.delete(usuario))

        }
      }> eliminar pardillo </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let email = "pacheco@gmail.com"

          console.log(await ControlUsuario.getById(email));

        }
      }> getById (higo@gmail.com) </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let grupocodigo = "13"
          let grupoempresa = "79934734B";

          console.log(await ControlUsuario.getByProyecto(grupocodigo,grupoempresa));

        }
      }> getByProyecto (higo@gmail.com) </Button>

      <Button variant="outlined" onClick={
        async ()=>{


          let ntf = new Notificacion(null,"Nueva tarea","Tus muertos","www.vivadios.com");

          console.log(ntf);

          console.log(await ControlUsuario.createNtf("higo@gmail.com",ntf));

        }
      }> createNotification (higo@gmail.com) </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlUsuario.deleteNtf(4,"higo@gmail.com"));

        }
      }> deleteNotification (higo@gmail.com) </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlUsuario.getNtf("higo@gmail.com"));

        }
      }> getAllNtf (higo@gmail.com) </Button>
      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlUsuario.getOneNtf("higo@gmail.com",7));

        }
      }> getOneNtf (higo@gmail.com) </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let usuario = await ControlUsuario.getById("higo@gmail.com");

          let empresa = new Empresa("E90671611","BenataeSCA","Aceites Benatae",
          usuario, "C./","del Darro",33, "2B",[]);

          console.log(empresa);

          console.log(await ControlEmpresa.create(empresa));

        }
      }> Crear empresa </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let cif = "E90671611";

          console.log(await ControlEmpresa.delete(cif));

        }
      }> Eliminar empresa </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let usuario = await ControlUsuario.getById("higo@gmail.com");

          let empresa = new Empresa("E90671611","Benatae SA.","Benatae Aceites",
          usuario, "C./","del Darro",33, "2B",[]);

          console.log(await ControlEmpresa.edit(empresa));

        }
      }> Editar empresa </Button>

    <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlEmpresa.getByName(null));

        }
      }> getByName (Benatae) </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlEmpresa.getById("E90671611"));

        }
      }> getById (Benatae) </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlEmpresa.getByAdmin("higo@gmail.com"));

        }
      }> getByAdmin (higo@gmail.com) </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let admin = await ControlUsuario.getById("higo@gmail.com");
          let empresa = new Empresa("E90671611","Benatae SA.","Benatae Aceites",
          admin, "C./","del Darro",33, "2B",[]);
    
          let fechaHora = new Date(2023,2,3);

          let grupo = await new GrupoProyecto(null,empresa,"Bienvenida","Organizar bienvenida RRHH",admin,
          fechaHora,false);

          console.log(await ControlGrupo.create(grupo));

        }
      }> create grupoProyecto </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let admin = await ControlUsuario.getById("higo@gmail.com");
          let empresa = new Empresa("E90671611","Benatae SA.","Benatae Aceites",
          admin, "C./","del Darro",33, "2B",[]);
    
          let fechaHora = new Date(2023,2,3);

          let grupo = await new GrupoProyecto(17,empresa,"Bienvenida","Organizar bienvenida RRHH",admin,
          fechaHora,false);

          console.log(await ControlGrupo.edit(grupo));

        }
      }> edit grupoProyecto </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let admin = await ControlUsuario.getById("higo@gmail.com");
          let empresa = new Empresa("E90671611","Benatae SA.","Benatae Aceites",
          admin, "C./","del Darro",33, "2B",[]);
    
          let fechaHora = new Date(2023,2,3);

          let grupo = await new GrupoProyecto(16,empresa,"Bienvenida","Organizar bienvenida RRHH",admin,
          fechaHora,false);

          console.log(await ControlGrupo.delete(grupo));

        }
      }> delete grupoProyecto </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlGrupo.getFromEmpresa("E90671611",));

        }
      }> get Grupo from empresa </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlGrupo.getFromUsuario("higo@gmail.com"));

        }
      }> get Grupo from user </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlGrupo.getById("E90671611",18));

        }
      }> get Grupo from id </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2022,0,2)

          

          let noticia = new Noticia(null, user, grupo, "¿Cómo vamos?", fecha);

          console.log(noticia);

          console.log(await ControlNoticia.create(noticia));

        }
      }> create noticia </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2023,0,2)

          

          let noticia = new Noticia(15, user, grupo, "Fatal gracias", fecha);

          console.log(await ControlNoticia.edit(noticia));

        }
      }> edit noticia </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2023,0,2)

          let noticia = new Noticia(15, user, grupo, "Fatal gracias", fecha);

          console.log(await ControlNoticia.delete(noticia));

        }
      }> delete noticia </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlNoticia.getById("E90671611",18, "higo@gmail.com",16));

        }
      }> getById noticia</Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlNoticia.getByUsuario("E90671611",18,"higo@gmail.com"));
        }
      }> noticia getByUser </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlNoticia.getByGrupo("E90671611",18));

        }
      }> noticia getByGroup </Button>





      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2022,0,2)

          console.log(grupo);

          let tarea = new Tarea(null, grupo,fecha,"Hacer lista de tareas","Hacer lista de tareas de hacer lista de tareas",
          false, user);

          console.log(await ControlTarea.create(tarea));

        }
      }> create tarea </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2022,0,2)

          console.log(grupo);

          let tarea = new Tarea(8, grupo,fecha,"Hacer lista","Hacer lista de tareas",
          false, user);

          console.log(await ControlTarea.edit(tarea));


        }
      }> edit tarea </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2022,0,2)

          console.log(grupo);

          let tarea = new Tarea(8, grupo,fecha,"Hacer lista","Hacer lista de tareas",
          false, user);

          console.log(await ControlTarea.delete(tarea));

        }
      }> delete tarea </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlTarea.getById("E90671611",18,9));

        }
      }> getById tarea</Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlTarea.getFromUsuario("higo@gmail.com"));
        }
      }> tarea getByUser </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlTarea.getFromGrupo("E90671611",18));

        }
      }> tarea getByGroup </Button>







<Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2022,0,2)
          let tarea = new Tarea(9, grupo,fecha,"Hacer lista de tareas","Hacer lista de tareas de hacer lista de tareas",
          false, user)

          let archivo = new Archivo(null, tarea, null, 2000, "jpg");

          console.log(await ControlArchivo.create(archivo));

        }
      }> create archivo </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2022,0,2)
          let tarea = new Tarea(9, grupo,fecha,"Hacer lista de tareas","Hacer lista de tareas de hacer lista de tareas",
          false, user)

          let archivo = new Archivo(1, tarea, null, 2000, "png");

          console.log(await ControlArchivo.edit(archivo));
        }
      }> edit archivo </Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2022,0,2)
          let tarea = new Tarea(9, grupo,fecha,"Hacer lista de tareas","Hacer lista de tareas de hacer lista de tareas",
          false, user)

          let archivo = new Archivo(1, tarea, null, 2000, "png");

          console.log(await ControlArchivo.delete(archivo));

        }
      }> delete archivo</Button>

      <Button variant="outlined" onClick={
        async ()=>{

          console.log(await ControlArchivo.getById("E90671611",18,9,2));

        }
      }> getById archivo</Button>

      <Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let grupo = await ControlGrupo.getById("E90671611",18);
          let fecha = new Date(2022,0,2)
          let tarea = new Tarea(9, grupo,fecha,"Hacer lista de tareas","Hacer lista de tareas de hacer lista de tareas",
          false, user)

          console.log(await ControlArchivo.getByTarea(tarea));
        }
      }> getByTarea archivo </Button>


<Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let empresa = await ControlEmpresa.getById("E90671611")

          console.log(await ControlEmpresa.addUsuario(empresa,user,true));
        }
      }> añadir usuario a empresa</Button>

<Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let empresa = await ControlEmpresa.getById("E90671611")

          console.log(await ControlEmpresa.deleteUsuario(empresa,user));
        }
      }> quitar usuario de empresa</Button>

<Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let empresa = await ControlEmpresa.getById("E90671611")

          console.log(await ControlEmpresa.getUsuariosByEmpresa(empresa));
        }
      }> buscar usuarios de empresa</Button>

<Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let empresa = await ControlEmpresa.getById("E90671611")

          console.log(await ControlEmpresa.getEmpresasByUsuario(user));
        }
      }> buscar empresas de usuario</Button>

<Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let empresa = await ControlEmpresa.getById("E90671611")

          console.log(await ControlEmpresa.getEmpresaByAdmin(user));
        }
      }> buscar empresas de admin</Button>

<Button variant="outlined" onClick={
        async ()=>{

          let user = await ControlUsuario.getById("higo@gmail.com");
          let empresa = await ControlEmpresa.getById("E90671611")

          console.log(await ControlEmpresa.getAdminByEmpresa(empresa));
        }
      }> buscar admins de empresa</Button>

      



















<Button variant="outlined" onClick={
        ()=>{console.clear()}
      }> CLEAR </Button>
      </div>
      
  
      
