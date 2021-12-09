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


function ItemCard({name, description, quantity, handleDelete, id, onIncrease, onDecrease}) {

    function handleIncrease() {
        fetch(`http://localhost:9595/tripitems/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity + 1,
          })
        })
        .then(r => r.json())
        .then((updatedItem) => onIncrease(updatedItem))
      }

      function handleDecrease() {
        fetch(`http://localhost:9595/tripitems/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity - 1,
          })
        })
        .then(r => r.json())
        .then((updatedItem) => onDecrease(updatedItem))
      }

      const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h6" component="div">
              Name: {name} | Description: {description} | Quantity: {quantity}
            </Typography>
          </CardContent>
          <CardActions>
            <StyledButton size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", margin: "5px"}} onClick={() => handleDelete(id)}>Delete Item</StyledButton>
            <StyledButton size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", margin: "5px"}} onClick={handleIncrease}>Increase Quantity</StyledButton>
            <StyledButton size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", margin: "5px"}} onClick={handleDecrease}>Decrease Quantity</StyledButton>
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

export default ItemCard