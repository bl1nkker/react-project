import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Cart from './Cart'
import Filter from './Filter'
import Products from './Product'
import store from './../store.js'

export default class Content extends Component { 
    render() {
        return (
            <Provider store={store}>
            <main>
                <div className='content'>
                    <div className='main'>
                        <Filter />
                        <Products />
                    </div>
                    <div className='sidebar'>
                        <Cart />
                    </div>
                </div>
            </main>
            </Provider>
        )
    }
}
