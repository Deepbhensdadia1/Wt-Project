import React, { useState } from 'react'
import './style.css'
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [type, setType] = useState("password");


    const [user, setUser] = useState({
        email: "",
        password: "",
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            alert("Please Enter all detail")
        } else {
            axios
                .post("http://localhost:5050/api/login", user)
                .then((res) => {
                    if (res.data.userType === 0) {
                        localStorage.setItem('auth-type', res.data.userType)   
                    }else{
                        localStorage.removeItem('auth-type')   
                    }
                    localStorage.setItem('auth-token', res.data.token)
                    localStorage.setItem('auth-id', res.data.userId)

                    setTimeout(() => {
                        window.location.href = '/'
                    }, 500);
                })
                .catch(err => {
                    alert('Invalid email or password')
                })
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
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
                                <h3 className="text-center">Login</h3>
                                <form onSubmit={handleSubmit} className="position-relative">

                                    <div className="default-form-box pt-4">
                                        <label>
                                            email <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="enter your email"
                                            value={user.email}
                                            onChange={(e) => handleChange(e)}
                                            onKeyDown={handleChange}
                                            autoComplete="off"
                                            autoCorrect="off"
                                        />

                                    </div>
                                    <div className="default-form-box">
                                        <label htmlFor="password">
                                            Password<span>*</span>
                                        </label>
                                        <div className="position-relative">
                                            <input
                                                type={type}
                                                id="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="enter your password"
                                                value={user.password}
                                                onChange={(e) => handleChange(e)}
                                                autoComplete="off"
                                                autoCorrect="off"
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
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md">
                                            login
                                        </button>
                                    </div>
                                    <div className="pt-4">
                                        Create Your Account?{' '}
                                        <Link to="/register" className="text-decoration-none">
                                            
                                            Click here
                                        </Link>
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

export default Login