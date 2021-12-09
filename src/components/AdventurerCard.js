function AdventurerCard({id, first_name, last_name, phone, email, trip, onDeleteAdv, adventures}){
    const targetAdventure = adventures.filter(adv => adv.user_id === id)
   
    async function deleteAdventurer(){
        await fetch(`http://localhost:9595/adventures/${targetAdventure[0].id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(deletedAdventure => onDeleteAdv(deletedAdventure))
    }
    
    return(
        <div>
            <h2>Name: {first_name} {last_name}</h2>
            <h3>Phone: {phone}</h3>
            <h3>Email: {email}</h3>
            <button onClick={deleteAdventurer}>Delete Adventurer</button>
        </div>
    );
}

export default AdventurerCard