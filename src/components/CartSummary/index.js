// Write your code here
import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const allPricesList = []
      cartList.map(eachObj =>
        allPricesList.push(eachObj.price * eachObj.quantity),
      )
      console.log(allPricesList)
      const totalAmount = allPricesList.reduce((a, b) => a + b)

      return (
        <div className="summary_card_container">
          <div className="summary_card">
            <h1 className="total_amount_para">
              Order Total: Rs
              <span className="total_amount_span"> {totalAmount}/- </span>
            </h1>
            <p className="items_count_details_para">
              {cartList.length} items in cart
            </p>
            <button className="checkout_btn" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
