import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom"
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


export default function OrganizedTripCards({id, title, description, date, handleDeleteTrip}) {


    const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {date}
            </Typography>
            <Typography variant="body2">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/trips/trip/${id}`} style={{textDecoration: 'none'}}><StyledButton size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", margin: "5px"}}>Gear List</StyledButton></Link>
            <StyledButton size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", margin: "5px"}} onClick={() => handleDeleteTrip(id)}>Delete Trip</StyledButton>
          </CardActions>
        </React.Fragment>
      );
  return (
    <Box sx={{ minWidth: 275 }}>
      <MuiThemeProvider theme={customTheme}>
        <ThemeProvider theme={customTheme}>
          <Card variant="outlined">{card}</Card>
        </ThemeProvider>
      </MuiThemeProvider>
    </Box>
  );
}