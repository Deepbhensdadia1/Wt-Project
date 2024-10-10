import React, { useEffect, useState } from 'react'
import './home.css'
import { ProductCard } from '../../components/productcard/Card';


const Home = () => {
  const [product, setProducts] = useState([])

  const token = localStorage.getItem('auth-token')
  const getProducts = async () => {
    try {
      let product = await fetch('http://localhost:5050/api/products', {
        headers: {
          'authorization': 'Bearer ' + token
        }
      })
      product = await product.json();
      setProducts(product)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      {/* products-section */}
      <div className="top-seller pb-5">
        <div className="container">
          <div className="row">
            <div className="seller-header pb-4">
              <h2>Top Seller</h2>
            </div>

            {product.map((product, index) => (
              <div key={index} className="col-md-3 col-lg-3">
                <ProductCard key={product._id} product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home