const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
// const PORT = process.env.PORT || process.env.port_name;
const PORT = 8000;
// const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);99*

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.m8c0v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
  try {
    const db = client.db("dhaka_fast_food");
    const productsCollection = db.collection("products");
    const blogsCollection = db.collection("blogs");
    const usersCollection = db.collection("users");
    const cuponCollection = db.collection("cupons");
    const soldCollection = db.collection("soldproducts");
    // post product
    app.post("/addproduct", async (req, res) => {
      const data = req.body;
      const result = await productsCollection.insertOne(data);
      res.send(result);
    });

    //   get product

    app.get("/products", async (req, res) => {
      const cursor = await productsCollection.find({});
      const data = await cursor.toArray();
      res.send(data);
    });

    // post blog
    app.post("/addblog", async (req, res) => {
      const data = req.body;
      const result = await blogsCollection.insertOne(data);
      res.send(result);
    });

    // get blog
    app.get("/blog", async (req, res) => {
      const crusor = await blogsCollection.find({});
      const result = await crusor.toArray();
      res.send(result);
    });

    // post user
    app.post("/users", async (req, res) => {
      const data = req.body;
      const email = data.email;
      const user = await usersCollection.findOne({ email });
      if (user) {
        res.send({ message: "Already have an account" });
      }
      const result = await usersCollection.insertOne(data);
      res.send(result);
    });

    // sold product

    app.post("/sold", async (req, res) => {
      const product = req?.body;
      console.log(product);
      const result = await soldCollection.insertOne(product);
      res.send(result);
    });

    // get sold product

    app.get("/sold", async (req, res) => {
      const crusor = await soldCollection.find({});
      const result = await crusor.toArray();
      res.send(result);
    });

    // get single sold product

    app.get(`/sold/:email`, async (req, res) => {
      const email = req.params.email
      const crusor = await soldCollection.find({ email });
      const result = await crusor.toArray();
      res.send(result);
    });

    // get Cupon
    app.get("/checkcupon", async (req, res) => {
      const cupon = req.body.data;
      console.log(cupon);
      // const cursor = await cuponCollection.findOne({ cupon });
      // if (cursor.cupon.toLowerCase() !== cupon.toLowerCase()) {
      //   res.send({ message: false });
      // }
      // res.send({ message: true });
    });

    // post Cupon

    app.post("/cupon", async (req, res) => {
      const cupon = req?.body;
      const result = await cuponCollection.insertOne(cupon);

      res.send(result);
    });

    // stripe integration

    // app.post("/create-payment-intent", async (req, res) => {
    //   // sold product total amount

    //   const amount = body.data;

    //   const { items } = req.body;
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: calculateOrderAmount(items),
    //     currency: "usd",
    //     amount: amount,
    //     payment_method_types: ["card"],
    //     automatic_payment_methods: {
    //       enabled: true,
    //     },
    //   });

    //   res.send({
    //     clientSecret: paymentIntent.client_secret,
    //   });
    // });
  } finally {
    // await client.close();
  }
}

app.get("/", (req, res) => {
  res.send("<h1>Hello !</h1>");
});
run().catch(console.dir);
app.get("/addproduct", (req, res) => {
  console.log(req, body, client);
});

app.get("/", (req, res) => {
  res.send("<h2>HI I am Great!</h2>");
});
app.listen(PORT, () => {
  console.log("App is running on ", PORT);
});
