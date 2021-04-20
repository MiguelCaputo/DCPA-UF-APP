const { query, Router } = require("express");
const express = require("express");
const myParser = require("body-parser");

//Initializing variables
var app = express();

const port = 3001;
const MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const { ObjectID } = require("bson");
const uri =
  "mongodb+srv://test:t3st1ngpl34s3@cluster0.ecjyu.mongodb.net/test?retryWrites=true&w=majority";
app.use(cors());

//Increasing the limit of the request
app.use(myParser.json({ limit: "200mb" }));
app.use(
  myParser.urlencoded({ limit: "200mb", extended: true, parameterLimit: 50000 })
);

//Confirming that the server connected
app.get("/", (req, res) => {
  res.send({ message: "Connected!" });
});

//Setting up the connections with the event table
app.get("/event", async (req, res) => {
  async function test() {
    const uri =
      "mongodb+srv://test:t3st1ngpl34s3@cluster0.ecjyu.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const cursor = client.db("test").collection("event").find();
    const results = await cursor.toArray();
    console.log(results);
    res.send({ message: results });
  }
  test();
});

//Setting up the addition of an event
app.post("/addEvent", (req, res) => {
  var start = req.body.start;
  var end = req.body.end;
  var title = req.body.title;
  var summary = req.body.summary;
  var request = [
    {
      _id: new ObjectID(),
      start: start,
      end: end,
      title: title,
      summary: summary,
    },
  ];
  console.log(req.query);
  async function test() {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://test:t3st1ngpl34s3@cluster0.ecjyu.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const cursor = client.db("test").collection("event").insertMany(request);
    const results = await cursor;
    console.log(results);
    res.send({ message: results });
    //client.close();
  }
  test();
});

//Setting up the login confirmation
app.get("/login", async (req, res) => {
  async function test() {
    const uri =
      "mongodb+srv://test:t3st1ngpl34s3@cluster0.ecjyu.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const cursor = client.db("test").collection("users").find();
    const results = await cursor.toArray();
  }
  test();
});

// Deleting events
app.post("/delete", async (req, res) => {
  var start = req.body.start;
  var end = req.body.end;
  var title = req.body.title;
  var summary = req.body.summary;
  var request = [
    {
      start: start,
      end: end,
      title: title,
      summary: summary,
    },
  ];
  console.log(req.query);
  async function test() {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://test:t3st1ngpl34s3@cluster0.ecjyu.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const cursor = client.db("test").collection("event").deleteMany(request[0]);
    const results = await cursor;
    console.log(results);
    res.send({ message: results });
    //client.close();
  }
  test();
});

app.listen(process.env.PORT || port, () => {
  //Checking that the server is working
  console.log(`listening at http://localhost:${port}`);
});
