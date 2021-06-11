import CartItem from "./CartItem";

function Main(){
    return (
        <main id="cart">
  <h2>Your Cart</h2>
  <div class="cart--item-list-container">
    <ul class="item-list cart--item-list">
        <CartItem/>
    </ul>
  </div>
  <div class="total-section">
    <div>
      <h3>Total</h3>
    </div>
    <div>
      <span class="total-number">£0.00</span>
    </div>
  </div>
</main>

    )
}

export default Main