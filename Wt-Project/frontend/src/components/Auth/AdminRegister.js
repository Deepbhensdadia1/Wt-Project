import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {

    const isAdmin = 2

    const navigate = useNavigate();
    const [type, setType] = useState("password");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        isAdmin: isAdmin
      });

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
            alert("Please enter proper details in all fields.")
        }else{
            if(formData.password !== formData.confirmPassword) return alert("Please enter same password in both password fields")
            
            axios
                .post("http://localhost:5050/api/register", formData)
                .then((res) => {
                    if (res.data.success === true) {
                        setTimeout(()=>{
                            navigate('/login')
                        }, 500)
                    }else{
                        alert('Something is wrong')
                    }
                })
                .catch((err)=> alert('Something is wrong'))
        }   

    }

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShow = () => {
        if (type === "password") {
          setType("text");
        } else {
          setType("password");
        }
      };

    return (
        <>
            <div className="login-form py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3 className="text-center">Admin Register</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="default-form-box">
                                        <label>
                                            Name<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            onChange={handleInputChange}
                                            value={formData.name}
                                        />
                                    </div>
                                    <div className="default-form-box">
                                        <label>
                                            Email<span>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            onChange={handleInputChange}
                                            value={formData.email}
                                        />
                                    </div>
                                    <div className="default-form-box">
                                        <label htmlFor="password">
                                            Password<span>*</span>
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={type}
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                onChange={handleInputChange}
                                                value={formData.password}
                                            />
                                        </div>

                                    </div>
                                    <div className="default-form-box">
                                        <label htmlFor="password">
                                            Confirm Password<span>*</span>
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={type}
                                                name="confirmPassword"
                                                className="form-control"
                                                placeholder="Enter your confirm password"
                                                onChange={handleInputChange}
                                                value={formData.confirmPassword}
                                            />
                                            <div onClick={handleShow}>
                                                {type === "password" ? (
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        size="lg"
                                                        className="pass-show"
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faEyeSlash}
                                                        size="lg"
                                                        className="pass-show"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="default-form-box">
                                        <label htmlFor="phone">
                                            phone<span>*</span>
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type="number"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Enter your phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminRegister