

function CartItem({storeItems, cartItem, addItemToCart, removeItemFromCart, updateQuantityFromInput}){
  const {id, quantity} = cartItem
  const itemDetail = storeItems.find(target=> target.id === id)
  if(itemDetail===undefined) return
    return(
        <li>
  <img
    className="cart--item-icon"
    src={itemDetail.img===undefined? `assets/icons/${id}.svg` : itemDetail.img}
    alt={`${itemDetail.name}`}
  />
  <p>{itemDetail.name}</p>
  <button className="quantity-btn remove-btn center" onClick={()=>removeItemFromCart(id)}>-</button>
  <input className="quantity-text center" type="text" placeholder={quantity} onChange={(e)=>updateQuantityFromInput(e.target.value, id)}/>
  <button className="quantity-btn add-btn center" onClick={()=>addItemToCart(id)}>+</button>
</li>

    )
}

export default CartItem