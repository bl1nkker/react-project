import React, { Component } from 'react'

export default class Product extends Component {
    constructor(props){
        super(props)
        this.state = {
            productList: <ul className='products'>
                            {this.props.products.map(product => (
                                <li key={product._id}>
                                    <div className='product'>
                                        <a href={'#'+product._id}>
                                            <img src={product.image} alt={product.title}></img>
                                            <p>{product.title}</p>
                                        </a>
                                        <div className='product-price'>
                                            <div>{product.price}</div>
                                            <button className='button primary'>Add To Cart</button>
                                        </div>
                                    </div>
                                </li>))}
                        </ul>
        }
    }

    render() {
        console.log(this.state.productList)
        return (
            <div>
               {this.state.productList}  
            </div>
        )
    }
}
