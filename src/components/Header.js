import StoreItem from "./StoreItem";

import { useState } from "react";
import HeaderFilter from "./HeaderFilter";
import HeaderSort from "./HeaderSort";
import AddForm from "./AddForm";

function Header({storeItems, addItemToCart, setStoreItem}){
    const [filterOption, setFilterOption] = useState("")
    const [sortOption, setSortOption] = useState("")
    let filteredStoreItems = storeItems
    if (filterOption === "fruit") filteredStoreItems = filteredStoreItems.filter(item=> item.type === "fruit")
    if (filterOption === "vegetable") filteredStoreItems = filteredStoreItems.filter(item=> item.type === "vegetable")

    let sortedStoreItems = [...filteredStoreItems]
    if(sortOption === "name") sortedStoreItems.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    if(sortOption === "low") sortedStoreItems.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
    if(sortOption === "high") sortedStoreItems.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))

    function addNewStoreItem(){
        let newId= Number(storeItems[storeItems.length-1].id.substring(0, 3))+1
        newId = String(newId).padStart(3, '0');

        let newStoreItem = {
            id: newId,
            name: document.forms["addStoreItem"]["name"].value,
            price: Number(document.forms["addStoreItem"]["price"].value),
            img: document.forms["addStoreItem"]["image"].value,
            type: document.forms["addStoreItem"]["type"].value
            }
        
        fetch("http://localhost:4000/storeItems",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStoreItem),})
            .then(response => response.json())
            .then(data => {
                setStoreItem([...storeItems, data])
                document.forms["addStoreItem"].reset()
                })      
    }

    function displayStoreForm(){
        document.getElementById("addStoreItem").style.display === "grid"
        ? document.getElementById("addStoreItem").style.display = "none"
        : document.getElementById("addStoreItem").style.display = "grid"
      }

    return (
    <header id="store">
        <nav>
            <button className="display-store-form" onClick={()=>displayStoreForm()} >Add Store Item</button>
            <AddForm
            addNewStoreItem={addNewStoreItem}/>
        </nav>
        <h1>Greengrocers</h1>

        <HeaderFilter setFilterOption={setFilterOption}/>

        <HeaderSort setSortOption={setSortOption}/>

        <ul className="item-list store--item-list">
        {sortedStoreItems.map((item, index) => (
            <StoreItem 
            key={index}
            item={item}
            addItemToCart={addItemToCart}/>
        ))}
        
    </ul>
    </header>
    )
}

export default Header