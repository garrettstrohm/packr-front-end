import OrganizedTripCards from "./OrganizedTripCards"
import {useState, useEffect, useContext} from "react"
import {UserContext} from "../context/userState"
import Button from "@mui/material/Button"
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

function OrganizedTripList() {
    const [trips, setTrips] = useState([])
    const [newTrip, setNewTrip] = useState({
        title:"",
        date:"",
        description:"",
        user_id: ""
    })
    const[tripsToDisplay, setTripsToDisplay] = useState([])
    const{user, setUser} = useContext(UserContext)

    useEffect(() => {
        fetch(`http://localhost:9595/trips/${user.id}`)
        .then(r => r.json())
        .then(tripData => {
            setTrips(tripData)
            setTripsToDisplay(tripData)
        })
    }, [])

    function handleOnChange(e){
        setNewTrip({...newTrip, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:9595/trips', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTrip.title,
                date: newTrip.date,
                description: newTrip.description,
                user_id: user.id
            })
        })
        .then(r => r.json())
        .then(data => {
            setTripsToDisplay([...trips, data])
            setNewTrip({
                title:"",
                date:"",
                description:"",
                user_id: user.id
            })
        })
    }

    function handleDeleteTrip(id){
        fetch(`http://localhost:9595/trips/trip/${id}`, {
            method: "Delete"
        })
        .then(r => r.json())
        .then(deletedTrip => {
            const updatedTrips = trips.filter(trip => trip.id !== deletedTrip.id)
            setTripsToDisplay(updatedTrips)
        })
    }

    const tripCards = tripsToDisplay.map(trip => <OrganizedTripCards key={trip.name} id={trip.id} title={trip.title} date={trip.date} description={trip.description} handleDeleteTrip={handleDeleteTrip}/>)

    return(
        <>
        <h2>My Organized Trips</h2>
        <h4>Create a Trip</h4>
        <form onSubmit={handleSubmit}>
            <label>
            Title:
            <input type="text" placeholder="Trip Title" name="title" onChange={handleOnChange} value={newTrip.title}></input>
            </label>
            <label>
            Date:
            <input type="date" name="date" value={newTrip.date} onChange={handleOnChange}></input>
            </label>
            <label>
            Description:
            <input type="text" placeholder="Trip Description" name="description" value={newTrip.description}  onChange={handleOnChange}></input>
            </label>
            <MuiThemeProvider theme={customTheme}>
            <ThemeProvider theme={customTheme}>
                <StyledButton type="submit" size="small" variant="contained" sx={{color: "#ffffff", borderColor:"#ffffff", background:"#FF9B00", margin: "0px 0px 0px 1px", height:"22px"}}>Add Trip</StyledButton>
            </ThemeProvider>
            </MuiThemeProvider>
        </form>
        <br />
        {tripCards}
        </>
    );
}

export default OrganizedTripList