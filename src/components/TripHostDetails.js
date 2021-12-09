import {useState, useEffect} from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function TripHostDetails({trip}){
    const[tripHost, setTripHost] = useState({})

    useEffect(() => {
        fetch(`http://localhost:9595/users/user/${trip.user_id}`)
       .then(r => r.json())
       .then(user => {
           setTripHost(user)
       })
   }, [])

    return(
        <Box sx={{marginTop: 10}}>
            <Typography variant="h3" component="div">
                Trip: {trip.title}
            </Typography>
            <Typography variant="h5" component="div">
                Date: {trip.date}
            </Typography>
            <Typography variant="h6" component="div">
                Host: {tripHost.first_name} {tripHost.last_name}
            </Typography>
            <Typography variant="h6" component="div">
                Email: {tripHost.email}
            </Typography>
            <Typography variant="h6" component="div">
                Phone: {tripHost.phone}
            </Typography>
            <Typography variant="h6" component="div">
                Description: {trip.description}
            </Typography>
        </Box>
    );
}

export default TripHostDetails