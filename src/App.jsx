import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./styles/index.css";


// import storeItems from './data/storeItems'

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

  function addItemToCart(itemID){
    if (cartItems.some( target => target.id === itemID)){
      let updatedCartList = cartItems.map(target=> {
        if(target.id === itemID) return {...target, quantity: target.quantity+1 }
        return target
      })
      setCartItem(updatedCartList)
    }
    else setCartItem([...cartItems, {id: itemID, quantity: 1}])
  }

  function removeItemFromCart(itemID){
    let itemQuantity = cartItems.find(cartItem=> cartItem.id === itemID).quantity
    if(itemQuantity===1) {
      let updatedCartList = cartItems.filter(target=> target.id !== itemID)
      setCartItem(updatedCartList)
    }
    else{
      let updatedCartList = cartItems.map(target=> {
        if(target.id === itemID) return {...target, quantity: target.quantity-1 }
        return target
      })
      setCartItem(updatedCartList)
      }
  }



  return <div className="App">
    <Header addItemToCart={addItemToCart}/>

    <Main 
    cartItems={cartItems}
    addItemToCart={addItemToCart}
    removeItemFromCart={removeItemFromCart}/>

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
