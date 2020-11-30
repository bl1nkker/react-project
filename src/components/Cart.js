import React, { Component } from 'react'

export default class Cart extends Component {
    render() {
        console.log(this.props.cartItems)
        return (
            <div >
                    {this.props.count === 0 ?
                    <div className='cart cart-header'>Cart is empty</div>:
                    <div className='cart cart-header'>Cart has {this.props.count} items</div>
                }
                
                <div className='cart'>
                    <ul className='cart-items'>
                        {this.props.cartItems.map(product =>(
                            <li key={product._id} className='cart-item'>

                                    <p>{product.title}</p>
                                    <img src={product.image} alt={product.title}/>

                        <h6>{product.price} x {product.count}</h6>
                                    <button onClick={() => this.props.removeFromCart(product)}>Remove Item</button>
                            </li>
                        ))}
                    </ul>
                </div>
                {this.props.count !==0 ? (
                        <div className='cart-total'>
                            <p>Total: $ {this.props.cartItems.reduce((a,b) => a + b.price * b.count, 0)}</p>
                            <button className='button primary'>Proceed</button>
                        </div>
                    ): null}
            </div>
        )
    }
}
