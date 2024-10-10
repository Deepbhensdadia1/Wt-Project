import React, { useContext } from 'react'
import { CartData } from '../../context/CartContext';
import CartItem from './CartItem';
import './cart.css'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useContext(CartData);
  const { checkOut } = useContext(CartData);
  const total = cart?.state?.cart?.reduce((total, item) => total + item?.product?.price * item?.quantity, 0)

  const handleCheckOut = () => {
    alert('Order has been placed.')
    checkOut()
    navigate('/')
  }

  return (
    <>
      {cart?.state?.cart.length === 0 ?
        <>
          <h4 className='text-center mt-5'>Cart is empty</h4>
        </>
        :
        <>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-12">
                <div className="hero-text">
                  <h2>Cart</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="container pt-3">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="table_desc">
                  <div className="table_page table-responsive">
                    <table className="table m-0 ">
                      <thead>
                        <tr>
                          <th className="product_thumb">Index No.</th>
                          <th className="product_thumb">Image</th>
                          <th className="product_name">Product Name</th>
                          <th className="product-price">Price</th>
                          <th className="product_quantity">Quantity</th>
                          <th className="product_quantity">Total price</th>
                          {/* <th className="product_total">Remove</th> */}
                        </tr>
                      </thead>
                      {cart?.state?.cart?.map((product, index) => (
                        <CartItem
                          key={product.product._id}
                          product={product.product}
                          quantity={product.quantity}
                          index={index}
                        />
                      ))}
                    </table>
                  </div>
                </div>{" "}

              </div>{" "}
            </div>
          </div>



          <div>
            <div className="container pt-5 pb-5">
              <div className="row">
                <div className="col-lg-4 col-md-12">

                </div>
                <div className="col-lg-8 col-md-12">
                  <div
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="coupon_code right"
                  >
                    <h3>Cart Total</h3>
                    <div className="coupon_inner">
                      <div className="cart_subtotal">
                        <p>Total Items:</p> <p className="cart_amount">{cart?.state?.cartItems}</p>
                      </div>
                      <div className="cart_subtotal">
                        <p>Subtotal</p> <p className="cart_amount">{total}</p>
                      </div>
                      <div className="cart_subtotal border-bottom">
                        <p>Shipping Charges</p>
                        <p className="cart_amount">
                          <span>Flat Rate:</span> ₹40.00
                        </p>
                      </div>

                      <div className="cart_subtotal pt-3">
                        <p>Total</p> <p className="cart_amount">{total + 40}</p>
                      </div>
                      <div className="checkout_btn pt-3">
                        <button
                          className="theme-btn-one btn-overlay-dark btn_lg"
                          onClick={handleCheckOut}
                        >
                          CheckOut
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Cart