const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
const uri = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(uri);

const fruits = [{ _id: "123456", name: "Apple" }];

app.get("/fruits", (req, res) => {
  res.send(fruits);
});

app.post("/fruits", (req, res) => {
  const fruit = req.body; // {name: "Bananaa"};
  const newFruit = { ...fruit, _id: Date.now().toString() };
  fruits.push(newFruit);
  res.send(newFruit);
  // res.send({ message: "Created" });
});

app.get("/tasks", async (req, res) => {
  try {
    const con = await client.connect();
    const response = await con.db("final").collection("tasks").find().toArray();
    await client.close();
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = req.body; // {name: "..."}
    const con = await client.connect();
    const response = await con.db("final").collection("tasks").insertOne(task);
    await client.close();
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
