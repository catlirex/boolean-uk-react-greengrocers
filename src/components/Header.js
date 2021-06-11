import StoreItem from "./StoreItem";

function Header(){
    return (
        <header id="store">
  <h1>Greengrocers</h1>
  <ul class="item-list store--item-list">
      <StoreItem/>
  </ul>
</header>
    )
}

export default Header