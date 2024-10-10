import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [product, setProducts] = useState([])

  const getProducts = async () => {
    try {
      let product = await axios.get('http://localhost:5050/api/products')
      setProducts(product.data)
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (item) => {
    try {
      await axios.delete('http://localhost:5050/api/deleteProduct/' + item._id)
      const newProduct = product.filter((val) => val._id !== item._id)
      setProducts(newProduct)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-10">
            <div className="hero-text">
              <h2>Products</h2>
            </div>
          </div>
          <div className="col-md-2">
            <Link to='/addproduct'><button className='btn btn-primary'>Add product</button></Link>
          </div>
        </div>
      </div>

      <div className="container pt-2">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="table_desc">
              <div className="table_page table-responsive">
                <table className="table m-0 ">
                  <thead>
                    <tr>
                      <th className="product_no">No.</th>
                      <th className="product_image">Image</th>
                      <th className="product_name">Name</th>
                      <th className="product_name">Description</th>
                      <th className="product-price">Price</th>
                      <th className="action"></th>
                    </tr>
                  </thead>
                  {product?.map((product, index) => (
                    <tbody key={product._id}>
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
                        <td className="product_name">
                          <h5>{product?.description }</h5>
                        </td>
                        <td className="product-price">₹{product?.price}</td>
                        <td className="product-price" style={{width: '15%'}}>
                          <Link to={`/updateproduct/${product._id}`}><button className='btn btn-outline-secondary'>EDIT</button></Link>
                          <button onClick={() => handleDelete(product)} className='btn btn-outline-danger ms-2'>DELETE</button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard