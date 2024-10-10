import React, { useContext } from 'react'
import axios from 'axios'
import { CartData } from '../../context/CartContext'

export const ProductCard = ({ product }) => {

  let userId = (localStorage.getItem('auth-id'))

  const cart = useContext(CartData);
  const { addInCart } = useContext(CartData);

  const addToCart = async (prod) => {
    if (!userId) alert('Please login first')

    const cartItem = cart?.state?.cart?.findIndex((item) => item.product?._id === product._id)
    if (cartItem !== -1) {
      alert('Product is already in the cart')
    } else {
      await axios
        .post('http://localhost:5050/api/addToCart', { "user_id": userId, product: prod._id })
        .then((res) => {
          addInCart(prod)
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>

      <div className="container m-4">
        <div className="card border-0 rounded-0 shadow" style={{ width: '18rem' }}>
          <img src={'http://localhost:5050/uploads/ProductImages/' + product.productImage} style={{ width: "18rem", height: '350px' }} className="card-img-top rounded-0" alt="..." />
          <div className="card-body mt-3">
            <div className="row">
              <div className="col-10">
                <h4 className="card-title">{product?.name}</h4>
                <p style={{color: 'grey'}}>{product?.description}</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center text-center g-0">
            <div className="col-4">
              <h5>₹{product?.price}</h5>
            </div>
            <div className="col-8">
              <button onClick={() => addToCart(product)} className="btn btn-dark w-100 p-3 rounded-0">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>



      {/* <div className="product_wrappers_one mb-5">
        <div className="thumb position-relative" style={{ overflow: "hidden" }}>
          <Link to='/'>
            <img
              src={'http://localhost:5050/uploads/ProductImages/' + product.productImage}
              alt={product?.name}
              className="inner-img w-100"
              style={{ width: "300px", height: '415px' }}
            />
          </Link>
        </div>
        <div className="content">
          <h5 className="title text-capitalize">{product?.name}</h5>
          <span className="price">
            <span className="new">₹{product?.price}</span>
          </span>
        </div>
        {!userId && (
          <div className="text-center pt-2">
            <button
              className="btn btn-success"
            >
              Add to cart
            </button>
          </div>
        )}
        {userId && (
          <div className="text-center pt-2">
            <button onClick={() => addToCart(product)} className="btn btn-success" >
              Add to cart {qty ? '(' + qty + ')' : ''}
            </button>
          </div>
        )}
      </div> */}
    </>
  )
}
