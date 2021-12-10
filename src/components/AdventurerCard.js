import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

function AdventurerCard({id, first_name, last_name, phone, email, trip, onDeleteAdv, adventures}){
    const targetAdventure = adventures.filter(adv => adv.user_id === id)
   
    async function deleteAdventurer(){
        await fetch(`http://localhost:9595/adventures/${targetAdventure[0].id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(deletedAdventure => onDeleteAdv(deletedAdventure))
    }

    const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              Name: {first_name} {last_name}
            </Typography>
            <Typography>
              Phone: {phone}
            </Typography>
            <Typography variant="body2">
              Email: {email}
            </Typography>
          </CardContent>
          <CardActions>
            <StyledButton onClick={deleteAdventurer} size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", margin: "5px"}}>Delete Adventurer</StyledButton>
          </CardActions>
        </React.Fragment>
      );


    return(
        <Box sx={{ minWidth: 275 }}>
            <MuiThemeProvider theme={customTheme}>
                <ThemeProvider theme={customTheme}>
                <Card variant="outlined">{card}</Card>
                </ThemeProvider>
            </MuiThemeProvider>
        </Box>
        // <div>
        //     <h2>Name: {first_name} {last_name}</h2>
        //     <h3>Phone: {phone}</h3>
        //     <h3>Email: {email}</h3>
        //     <button onClick={deleteAdventurer}>Delete Adventurer</button>
        // </div>
    );
}

export default AdventurerCard