

function StoreItem({item, addItemToCart}){
  const{ id, name, price} =item
    return (
        <li>
  <div className="store--item-icon">
    <img src={`assets/icons/${id}.svg`} alt={name} />
  </div>
  <span>£{price} /each</span>
  <button onClick={()=>addItemToCart(id)}>Add to cart</button>
</li>
    )
}

export default StoreItem