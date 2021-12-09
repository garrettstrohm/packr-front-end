import AdventureCards from "./AdventureCards"
import {useState, useEffect} from "react"

function AdventureList({currentUser}){
    const[adventures, setAdventures] = useState([])
    const[adventuresToDiplay, setAdventuresToDisplay] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:9595/adventures/myadventures/${currentUser.id}`)
        .then(r => r.json())
        .then(adventureData => {
            setAdventures(adventureData)
            setAdventuresToDisplay(adventureData)
        })
    }, [currentUser.id])


    const adventureCardList = adventuresToDiplay.map(adv => <AdventureCards key={adv.id} id={adv.id} trip={adv.trip}/>)

    console.log("adventures:", adventures.length)
    return(
        <div>
            <h2>My Adventures</h2>
            {adventures.length === 0 ? "" : adventureCardList}
        </div>
    );
}

export default AdventureList