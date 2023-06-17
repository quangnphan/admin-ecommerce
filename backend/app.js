require("dotenv").config();

const cors = require("cors");

const express = require("express");
const app = express();

const connectToDb = require("./db/connect");

//routers

//app
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>dasdsadas</h1>");
});

//routes


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
