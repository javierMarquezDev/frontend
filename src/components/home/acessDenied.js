import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const AccessDenied = () => {

    const [response,setResponse] = useState("");

    useEffect(() => {
        setTimeout(()=>{
            setResponse(<Typography variant="h4">Página no encontrada.</Typography>)
        },1000)
    }, []);

    return (

        <Box>
            {
                response
            }
        </Box>
         
    );
}
 
export default AccessDenied;