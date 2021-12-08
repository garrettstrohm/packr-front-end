import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom"


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
            <Link to={`/trips/trip/${id}`}><Button size="small" variant="contained">Gear List</Button></Link>
            <Button size="small" variant="contained" onClick={() => handleDeleteTrip(id)}>Delete Trip</Button>
          </CardActions>
        </React.Fragment>
      );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}