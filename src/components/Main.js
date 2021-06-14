import { useState } from "react";
import CartItem from "./CartItem";



function Main({storeItems, cartItems, setCartItem, addItemToCart, removeItemFromCart, updateQuantityFromInput, userType}){
  if (userType==="staff") return null

  const [invoiceList, setInvoice] = useState([])

  let total=0
    cartItems.map(cartItem=>{
      let itemDetail = storeItems.find(target => target.id === cartItem.id)
      total += (itemDetail.price * cartItem.quantity)
    })

    function checkOut(){
      let newInvoice = []
      cartItems.map(cartItem=>{
        let itemDetail = storeItems.find(target=> target.id === cartItem.id)
    
        let itemAddToInvoice={...cartItem, price: itemDetail.price, name:itemDetail.name}
        newInvoice=[...newInvoice, itemAddToInvoice];

        fetch(`http://localhost:4000/cart/${itemDetail.id}`,{
        method: 'DELETE',})
          .then(response => response.json())
      })

      setCartItem([])

      fetch("http://localhost:4000/invoice",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInvoice),})
          .then(response => response.json())
          .then(data => setInvoice([...invoiceList, data]))
      
      
              
    }
  
    return (
        <main id="cart">
  <h2>Your Cart</h2>
  <div className="cart--item-list-container">
    <ul className="item-list cart--item-list">
      {cartItems.map((cartItem, index)=>(
        <CartItem 
        storeItems={storeItems}
        key={index}
        cartItem={cartItem}
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}
        updateQuantityFromInput={updateQuantityFromInput}/>
      ))}
      
    </ul>
  </div>
  <div className="total-section">
    <div>
      <h3>Total</h3>
    </div>
    <div>
      <span className="total-number">£{total.toFixed(2)}</span>
      
    </div>
    <button onClick={()=>checkOut()}>Check Out</button>
  </div>
</main>

    )
}

export default Main