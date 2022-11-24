const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

// middleware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.edl5qg1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){

    try{

        const productCollection = client.db('productCollection').collection('product');

        app.get('/products',async(req,res)=>{

            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            console.log(page,size)
            const query = {}
            const cursor =  productCollection.find(query)
            const products =await cursor.skip(page*size).limit(size).toArray()
            const count = await productCollection.estimatedDocumentCount()

            res.send({count,products})
        })

    }
    finally{

    }
}

run().catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send('api running on port')
})

app.listen(port,console.log('Port number',port))