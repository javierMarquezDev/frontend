import './App.css';
import {Button} from "@mui/material";
import ControlUsuario from "./back/control/controlUsuario";
import Usuario from "./back/model/Usuario";

function App() {
  return (
    <div className="App">

      <Button variant="outlined" onClick={
        async ()=>{

          let usuario = new Usuario("higo@gmail.com","abc123.","34022039W","Rodrigo","Díaz","de Vivar","C./","Hernani","47", "1D");

          await ControlUsuario.create(usuario); 

        }
      }> crear pardillo </Button>

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
      
    </div>
  );
}

export default App;
