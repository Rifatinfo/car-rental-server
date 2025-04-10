require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT  || 5000

app. use(express. json())
app.use(cors())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.i1uhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i1uhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const carRentalCollection = client.db("carRental").collection("addCar");
    
    app.post("/cars", async (req, res) => {
        const addCar = req.body;
        console.log(addCar);
        const result = await carRentalCollection.insertOne(addCar);
        res.send(result);
    })

    app.get("/all-cars", async (req, res) => {
      const allCars = await carRentalCollection.find().toArray();
      res.send(allCars);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Car rental System!')
})

app.listen(port, () => {
  console.log(`Car rental System on port ${port}`)
})



