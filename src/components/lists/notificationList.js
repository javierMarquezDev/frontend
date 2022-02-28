import { Link } from "react-router-dom";
import {Container, Stack} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ControlUsuario from "../../back/control/controlUsuario";

const handleClick = (ntf)=>{

}

const NotificationList = () => {
    
    const usuario = {email:"higo@gmail.com", nombre:"Rodrigo", apellido1: "Díaz", apellido2: "de Vivar", dni:"77378971W", tipovia:"C./", nombrevia:"Andrés Segovia", numvia:"15"}
    const [notificaciones,setNotificaciones] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        
        const abortCont = new AbortController();

        setTimeout(()=>{
            ControlUsuario.getNtf(usuario)
            .then(data=>{
                
                setNotificaciones(data);
                setIsPending(false);
                
            })
        }, 1000)

        return abortCont.abort();

    }, [usuario]);

    return ( <Container sx={{height:300, width:700, margin:"auto"}}>

        <Box marginTop={1}>
            <Typography variant="h4" align="left">Tus notificaciones</Typography>
        </Box>

        { isPending && <Typography variant="h6" sx={{color:"text.secondary"}}>Cargando...</Typography> }
        {notificaciones && <InfoNtfs ntfs={notificaciones}/> }
    </Container> );
}

const InfoNtfs = props =>{

    const ntfs = props.ntfs;

    return (
        <Stack spacing={2} marginTop={3}>
        {ntfs.map((ntf)=>{
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
    )

}

export default NotificationList;