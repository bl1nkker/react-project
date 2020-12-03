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

const port = process.env.PORT || 5000
app.listen(port, () => console.log("serve at http://localhost:5000"))

