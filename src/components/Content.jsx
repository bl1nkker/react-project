import React, { Component } from 'react'
import data from './../data.json'
import Product from './Product'

export default class Content extends Component {
    constructor(props){
        super(props)
        this.state={
            products: data.products,
            size: '',
            sort: ''
        }
    }
    render() {
        return (
            <main>
                <div className='content'>
                    <div className='main'>
                        <Product products={this.state.products}/>
                    </div>
                    <div className='sidebar'>
                        Side Bar
                    </div>

                </div>
            </main>
        )
    }
}
