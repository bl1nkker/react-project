import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Cart from './Cart'
import Filter from './Filter'
import Products from './Product'
import {store} from './../store.js'

export default class Content extends Component {
    constructor(props){
        super(props)
        this.state={
            cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
        }

    }

    addToCart = (product) => {
        const cartItems = [...this.state.cartItems]
        let alreadyInCart = false
        cartItems.forEach( (item) =>{
            if (item._id === product._id){
                item.count += 1
                alreadyInCart = true
            }
        })

        if (!alreadyInCart){
            cartItems.push({...product, count:1})  
        }
        this.setState({cartItems:[...cartItems]})
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }

    removeFromCart = (product) =>{
        const updatedCart = [...this.state.cartItems.filter((item) => product._id !== item._id)]
        this.setState({cartItems:[...updatedCart]})
        localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    }


    createOrder = (order) =>{
        alert('Need to make an order to' + order.name)
    }
    
    render() {
        
        let cartItemsCount = 0
        for (let i = 0; i < this.state.cartItems.length; i++){
            cartItemsCount += this.state.cartItems[i].count
        }
        return (
            <Provider store={store}>
            <main>
                <div className='content'>
                    <div className='main'>
                        <Filter 
                        count={this.state.products.length}
                        size={this.state.size}
                        sort={this.state.sort}/>

                        <Products 
                        addToCart={this.addToCart}
                        />
                    </div>
                    <div className='sidebar'>
                        <Cart 
                        count={cartItemsCount}
                        cartItems={this.state.cartItems}
                        removeFromCart={this.removeFromCart}
                        createOrder={this.createOrder}
                        />
                    </div>

                </div>
            </main>
            </Provider>
        )
    }
}
