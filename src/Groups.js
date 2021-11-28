import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Table } from '@mui/material';
import { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

class GroupPage extends React.Component{

    render(){
        return(
            <Stack spacing={0.2}  alignItems="flex-start" sx={{fontSize:12}} id = "stack">
                {this.props.groups.map((group)=>{
                    return(
                        <Link>{group.nombre}</Link>
                    );
                })}
            </Stack>
        );
    }
}

function gatherGroups(usuario,empresa){
    fetch("http://localhost:8080/api/grupos/usuario/search/"+usuario,
    {
        mode:'cors',
        headers:{'access-token':localStorage.getItem("token")}
    }).then(data => {
        return data;
    })
}

function Groups(){
    if(localStorage.getItem('usuario') != "null"){

        var groups = gatherGroups(localStorage.getItem('usuario'), 1);
        render(<GroupPage groups={groups} />);
    }
}

export default Groups;