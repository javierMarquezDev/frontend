import { Link } from "react-router-dom";
import {Container, Stack} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from "@mui/system";

const handleClick = (ntf)=>{

}

const NotificationList = () => {
    const notificaciones = [
        {codigo:1, nombre:"Nueva tarea", descripcion:"Nueva tarea en RRHH", link:"/grupos/"},
        {codigo:2, nombre:"Nueva tarea", descripcion:"Nueva tarea en RRHH", link:"/grupos/"},
        {codigo:3, nombre:"Nueva tarea", descripcion:"Nueva tarea en RRHH", link:"/grupos/"},
        {codigo:4, nombre:"Nueva tarea", descripcion:"Nueva tarea en RRHH", link:"/grupos/"},
        {codigo:5, nombre:"Nueva tarea", descripcion:"Nueva tarea en RRHH", link:"/grupos/"},
        {codigo:6, nombre:"Nueva tarea", descripcion:"Nueva tarea en RRHH", link:"/grupos/"}
    ]
    const usuario = {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"}

    return ( <Container sx={{height:300, width:700, margin:"auto"}}>

        <Box marginTop={1}>
            <Typography variant="h4" align="left">Tus notificaciones</Typography>
        </Box>

        <Stack spacing={2} marginTop={3}>
        {notificaciones.map((ntf)=>{
            return(
                <Card>
                    <CardContent>
                        <Typography align="left" sx={{fontWeight:"bold"}}>{ntf.nombre}</Typography>
                        <Typography align="left">{ntf.descripcion}</Typography>
                        <Typography align="left"><Link to={ntf.link} align="left">Ver</Link></Typography>
                        
                    </CardContent>
                    <CardActions sx={{flexDirection:"row-reverse"}}>
                        <Button onClick={()=>{handleClick(ntf)}} variant="contained">
                            <Typography sx={{fontSize:12}}>Descartar</Typography>
                        </Button>
                    </CardActions>
                </Card>
            );
        })}
        </Stack>
    </Container> );
}
 
export default NotificationList;