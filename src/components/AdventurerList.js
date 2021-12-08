
import AdventurerCard from "./AdventurerCard"
import {useEffect, useState} from "react"

function AdventurerList({trip, onDeleteAdv, adventures}){
    const[adventurers, setAdventurers] = useState([])
    const[newAdventurer, setNewAdventurer] = useState({
        first_name:"",
        last_name: "",
        email:"",
        phone:"",
        trip_id: trip.id
    })

    console.log(newAdventurer)

    useEffect(() => {
        setNewAdventurer({...newAdventurer, trip_id: trip.id})
    }, [trip])

    useEffect(() => {
        const advList = adventures.map(adv => adv.user)
        setAdventurers(advList)
    }, [adventures])
    
    const list = adventurers.map(user => <AdventurerCard key={user.username} id={user.id} first_name={user.first_name} last_name={user.last_name} email={user.email} phone={user.phone} trip={trip} onDeleteAdv={onDeleteAdv} adventures={adventures} setAdventurers={setAdventurers}/>)

    function handleOnChange(e){
        setNewAdventurer({...newAdventurer, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch()
    }

    return(
        <>
        <form >
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