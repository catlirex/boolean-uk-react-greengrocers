
function displayPrice(id){
  document.getElementById(id+"price").style.display === "block"
  ? document.getElementById(id+"price").style.display = "none"
  : document.getElementById(id+"price").style.display = "block"
}
function StoreItem({item, addItemToCart}){
  const{ id, name, price} =item

    return (
        <li onClick={()=>displayPrice(id)}>
  <div className="store--item-icon">
    <img src={`assets/icons/${id}.svg`} alt={name} />
  </div>
  <span id={id+"price"} style={{display:"none"}}>£{price} /each</span>
  <button onClick={()=>addItemToCart(id)}>Add to cart</button>
</li>
    )
}

export default StoreItem