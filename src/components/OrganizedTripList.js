import OrganizedTripCards from "./OrganizedTripCards"
import {useState, useEffect} from "react"

function OrganizedTripList({currentUser}) {
    const [trips, setTrips] = useState([])
    const [newTrip, setNewTrip] = useState({
        title:"",
        date:"",
        description:"",
        user_id: ""
    })
    const[tripsToDisplay, setTripsToDisplay] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9595/trips/${currentUser.id}`)
        .then(r => r.json())
        .then(tripData => {
            setTrips(tripData)
            setTripsToDisplay(tripData)
        })
    }, [currentUser.id])



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
            body: JSON.stringify(newTrip)
        })
        .then(r => r.json())
        .then(data => {
            setTripsToDisplay([...trips, data])
            setNewTrip({
                title:"",
                date:"",
                description:"",
                user_id: currentUser.id
            })
        })
    }

    function handleDeleteTrip(id){
        fetch(`http://localhost:9595/trips/trip/${id}`, {
            method: "Delete"
        })
        const updatedTrips = trips.filter(trip => trip.id !== id)
        setTripsToDisplay(updatedTrips)
    }

    const tripCards = tripsToDisplay.map(trip => <OrganizedTripCards key={trip.name} id={trip.id} title={trip.title} date={trip.date} description={trip.description} handleDeleteTrip={handleDeleteTrip}/>)

    return(
        <>
        <h2>OrganizedTripList</h2>
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
            <input type="submit"></input>
        </form>
        {tripCards}
        </>
    );
}

export default OrganizedTripList