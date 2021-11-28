import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

class NoticiaSet extends React.Component{
    render(){
      return(
        <Stack spacing={0.2}  alignItems="flex-start" sx={{fontSize:12}} id = "stack">
  
        {this.props.list.map((post)=>{
              return (<Box sx={{
                p: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridTemplateRows: 'auto',
                gridTemplateAreas: `"image name name name name name name"
                "image title title title title title title"
                "image content content content content content content"
                ". . . . footer footer footer"`,
                boxShadow: 3,
                borderRadius:'1%',
                width:'98%'
              }}>
                <Box sx={{ gridArea: 'image', p: 0.5, justifyContent:'center'}}>
                  <Paper sx={{borderRadius:'50%',
                width:'70px',
                height:'70px',
                display:'block'}}>
                      <img src="public/logo512.png"></img>
                  </Paper>
          
                </Box>
                <Box sx={{ gridArea: 'name', fontWeight:'bold', textAlign:'left',p: 0.5}}>{post.autor}</Box>
                <Box sx={{ gridArea: 'title', fontWeight:'light',textAlign:'left', p: 0.5}}>Friend from LucaTIC</Box>
                <Box sx={{ gridArea: 'content', textAlign:'left',p: 0.5 }}>{post.texto}</Box>
                <Box sx={{ gridArea: 'footer',  fontWeight:'light', fontSize:10, textAlign:'right',p: 0.5}}>{post.fechahora}</Box>
              </Box>);
            })}
  
        </Stack>
      );
      
          
    }
  }

  export default NoticiaSet;