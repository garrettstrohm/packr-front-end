import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
import { UserContext } from '../context/userState';
import {useContext} from "react"
import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
  } from '@mui/material/styles';
  import styled, { ThemeProvider } from 'styled-components';

const customTheme = createTheme({
    palette: {
      primary: {
        main: '#FF9B00',
        text: '#ffffff',
        hover: '#FFBE59'
      },
    },
  });

  const StyledButton = styled(Button)`
  ${({ theme }) => `
    cursor: pointer;
    background-color: ${theme.palette.primary.main};
    transition: ${theme.transitions.create(['background-color', 'transform'], {
        duration: theme.transitions.duration.standard,
    })};
    &:hover {
        background-color: ${theme.palette.primary.hover};
    }
  `}
`;


export default function NavBar() {
    const{user, setUser} = useContext(UserContext)
    let currentUser = user
    
    function handleClick(){
        setUser(currentUser)
    }

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar maxWidth='100vw'>
        <Toolbar sx={{background: "#386A19"}}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Packr
          </Typography>
            <MuiThemeProvider theme={customTheme}>
            <ThemeProvider theme={customTheme}>
          <Link to={`/home/${user.username}`} style={{textDecoration: 'none'}}><StyledButton size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", hover: {bgcolor: '#FBE59'}}} onClick={handleClick}>Home</StyledButton></Link>
          <Link to='/' style={{textDecoration: 'none'}}><StyledButton size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", margin: "5px"}}>Logout</StyledButton></Link>
            </ThemeProvider>
            </MuiThemeProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
