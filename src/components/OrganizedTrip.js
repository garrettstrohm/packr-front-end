import { useParams } from "react-router-dom"
import {useEffect, useState} from "react"
import ItemList from "./ItemList"
import AdventurerList from "./AdventurerList"
import NavBar from "./NavBar"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function OrganizedTrip() {

    const[trip, setTrip] = useState({})
    const[items, setItems] = useState([])
    const[adventures, setAdventures] = useState([])
    const tripId = useParams().id

    useEffect(() => {
        fetch(`http://localhost:9595/adventures/${tripId}`)
        .then(r => r.json())
        .then(data => {
            setAdventures(data)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:9595/trips/trip/${tripId}`)
        .then(r => r.json())
        .then(data => {
            setTrip(data)
            setItems(data.trip_items)
        })
    }, [])



    return (
        <>
            {/* <NavBar />
            <div float="left">
                <br />
                <h1>{trip.title}</h1>
                <h2>Date: {trip.date}</h2>
                <h4>Description: {trip.description}</h4>
            </div>
            <div float="right">
                <h1>Adventurers:</h1>
                <AdventurerList adventures={adventures} trip={trip} setAdventures={setAdventures}/>
            </div>
            <div>
                <h1>Gear List</h1>
                <ItemList items={items} setItems={setItems} trip={trip.id}/>
            </div> */}
             <NavBar />
            
            <Box sx={{ width: '100%', marginTop: 10 }}>
            
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                        <Typography variant="h4" component="div">
                            Trip: {trip.title}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Date: {trip.date}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Description: {trip.description}
                        </Typography>
                        <ItemList items={items} setItems={setItems} trip={trip.id}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="div" style={{marginBottom: 10}}>
                            Adventurers List
                        </Typography>
                        <AdventurerList adventures={adventures} trip={trip} setAdventures={setAdventures}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default OrganizedTrip