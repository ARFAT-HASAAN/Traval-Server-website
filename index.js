const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const app = express()
const port = 2000

// middle wire 
app.use(bodyParser.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m9s95.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri,
     {
     useNewUrlParser: true,
      useUnifiedTopology: true
       });


async function run(run) {
    try{

    
 await client.connect();
    console.log(('did you connect with database?'));
    // const database = client.db("insertDB");
    // const haiku = database.collection("haiku");
    // create a document to insert
   
    // const result = await haiku.insertOne(doc);

    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }
 finally{

    //  await client.close()
 }
    
}
 run().catch(console.dir)



app.get('/', (req, res) => {
  res.send('assignment 11')
})

app.listen(port, () => {
  console.log('my port number is', port)
})