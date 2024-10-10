
import React, { useContext } from 'react'
import './cart.css'
import { CartData } from '../../context/CartContext'
import axios from 'axios'

const CartItem = ({ product, index, quantity }) => {

  const userId = localStorage.getItem('auth-id')
  const { addInCart, decreaseFromCart } = useContext(CartData);
  const totalPrice = product?.price * quantity


  const increaseQty = async (product) => {
    await axios
      .post('http://localhost:5050/api/addToCart', { "user_id": userId, product: product._id })
      .then((res) => {
        addInCart(product)
      })
      .catch((err) => console.log(err))
  }

  const decreaseQty = async (product) => {
    await axios
      .post('http://localhost:5050/api/removeFromCart', { "user_id": userId, product: product._id })
      .then((res) => {
        decreaseFromCart(product)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <tbody>
        <tr>
          <td className="index">
            <h4>{index + 1}</h4>
          </td>
          <td className="product_thumb">
            <img src={'http://localhost:5050/uploads/ProductImages/' + product.productImage} alt="img" height={100} />
          </td>
          <td className="product_name">
            <h5>{product?.name}</h5>
          </td>
          <td className="product-price">₹{product?.price}</td>
          <td className="product_quantity">
            <button
              className='btn btn-outline-dark'
              onClick={() => decreaseQty(product)}
            >-</button>
            <label className="quantity">{quantity}</label>
            <button
              className='btn btn-outline-dark'
              onClick={() => increaseQty(product)}
            >+</button>
          </td>
          <td className="product-price">₹{totalPrice.toFixed(2)}</td>
        </tr>
      </tbody>
    </>
  )
}

export default CartItem