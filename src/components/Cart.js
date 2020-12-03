import React, { Component } from 'react'

export default class Cart extends Component {
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
            cartItems:this.props.cartItems
        }
        this.props.createOrder(new_order)
    }

    render() {
        return (
            <div>
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
