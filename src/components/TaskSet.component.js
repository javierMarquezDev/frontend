import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

class TaskSet extends React.Component{
    render(){
      return(
        <Box id="tasks" sx={{
              boxShadow:3,
              height:"85vh",
              p:1,
              ml:0.5,
              mt:"50px",
              width:"29.5%",
              overflowY:"scroll"
            }}
            position="fixed">
            
            <Stack sx={{m:0,p:0}}>
              {this.props.list.map((task)=>{
                
                      return(<Box 
                      sx={{
                      bgcolor:"#ddd",
                      borderRadius:"2%",
                      width:"94%",
                      height:"fit-content",
                      p:1,
                      ml:1,
                      mt:1
                      }}>
                            <Box display="flex"
                            alignItems="flex-start"
                            sx={{width:"100", ml:1, mt:1}}>
                              <span>{task.nombre}</span>
                            </Box>
  
                            <Box display="flex"
                            alignItems="flex-start"
                            sx={{width:"100", ml:1, mt:1, fontSize:11}}>
                              <span>{task.descripcion}</span>
                            </Box>
  
                            <Box display="flex"
                            alignItems="flex-start"
                            sx={{width:"100", ml:1, mt:1, fontSize:9}}>
                              <span>{task.fechahora}</span>
                            </Box>
  
                            <Box
                            display="flex"
                            alignItems="flex-start"
                            sx={{width:"100"}}>
                              <Button>Terminar</Button>
                            </Box>
  
                      </Box>)
  
              })}
              
            </Stack>
        </Box>
      );
    };
  }

  
  export default TaskSet;