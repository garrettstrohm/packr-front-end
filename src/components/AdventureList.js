import AdventureCards from "./AdventureCards"
import {useState, useEffect} from "react"

function AdventureList({currentUser}){
    const[adventures, setAdventures] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:9595/adventures/myadventures/${currentUser.id}`)
        .then(r => r.json())
        .then(adventureData => setAdventures(adventureData))
    }, [])

    console.log(adventures)

    const adventureCardList = adventures.map(adv => <AdventureCards key={adv.id} id={adv.id} trip={adv.trip} items={adv.trip.trip_items}/>)

    return(
        <div>
            <h2>My Adventures</h2>
            {adventureCardList}
        </div>
    );
}

export default AdventureList