import OrganizedTripList from "./OrganizedTripList";
import AdventureList from "./AdventureList"
import {useParams} from "react-router-dom"
import {useEffect} from "react"

function Home({currentUser, changeUser}){
    const paramsUser = useParams()
        
    useEffect(() => {
        fetch(`http://localhost:9595/users/${paramsUser.username}`)
        .then(r => r.json())
        .then(data => changeUser(data))
    }, [])

    console.log("currentUser:", currentUser)
    

    return(
        <>
            <h1>Welcome {currentUser.first_name} {currentUser.last_name}</h1>
            <OrganizedTripList currentUser={currentUser} changeUser={changeUser}/>
            <AdventureList currentUser={currentUser}/>
        </>
    );
}

export default Home