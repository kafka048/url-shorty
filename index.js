const express = require("express");
const app = express();

const connectToMongoDB = require("./connection");
const router = require("./ROUTERS/router");

app.use(express.json()); // Middleware to parse incoming json data

connectToMongoDB("mongodb://127.0.0.1:27017/url-shorty")
    .then(() => console.log("connected to mongodb successfully"))
    .catch((err) => console.log("some error occurred ", err)); // Connecting to MongoDB

app.use("/url", router);

app.listen(5000, () => console.log("server started at port 5000"));


