import React, { useContext } from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSignOut, faSignIn } from "@fortawesome/free-solid-svg-icons";
import navbarlogo from "../../assets/Images/Navbar-Logo.png";
import { CartData } from '../../context/CartContext';


const Navbar = () => {

    const cart = useContext(CartData);
    const token = localStorage.getItem('auth-token')
    const isAdmin = localStorage.getItem('auth-type')

    const handleSignOut = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('auth-id')
        window.location.href = '/login'
    }

    return (
        <div className='header' >
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            <div className="header-logo">
                                <Link to='/'>
                                    <img src={navbarlogo} alt='nav-logo' />
                                </Link>
                            </div>

                            <div className="nav-last">
                                <ul>
                                    {token &&
                                        <>
                                            {isAdmin === '0' &&
                                                <li className='cart-icon'>
                                                    <Link to='/dashboard' >
                                                        <button className='btn btn-outline-dark'>Dashboard</button>
                                                    </Link>
                                                </li>
                                            }
                                            <li className='cart-icon'>
                                                <Link to='/cart' >
                                                    <FontAwesomeIcon icon={faCartShopping} size='lg' className='text-dark' />
                                                    <span className='item-count'>{cart.state.cartItems ? cart.state.cartItems : 0}</span>
                                                </Link>
                                            </li>
                                            <li className='cart-icon'>
                                                <Link >
                                                    <FontAwesomeIcon onClick={handleSignOut} icon={faSignOut} size='lg' className='text-dark' />
                                                </Link>
                                            </li>
                                        </>
                                    }

                                    {!token &&
                                        <li>
                                            <Link to="/login">
                                                <FontAwesomeIcon
                                                    icon={faSignIn}
                                                    size="lg"
                                                    className="text-dark"
                                                />
                                            </Link>
                                        </li>
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar