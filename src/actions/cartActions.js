import { ADD_TO_CART, REMOVE_FROM_CART } from "../types"
import store from './../store'

export const addToCart = (product) => (dispatch) =>{

    const cartItems = store.getState().cart.cartItems.slice()
    let alreadyExist = false
    cartItems.forEach( item => {
        if (item._id === product._id){
            alreadyExist = true
            item.count++
        }
    })
    if (!alreadyExist){
        cartItems.push({...product, count:1})
    }

    dispatch ({
        type: ADD_TO_CART,
        payload: { cartItems }
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const removeFromCart = (product) => (dispatch) =>{
    const cartItems = store.getState().cart.cartItems.slice().filter(
        item => item._id !== product._id
    )

    dispatch({
        type: REMOVE_FROM_CART,
        payload: {cartItems}
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}