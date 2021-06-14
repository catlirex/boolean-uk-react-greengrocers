import { useState } from "react";

  function StaffStoreItem({item, userType, index, setStoreItem, storeItems}){
    const{ id, name, price} =item
    if (userType==="customer") return null

    const [inputValue, setInputValue]= useState(null)

    function updatePrice(index){
        console.log(index);
        let newPrice = document.forms[`${index+1}`]["price"].value
        let updatedItem = {...item, price:Number(newPrice)}
        
        fetch(`http://localhost:4000/storeItems/${id}`,{
            method: 'PUT',
            headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
      })  .then(response => response.json())
          .then(data => {
            let updatedStoreList = storeItems.map(target=> {
                if(target.id === id) return data
                return target
              })
              setStoreItem(updatedStoreList)

              document.forms[`${index+1}`].reset()
              setInputValue(null)
          })
    }
      return (
          <li>
    <div className="store--item-icon">
      <img src={item.img===undefined? `assets/icons/${id}.svg` : item.img} alt={name} />
    </div>
    <form id={`${index}`} className="price-update-container" onSubmit={e=>{
        e.preventDefault()
        updatePrice(index)
    }}>
        <span>£</span>
        <input name="price" type="number" placeholder={price} min="0" step=".01" required onChange={e=>setInputValue(e.target.value)}/>
        <button disabled={inputValue === null? true: false}>update</button>
    </form>
    
  </li>
      )
  }
  
  export default StaffStoreItem