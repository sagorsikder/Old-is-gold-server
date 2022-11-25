const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        const categoryCollection = client.db('oldIsGold').collection('categories');

        app.get('/categories',async(req,res)=>{


            const query = {}
            const cursor =  categoryCollection.find(query)
            const categories =await cursor.toArray()
       

            res.send(categories)
        })

        app.get('/product',async(req,res)=>{


           const id = req.query.id;
            const query = {_id:ObjectId(id)}
            const cursor =  categoryCollection.find(query)
            const categories =await cursor.toArray()
       

            res.send(categories)
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