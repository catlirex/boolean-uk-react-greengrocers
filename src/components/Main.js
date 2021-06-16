import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import InvoiceCard from "./InvoiceCard";

function Main({storeItems, cartItems, setCartItem, addItemToCart, removeItemFromCart, updateQuantityFromInput, userType}){
  if (userType==="staff") return null

  const [invoiceList, setInvoice] = useState([])

  let total=0
  cartItems.map(cartItem=>{
    if (storeItems.length ===0) return 
    let itemDetail = storeItems.find(target => target.id === cartItem.id)
    total += (itemDetail.price * cartItem.quantity)
  })

  useEffect(()=>{
    fetch("http://localhost:4000/invoice")
      .then((resp) => resp.json())
      .then((invoiceFromServer) => setInvoice(invoiceFromServer));
  }, [])

    function checkOut(){
      let newInvoice = {
        date: new Date(),
        items:[]
      }
      cartItems.map(cartItem=>{
        let itemDetail = storeItems.find(target=> target.id === cartItem.id)
    
        let itemAddToInvoice={...cartItem, price: itemDetail.price, name:itemDetail.name}
        if (itemDetail.img !== undefined) itemAddToInvoice.img = itemDetail.img
        newInvoice.items=[...newInvoice.items, itemAddToInvoice];

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
        <main >
    <div id="cart">
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
  </div>
  <div className="record-container">
    <h3>Your past order</h3>
      {invoiceList.map((invoice, index)=>(
        <InvoiceCard
        invoice={invoice}
        key={index}/>
      ))}

    

    
  </div>
</main>

    )
}

export default Main