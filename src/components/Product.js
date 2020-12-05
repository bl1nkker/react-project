import { connect } from 'react-redux'
import React, { Component } from 'react'
import Modal from 'react-modal'
import {fetchProducts} from './../actions/productActions'

class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            product: null
        }
    }
    componentDidMount(){
        this.props.fetchProducts()
    }

    openModal = (product) =>{
        this.setState({product})
    }

    closeModal = () =>{
        this.setState({product:null})
    }

    render() {
        const currentProduct = this.state.product
        return (
            <div>
                {!this.props.products ? (<div>Loading...</div>) :
                            (<ul className='products'>
                                {this.props.products.map(product => (
                                    <li key={product._id}>
                                        <div className='product'>
                                            <a href={'#'+product._id} onClick={() => this.openModal(product)}>
                                                <img src={product.image} alt={product.title}></img>
                                                <p>{product.title}</p>
                                            </a>
                                            <div className='product-price'>
                                                <div>{product.price}</div>
                                                <button onClick={() => this.props.addToCart(product)} className='button primary'>Add To Cart</button>
                                            </div>
                                        </div>
                                    </li>))}
                            </ul>)
                   }
               
                {currentProduct && 
                <Modal isOpen={true} onRequestClose={this.closeModal}>
                    <button onClick={this.closeModal} className='modal-close-btn'>x</button>
                    <div className='modal-product-details'>
                        <img src={currentProduct.image} alt={currentProduct.title}/>
                        <div className='modal-product-details-description'>
                            <p><strong>{currentProduct.title}</strong></p>
                            <p>{currentProduct.description}</p>
                            <p>Available Sizes: {" "}
                                {currentProduct.availableSizes.map((size) =>(
                                    <span>
                                        {" "} 
                                        <button className='button'>{size}</button>
                                    </span>
                                ))}
                            </p>
                            <div className='product-price'>
                                <div>{currentProduct.price}</div>
                                <button className='button primary' onClick={() =>{
                                    this.props.addToCart(currentProduct)
                                    this.closeModal()
                                }}>Add to Cart</button>
                            </div>

                        </div>

                    </div>
                </Modal>}
            </div>
        )
    }
}

export default connect((state) => ({products: state.products.filteredItems}), {fetchProducts})(Products);
