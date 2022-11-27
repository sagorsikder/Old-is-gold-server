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
        const orderCollection = client.db('oldIsGold').collection('order');
        const userCollection = client.db('oldIsGold').collection('user');

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
        
        app.post('/users',async(req,res)=>{
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })
        app.post('/order',async(req,res)=>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

        app.get('/order',async(req,res)=>{
            const currentEmail = req.query.email;
            const query = {email:currentEmail};
            const order = await orderCollection.find(query).toArray();
            res.send(order);
        })
        app.get('/users',async(req,res)=>{
            const query = {};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        })

        app.get('/user',async(req,res)=>{
            const emailSearch = req.query.email;
            const query = {email:emailSearch}
            const user = await userCollection.findOne(query);
            res.send(user)
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