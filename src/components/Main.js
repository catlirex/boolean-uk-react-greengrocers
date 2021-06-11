import CartItem from "./CartItem";
import storeItems from '../data/storeItems'

function Main({cartItems, addItemToCart, removeItemFromCart}){

  let total=0
  cartItems.map(cartItem=>{
    let itemDetail = storeItems.find(target=> target.id === cartItem.id)
    total = total+ (itemDetail.price * cartItem.quantity)
  })

    return (
        <main id="cart">
  <h2>Your Cart</h2>
  <div className="cart--item-list-container">
    <ul className="item-list cart--item-list">
      {cartItems.map((cartItem, index)=>(
        <CartItem key={index}
        cartItem={cartItem}
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}/>
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
  </div>
</main>

    )
}

export default Main