import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = product => {
    const {id} = product
    const {cartList} = this.state
    const updatedCartsList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    this.setState({cartList: updatedCartsList})
  }

  decrementCartItemQuantity = product => {
    const {id, quantity} = product
    const {cartList} = this.state
    const updatedCartsList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        if (quantity === 1) {
          return eachItem
        }
        return {...eachItem, quantity: eachItem.quantity - 1}
      }
      return eachItem
    })
    this.setState({cartList: updatedCartsList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product
    const getProduct = cartList.find(eachItem => eachItem.id === id)
    console.log(getProduct, 'get product ------------')
    if (getProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
      //   TODO: Update the code here to implement addCartItem
    } else {
      // getProduct.quantity = getProduct.quantity + 1
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      })
      this.setState({cartList: updatedCartList})
    }
  }
  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredList})
  }
  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
