import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./styles/index.css";

/* 
Your store item should have the following structure
{
  id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 <- You can come up with your own prices
}
*/

export default function App() {
  const [cartItems, setCartItem] = useState([])
  const [storeItems, setStoreItem] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/storeItems")
      .then((resp) => resp.json())
      .then((storeItemsFromServer) => setStoreItem(storeItemsFromServer));
  }, [])

  useEffect(()=>{
    fetch("http://localhost:4000/cart")
      .then((resp) => resp.json())
      .then((cartItemsFromServer) => setCartItem(cartItemsFromServer));
  }, [])

  function addItemToCart(itemID){
    let cartItem = cartItems.find(target=> target.id ===itemID)
    if (cartItem !== undefined) {
      cartItem.quantity += 1

      fetch(`http://localhost:4000/cart/${itemID}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
      })  .then(response => response.json())
          .then(data => {
            let updatedCartList = cartItems.map(target=> {
                if(target.id === itemID) return data
                return target
              })
            setCartItem(updatedCartList)
          })
    }
    else {
      cartItem = {id:itemID, quantity:1}
      fetch("http://localhost:4000/cart",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),})
          .then(response => response.json())
          .then(data => setCartItem([...cartItems, data]))
    }
  }

  function removeItemFromCart(itemID){
    let cartItem = cartItems.find(target=> target.id ===itemID)
    
    if(cartItem.quantity === 1) {
      fetch(`http://localhost:4000/cart/${itemID}`,{
      method: 'DELETE',})
        .then(response => response.json())
        .then(() => {
         setCartItem(cartItems.filter(target=> target.id !== itemID))
        })
    }
    else{
      cartItem.quantity -= 1

      fetch(`http://localhost:4000/cart/${itemID}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
      })  .then(response => response.json())
          .then(data => {
            let updatedCartList = cartItems.map(target=> {
                if(target.id === itemID) return data
                return target
              })
            setCartItem(updatedCartList)
          })
    }
  }

  function updateQuantityFromInput(newQuantity, itemID){
    
    let updatedCartList = cartItems.map(target=> {
        if(target.id === itemID) return {...target, quantity: newQuantity }
        return target
      })
      setCartItem(updatedCartList)
  }

  return <div className="App">
    <Header 
    storeItems={storeItems}
    addItemToCart={addItemToCart}/>

    <Main 
    storeItems={storeItems}
    cartItems={cartItems}
    addItemToCart={addItemToCart}
    removeItemFromCart={removeItemFromCart}
    updateQuantityFromInput={updateQuantityFromInput}/>

    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26"
        >Icongeek26</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  </div>;
}
