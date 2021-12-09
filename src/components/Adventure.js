import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import TripHostDetails from "./TripHostDetails"
import AdvItemList from "./AdvItemList"
import NavBar from "./NavBar"
import Typography from '@mui/material/Typography';

function Adventure() {
    const[adventure, setAdventure] = useState({})
    const[trip, setTrip] = useState({})
    const[items, setItems] = useState([])
    const[loaded, setLoaded] = useState(false)
    
    const adventureId = useParams().id
    console.log("loaded:", loaded)    
    useEffect(() => {
        fetch(`http://localhost:9595/adventures/adventure/${adventureId}`)
        .then(r => r.json())
        .then(adv => {
            setAdventure(adv)
            setTrip(adv.trip)
            setItems(adv.trip.trip_items)
            setLoaded(true)
        })
    }, [adventureId])



    return(
        <div>
            <NavBar />
            {loaded === true ? <TripHostDetails trip={trip}/> : <div>Loading...</div>}
            <br />
            <Typography variant="h4" component="div">
                Gear List
            </Typography>
            <br />
            <AdvItemList items={items}/>
        </div>
    )
}

export default Adventure