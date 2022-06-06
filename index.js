const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


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