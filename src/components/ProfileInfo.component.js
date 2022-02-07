import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const  ProfileInfo = () => {
    
      return(
        <Box sx={{p:"0",m:"0"}} id="profile">
            <Stack spacing={0.2} alignItems="flex-end" sx={{fontSize:12}}>
            <Box sx={{fontWeight:'bold'}}>{this.props.user.nombre} {this.props.user.apellido1} {this.props.user.apellido2}</Box>
            
            <Box >{this.props.user.email}</Box>
            </Stack>
  
        </Box>);
      
    
  }

  export default ProfileInfo;