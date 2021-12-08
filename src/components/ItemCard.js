
function ItemCard({name, description, quantity, handleDelete, id, onIncrease, onDecrease}) {



    function handleIncrease() {
        fetch(`http://localhost:9595/tripitems/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity + 1,
          })
        })
        .then(r => r.json())
        .then((updatedItem) => onIncrease(updatedItem))
      }

      function handleDecrease() {
        fetch(`http://localhost:9595/tripitems/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity - 1,
          })
        })
        .then(r => r.json())
        .then((updatedItem) => onDecrease(updatedItem))
      }

    return(
        <div>
            <p>Name: {name}, Description: {description}, Quantity: {quantity}</p>
            <button onClick={() => handleDelete(id)}>Delete Item</button>
            <button onClick={() => handleIncrease(id)}>Increase Quantity</button>
            <button onClick={() => handleDecrease(id)}>Decrease Quantity</button>
        </div>
    );
}

export default ItemCard