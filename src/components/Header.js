import StoreItem from "./StoreItem";

import storeItems from '../data/storeItems'
import { useState } from "react";
import HeaderFilter from "./HeaderFilter";
import HeaderSort from "./HeaderSort";

function Header(props){
    const [filterOption, setFilterOption] = useState("")
    const [sortOption, setSortOption] = useState("")
    let filteredStoreItems = storeItems
    if (filterOption === "fruit") filteredStoreItems = filteredStoreItems.filter(item=> item.type === "fruit")
    if (filterOption === "vegetable") filteredStoreItems = filteredStoreItems.filter(item=> item.type === "vegetable")

    let sortedStoreItems = [...filteredStoreItems]
    if(sortOption === "name") sortedStoreItems.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    if(sortOption === "low") sortedStoreItems.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
    if(sortOption === "high") sortedStoreItems.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))

    return (

    <header id="store">
    <h1>Greengrocers</h1>

    <HeaderFilter setFilterOption={setFilterOption}/>

    <HeaderSort setSortOption={setSortOption}/>

    <ul className="item-list store--item-list">
        {sortedStoreItems.map((item, index) => (
            <StoreItem 
            key={index}
            item={item}
            addItemToCart={props.addItemToCart}/>
        ))}
        
    </ul>
    </header>
    )
}

export default Header