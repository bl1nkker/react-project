import { connect } from 'react-redux'
import React, { Component } from 'react'
import { removeFromCart } from '../actions/cartActions'
import {clearOrder, createOrder} from './../actions/orderActions'
import Modal from 'react-modal'

class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            isProceeded: false,
            name:'',
            email:'',
            address:''
        }
    }
    handleChange = (event) =>{
        this.setState({[event.target.name]:event.target.value})
    }
    proceedHandler = () =>{
        this.setState({isProceeded: true})
    }

    createOrder = (event) =>{
        event.preventDefault();
        const new_order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems,
            total: this.props.cartItems.reduce((a,c) => (a+c.price*c*c.count),0)
        }
        this.props.createOrder(new_order)
    }

    closeModal = () =>{
        this.props.clearOrder()
    }

    render() {
        const {cartItems, order} = this.props
        return (
            <div>
                    {this.props.count === 0 ?
                    <div className='cart cart-header'>Cart is empty</div>:
                    <div className='cart cart-header'>Cart has {this.props.count} items</div>
                }
                {
                    order && 
                    <Modal isOpen={true}
                    onRequestClose={this.closeModal}>
                        <button className="modal-close-btn" onClick={this.closeModal}>x</button>
                        <div className="order-details">
                            <h3 className="success-message"> Your order has been placed. </h3>
                <h2>Order {order._id}</h2>
                <ul>
                    <li>
                        <div>Name: </div>
                        <div>{order.name}</div>
                    </li>

                    <li>
                        <div>Email: </div>
                        <div>{order.email}</div>
                    </li>

                    <li>
                        <div>Address: </div>
                        <div>{order.address}</div>
                    </li>

                    <li>
                        <div>Total: </div>
                        <div>{order.total}</div>
                    </li>

                    <li>
                        <div>Cart Items: </div>
                        <div>{order.cartItems.map(item =>(
                            <div>{item.count} x {item.title}</div>
                        ))}</div>
                    </li>
                </ul>
                        </div>
                    </Modal>
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
                            <button onClick={this.proceedHandler} className='button primary'>Proceed</button>
                        </div>
                    ): null}
                {this.state.isProceeded && (
                    <form  onSubmit={this.createOrder} className='proceed-form'>
                        <ul>
                            <li>
                                <label onChange={this.handleChange} for='name'>
                                    <input type="name" required name='name'/>
                                </label>  
                            </li>

                            <li>
                                <label onChange={this.handleChange} for='email'>
                                    <input type="email" required name='email'/>
                                </label> 
                            </li>

                            <li>
                                <label onChange={this.handleChange} for='address'>
                                    <input type="address" required name='address'/>
                                </label>        
                            </li>
                        </ul>
                        <button className='button primary' type='submit'>Submit Form</button> 
                    </form>
                )}
            </div>
        )
    }
}

export default connect(state => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
}),
{
    removeFromCart,
    createOrder,
    clearOrder
}

)(Cart)