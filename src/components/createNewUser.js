import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState, useContext} from 'react'
import {UserContext} from "../context/userState"
import{useHistory} from "react-router-dom"
import {
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#FF9B00',
      text: '#ffffff',
      hover: '#FFBE59'
    },
  },
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Packr.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function CreateNewUser({changeUser}) {
    const[newUser, setNewUser] = useState({
        username:"",
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
    })
    let history = useHistory();

    const{user, setUser} = useContext(UserContext)

    console.log("newUser:", newUser)

    const handleSubmit = (e) => {
      e.preventDefault();
    fetch('http://localhost:9595/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: newUser.username,
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            email: newUser.email,
            phone: parseInt(newUser.phone)
        })
    })
    .then(r => r.json())
    .then(data => changeUser(data))
    history.push(`/home/${user.username}`)
  };

  function handleOnChange(e){
    setNewUser({...newUser, [e.target.name]: e.target.value})
    setUser({...newUser, [e.target.name]: e.target.value})
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="firstName"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={newUser.firstName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleOnChange}
                  autoComplete="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={newUser.username}
                  onChange={handleOnChange}
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={newUser.email}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  id="phone"
                  autoComplete="phone"
                  value={newUser.phone}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <MuiThemeProvider theme={customTheme}>
            <ThemeProvider theme={customTheme}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>setUser(newUser)}
              >
                Sign Up
              </Button>
            </ThemeProvider>
            </MuiThemeProvider>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}