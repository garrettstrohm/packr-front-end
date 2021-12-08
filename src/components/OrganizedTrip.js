import { useParams } from "react-router-dom"
import {useEffect, useState} from "react"
import ItemList from "./ItemList"
import AdventurerList from "./AdventurerList"

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
    }, [tripId])

    useEffect(() => {
        fetch(`http://localhost:9595/trips/trip/${tripId}`)
        .then(r => r.json())
        .then(data => {
            setTrip(data)
            setItems(data.trip_items)
        })
    }, [tripId])
    

    function onDeleteAdv(deletedAdventure){
        const updatedAdv = adventures.filter(adv => adv.id !== deletedAdventure.id)
        setAdventures(updatedAdv)
    }
    console.log("adventures:", adventures)


    return (
        <>
            <div float="left">
                <h1>{trip.title}</h1>
                <h2>Date: {trip.date}</h2>
                <h4>Description: {trip.description}</h4>
            </div>
            <div float="right">
                <h1>Adventurers:</h1>
                <AdventurerList adventures={adventures} trip={trip} onDeleteAdv={onDeleteAdv} setAdventures={setAdventures}/>
            </div>
            <div>
                <h1>Gear List</h1>
                <ItemList items={items} setItems={setItems} trip={trip.id}/>
            </div>
        </>
    )
}

export default OrganizedTrip