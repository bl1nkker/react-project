const express = require('express')
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const shortid = require('shortid')

const app = express();
app.use(body_parser.json());

mongoose.connect('mongodb://localhost/react-shopping-cart-db',
{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

const Product = mongoose.model("products", new mongoose.Schema({ //  This is like a class. Just for creating products for database
    _id : {type: String, default: shortid.generate}, // It necessary for generating id's for new products. All better than create ids manually
    title: String,                  // As you see, all properties were taken from data.json
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
}))

app.get('/api/products', async (req, res) =>{           // This is for GET request. Get product from DB
    const products = await Product.find({})
    res.send(products);
});

app.post("/api/products", async (req, res) =>{          // This is for POST request. Add product to DB
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
});

app.delete("/api/products/:id", async (req, res) =>{     // This is for DELETE. Indian boi called it an API function. Started to undestand smth...
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct)

})

const Order = mongoose.model("order", new mongoose.Schema({
    _id:{
        type:String,
        default: shortid.generate        
    },
    email:String,
    name:String,
    address:String,
    total:Number,
    cartItems:[
        {
            _id:String,
            title:String,
            price:Number,
            count:Number
        }]
},{
    timestamps:true
}
))

app.post("/api/orders", async(req, res) =>{
    if(!req.body.name 
        || !req.body.email
        || !req.body.address
        || !req.body.total
        || !req.body.cartItems){
            return res.send({message: "Data is required.",
        email:req.body.email,
        name:req.body.name,
        address:req.body.address,
        total:req.body.total,
        cartItems:req.body.cartItems,})
        }
    const order = await Order(req.body).save()
    res.send(order)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log("serve at http://localhost:5000"))



