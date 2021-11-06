const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

const port = process.env.PORT || 2000
const app = express()
// middle wire 
app.use(bodyParser.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m9s95.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)
const client = new MongoClient(uri,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true
   });

app.get('/', (req, res) => {
   res.send('assignment 11')
})

async function run() {
   try {
      await client.connect();




      const database = client.db("travel_service");
      const serviceCollection = database.collection("service");
      const orderCollection = database.collection("BookServices");

      // get api 
      app.get('/services', async (req, res) => {
         const service = await serviceCollection.find({}).toArray()


         res.send(service)

      })

      // post api 
      app.post('/services', async (req, res) => {

         const newService = req.body;
         const result = await serviceCollection.insertOne(newService)
         res.send(result)


      })






      // order post api 
      app.post('/orders', async (req, res) => {

         const BookedService = req.body;
         const result = await orderCollection.insertOne(BookedService)
         console.log(result)
         res.send(result)


      })

      app.get('/orders', async (req, res) => {
         const orderservice = await orderCollection.find({}).toArray()

         res.send(orderservice)

         // res.send('chal ab lag ja')
      })

      // delete api 
      app.delete('/orders/:id', async (req, res) => {
         // console.log(req.params.id)
         const id = req.params.id

         const query = { _id: id }

         const result = await orderCollection.deleteOne(query);
         // console.log(result)
         res.send(result)

      })

   } finally {
      // await client.close();
   }
}
run().catch(console.dir);


app.listen(port, () => {
   console.log('my port number is', port)
})