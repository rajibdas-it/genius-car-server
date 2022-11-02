const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("genius car server running");
});

async function run() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  const servicesCollection = client.db("geniusCar").collection("services");
  try {
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`genius car server running on port ${port}`);
});
