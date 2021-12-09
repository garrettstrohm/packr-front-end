
import AdventurerCard from "./AdventurerCard"
import {useEffect, useState} from "react"

function AdventurerList({trip, adventures, setAdventures}){
    const[adventurers, setAdventurers] = useState([])
    const[adventurersToDisplay, setAdventurersToDisplay] = useState([])
    const[newAdventurer, setNewAdventurer] = useState({
        first_name:"",
        last_name: "",
        email:"",
        phone:"",
        trip_id: ""
    })

    let targetTrip = trip
   
    useEffect(() => {
        setNewAdventurer({...newAdventurer, trip_id: trip.id})
    }, [])

    useEffect(() => {
        const advList = adventures.map(adv => adv.user)
        setAdventurers(advList)
        setAdventurersToDisplay(advList)
    }, [adventures])

    function handleOnChange(e){
        setNewAdventurer({...newAdventurer, [e.target.name]: e.target.value})
    }

    function onDeleteAdv(deletedAdventure){
        const updatedAdv = adventures.filter(adv => adv.id !== deletedAdventure.id)
        const updatedAdvrs = updatedAdv.map(adv => adv.user)
        setAdventures(updatedAdv)
        setAdventurersToDisplay(updatedAdvrs)
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:9595/adventures', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: newAdventurer.first_name,
                last_name: newAdventurer.last_name,
                email: newAdventurer.email,
                phone: parseInt(newAdventurer.phone),
                trip_id: targetTrip.id
            })
        })
        .then(r => {
            if(!r.ok){
                throw new Error(r.status)
            } else {
                return r.json()
            }
        })
        .then(data => {
            setAdventures([...adventures, data])
            setAdventurersToDisplay([...adventurersToDisplay, data.user])
            setNewAdventurer({
                first_name:"",
                last_name: "",
                email:"",
                phone:"",
                trip_id: targetTrip.id
            })
        })
        .catch(error => {
            console.log(error)
            alert("That User Does Not Exist, or Inputs Are Incorrect. Please Check Your Information and Try Again")
        })
    }

    const list = adventurersToDisplay.map(user => <AdventurerCard key={user.username} id={user.id} first_name={user.first_name} last_name={user.last_name} email={user.email} phone={user.phone} trip={trip} onDeleteAdv={onDeleteAdv} adventures={adventures} setAdventurers={setAdventurers}/>)

    return(
        <>
        <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="first_name" placeholder="Name" value={newAdventurer.first_name} onChange={handleOnChange}></input>
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" placeholder="Name" value={newAdventurer.last_name} onChange={handleOnChange}></input>
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" placeholder="5555555555" value={newAdventurer.phone} onChange={handleOnChange}></input>
                </label>
                <label>
                    Email:
                    <input type="text" name="email" placeholder="Email" value={newAdventurer.email} onChange={handleOnChange}></input>
                </label>
                <input type="submit"></input>
            </form>
        {list}
        </>
    );
}

export default AdventurerList