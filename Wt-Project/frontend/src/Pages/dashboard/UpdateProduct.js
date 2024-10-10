import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateProduct = () => {
    const { id }= useParams();
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setdDescription] = useState('')
    const [price, setPrice] = useState('')
    const [productImage, setProductImage] = useState(null)


    const getProduct = async () => {
        const data = await axios.get('http://localhost:5050/api/product/' + id)
        setName(data.data.name)
        setdDescription(data.data.description)
        setPrice(data.data.price)
        setProductImage(data.data.productImage)
    }   

    
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("productImage", productImage)

        axios
            .put('http://localhost:5050/api/updateProduct/'+ id, formData)
            .then((res) => {
                alert('Product update successfully.')
                setName('')
                setdDescription('')
                setPrice('')
                setProductImage(null)
                document.getElementById('productImage').value = '';
                navigate('/dashboard')
            })
            .catch((err)=> console.log(err))
    }

    useEffect(()=>{
        getProduct()
    }, [])

    return (
        <>
            <div className="container my-4">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <h1 className="mb-3">Update product</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row g-3">
                                <div className="col-md-10">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" name="name" required />
                                </div>

                                <div className="col-md-10">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input value={description} onChange={(e) => setdDescription(e.target.value)} type="text" className="form-control" id="description" name="description" required />
                                </div>
                                <div className="col-md-10">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" id="price" name="price" />
                                </div>
                                <div className="col-10">
                                    <label htmlFor="productImage" className="form-label">Image</label>
                                    <input onChange={(e) => setProductImage(e.target.files[0])} type='file' className="form-control" id="productImage" name="productImage" />
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <button type="submit" className="btn btn-dark w-100 fw-bold" >Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct