const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const corsConfig = {
    origin: 'https://moonlit-taiyaki-f04d58.netlify.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
  app.use(cors(corsConfig))
  app.options("*", cors(corsConfig))
  app.use(express.json())
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization")
    next()
  })


const uri = "mongodb+srv://manufucterer_admin:C6zKXkZ8IxuAWCA8@cluster0.stwgp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        await client.connect()
        const userCollection = client.db("LoanApplication").collection("usersInfo");
        app.post('/users', async(req,res)=>{
            const usersInfo = req.body;
  
            const addusers = await userCollection.insertOne(usersInfo);
            res.send(addusers)
          });
          app.get('/users', async (req,res)=>{
            
            const query ={};
            const cursor = userCollection.find(query)
            const users = await cursor.toArray();
            
            res.send(users)
        })
        app.get('/users/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        })
        app.put('/users/:id', async(req, res) =>{
            const id = req.params.id;
            const usersInfo = req.body;
            console.log(usersInfo);
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updatedDoc = {
                $set: 
                   usersInfo
                
            };
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })

    }
    finally{

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello from loanapplication')
});
app.listen(port, () => {
    console.log('Listening to port', port)
})