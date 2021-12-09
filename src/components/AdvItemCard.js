import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function AdvItemCard({id, name, description, quantity}){

    const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h6" component="div">
              Name: {name} | Description: {description} | Quantity: {quantity}
            </Typography>
          </CardContent>
        </React.Fragment>
      );

    return(
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined" style={{boxShadow: "1px 3px 6px 2px #9E9E9E"}}>{card}</Card>
        </Box>
    );
}

export default AdvItemCard