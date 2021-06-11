import StoreItem from "./StoreItem";

import storeItems from '../data/storeItems'

function Header(props){
    return (

    <header id="store">
  <h1>Greengrocers</h1>
  <ul className="item-list store--item-list">
     {storeItems.map((item, index) => (
         <StoreItem 
         key={index}
         item={item}
         addItemToCart={props.addItemToCart}/>
     ))}
      
  </ul>
</header>
    )
}

export default Header