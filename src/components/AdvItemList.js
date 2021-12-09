import AdvItemCard from "./AdvItemCard"
function AdvItemList({items}) {

    const advItems = items.map(item => <AdvItemCard id={item.id} name={item.name} description={item.description} quantity={item.quantity}/>)

    return(
        <div>
            {advItems}
        </div>
    );
}

export default AdvItemList