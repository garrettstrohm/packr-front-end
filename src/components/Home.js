import OrganizedTripList from "./OrganizedTripList";
import AdventureList from "./AdventureList"

function Home({currentUser}){
    return(
        <>
            <OrganizedTripList currentUser={currentUser}/>
            <AdventureList currentUser={currentUser}/>
        </>
    );
}

export default Home