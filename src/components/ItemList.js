import ItemCard from "./ItemCard"
import {useState, useEffect} from "react"

function ItemList({items, setItems, trip}){

    const[newItem, setNewItem] = useState({
        name:"",
        description:"",
        quantity:0,
        trip_id: trip,
    })

    useEffect(() => {
        setNewItem({...newItem, trip_id: trip})
    }, [trip])

    const itemCards = items.map(item => <ItemCard key={item.id} id={item.id} name={item.name} description={item.description} quantity={item.quantity} trip_id={item.trip_id} handleDelete={handleDelete} onIncrease={onIncrease} onDecrease={onDecrease}/>)

    function handleDelete(id){
        fetch(`http://localhost:9595/tripitems/${id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(deletedItem => {
            const updatedList = items.filter(item => item.id !== deletedItem.id)
            setItems(updatedList)
        })
    }
    console.log("trip:", trip)
    console.log("newItem:", newItem)
    
    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:9595/tripitems', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newItem.name,
                description: newItem.description,
                quantity: parseInt(newItem.quantity),
                trip_id: trip
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log("data:", data)
            setItems([...items, data])
        })
    }

    function handleOnChange(e){
        setNewItem({...newItem, [e.target.name]: e.target.value})
    }

    function onIncrease(updatedItem){
        const updatedItems = items.map((item) => {
          if(item.id === updatedItem.id){
            return updatedItem
          } else {
            return item
          }
        });
        setItems(updatedItems)
      }

      function onDecrease(updatedItem){
        const updatedItems = items.map((item) => {
          if(item.id === updatedItem.id){
            return updatedItem
          } else {
            return item
          }
        });
        setItems(updatedItems)
      }

    return(
        <div>
            <h4>Add a New Item</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" placeholder="Name of Item" value={newItem.name} onChange={handleOnChange}></input>
                </label>
                <label>
                    Description:
                    <input type="text" name="description" placeholder="Description of Item" value={newItem.description} onChange={handleOnChange}></input>
                </label>
                <label>
                    Quantity:
                    <input type="number" name="quantity" placeholder="Quantity of Item" value={newItem.quantity} onChange={handleOnChange}></input>
                </label>
                <input type="submit"></input>
            </form>
            <h4>Current Items:</h4>
            {itemCards}
        </div>
    );
}

export default ItemList