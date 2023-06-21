require("dotenv").config();
require("express-async-errors");

const cors = require("cors");

const express = require("express");
const app = express();

const connectToDb = require("./db/connect");

//routers
const productsRouter = require("./routes/products");
const cateRouter = require("./routes/categories");

//errorhandler
const notFound = require('./middleware/not-found')

//app
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>dasdsadas</h1>");
});

//routes
app.use("/api/ecom", productsRouter);
app.use("/api/ecom", cateRouter);
app.use(notFound);

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
