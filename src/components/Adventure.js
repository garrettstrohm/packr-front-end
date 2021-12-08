import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

function Adventure() {
    const[adventure, setAdventure] = useState({})
    const[trip, setTrip] = useState({})
    const[items, setItems] = useState([])
    const[tripHost, setTripHost] = useState({})
    
    const adventureId = useParams().id

 
    useEffect(() => {
        fetch(`http://localhost:9595/adventures/adventure/${adventureId}`)
        .then(r => r.json())
        .then(adv => {
            setAdventure(adv)
            setTrip(adv.trip)
            setItems(adv.trip.trip_items)
        })
    }, [])

    useEffect(() => {
         fetch(`http://localhost:9595/users/user/${trip.user_id}`)
        .then(r => r.json())
        .then(user => setTripHost(user))
    }, [trip])


    return(
        <div>
            <h1>Trip: {trip.title}</h1>
            <h2>Host: {tripHost.first_name} {tripHost.last_name}</h2>
            <h4>Email: {tripHost.email}</h4>
            <h4>Phone: {tripHost.phone}</h4>
        </div>
    )
}

export default Adventure