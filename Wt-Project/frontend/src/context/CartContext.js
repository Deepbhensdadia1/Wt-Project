import axios from "axios";
import { createContext, useEffect, useReducer } from "react";




export const CartData = createContext();

const intialState = {
    cart: [],
    cartItems: 0
}

const Cart = (state, action) => {

    switch (action.type) {
        case "SET_CART":
            return {
                ...state,
                cart: action?.payload?.cart,
                cartItems: action?.payload?.cart?.reduce((total, item) => total + item.quantity, 0)
            }

        case 'ADD_TO_CART':
            const product = action.payload
            const cartItem = state?.cart?.findIndex((item) => item.product?._id === product._id)
            const Cart = [...state?.cart]

            if (cartItem !== -1) {
                Cart[cartItem].quantity += 1
                return {
                    ...state,
                    cart: Cart,
                    cartItems: state.cartItems + 1
                }
            } else {
                return {
                    ...state, cart: [...state.cart, { product, quantity: 1 }],
                    cartItems: state.cartItems + 1
                }
            }
        case 'DECREASE':
            const productN = action.payload
            const cartItemIndex = state?.cart?.findIndex((item) => item.product?._id === productN._id)
            if (cartItemIndex !== -1) {
                const currentCart = [...state?.cart]

                if (currentCart[cartItemIndex].quantity > 1) {
                    currentCart[cartItemIndex].quantity = currentCart[cartItemIndex].quantity - 1

                    return {
                        ...state,
                        cart: currentCart,
                        cartItems: state.cartItems - 1
                    }
                } else {
                    state?.cart?.splice(cartItemIndex, 1)
                    return {
                        ...state,
                        cartItems: state.cartItems - 1
                    }
                }
            } else {
                return state
            }
        case 'CHECKOUT':
            return{
                ...state,
                cart: [],
                cartItems: 0
            }
        default:
            return state
    }
}

export const CartProvider = ({ children }) => {
    let userId = (localStorage.getItem('auth-id'))
    const [state, dispatch] = useReducer(Cart, intialState)

    const addInCart = (payload) => {
        dispatch({ type: "ADD_TO_CART", payload });
    }

    const decreaseFromCart = (payload) => {
        dispatch({ type: "DECREASE", payload });
    }

    const checkOut = (payload) => {
        dispatch({ type: "CHECKOUT", payload });
    }


    const getData = async () => {
        try {
            if (userId) {
                await axios
                    .get("http://localhost:5050/api/userCart/" + userId)
                    .then((res) => {

                        dispatch({ type: "SET_CART", payload: { cart: res?.data.length > 0 ? res?.data[0]?.items : [] } })
                    })
                    .catch((err) => console.log(err))
            }
        } catch (err) {

        }
    }

    useEffect(() => {
        if (userId) {
            getData();
        }
    }, []);

    return (
        <CartData.Provider value={{ state, dispatch, addInCart, decreaseFromCart, checkOut }}>
            {children}
        </CartData.Provider>
    )
}
