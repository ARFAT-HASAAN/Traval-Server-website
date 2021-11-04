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
      const servicedata = database.collection("service");

      // get api 
      app.get('/services', async (req, res) => {
         const service = await servicedata.find({}).toArray()


         res.send(service)

      })

      // post api 
      app.post('/services', async (req, res) => {

         const newService = req.body;
         const result = await servicedata.insertOne(newService)
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