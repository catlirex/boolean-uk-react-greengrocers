import CustomerStoreItem from "./StoreItem";

import { useState } from "react";
import HeaderFilter from "./HeaderFilter";
import HeaderSort from "./HeaderSort";
import AddForm from "./AddForm";
import StaffStoreItem from "./StaffStoreItem";

function Header({storeItems, addItemToCart, setStoreItem, userType, setUserType}){
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

    

    return (
    <header id="store" style={userType==="staff"? {height:"95vh"} :{height:"40vh"}}>
        <nav>
            
            <AddForm
            
            userType={userType}
            addNewStoreItem={addNewStoreItem}/>
            <div>
                <button disabled={userType==="staff"?  true: false} onClick={()=>document.querySelector(".staff-login").style.display = "block"}>Staff Panel</button>
                <button disabled={userType==="customer"?  true: false} onClick={()=>setUserType("customer")} >Customer View</button>
                <form id="staff-login" className="staff-login" onSubmit={(e)=>{
                        e.preventDefault()
                        if(document.forms["staff-login"]["password"].value !== "000000"){
                            alert("Password Incorrect, please try again")
                            document.forms["staff-login"].reset()
                        }
                        else{
                            setUserType("staff")
                            document.forms["staff-login"].reset()
                            document.querySelector(".staff-login").style.display = "none"
                        }
                        
                    }}>
                    <input name="password" type="password" placeholder="pw: 000000"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </nav>
        <h1>Greengrocers</h1>

        <HeaderFilter setFilterOption={setFilterOption}/>

        <HeaderSort setSortOption={setSortOption}/>

        <ul className="item-list store--item-list">
        {sortedStoreItems.map((item, index) => (
            <CustomerStoreItem 
            userType={userType}
            key={index}
            item={item}
            addItemToCart={addItemToCart}/>
        ))}

        {sortedStoreItems.map((item, index) => (
            <StaffStoreItem 
            index={index}
            userType={userType}
            key={index}
            item={item}
            setStoreItem={setStoreItem}
            storeItems={storeItems}/>
        ))}

        
        
    </ul>
    </header>
    )
}

export default Header