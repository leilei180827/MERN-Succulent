const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const allSucculentsRouter = require("./routes/api/succulents");
const categoriesRouter = require("./routes/api/categories");
const addRouter = require("./routes/api/add");
const mongoDB_URL = process.env.MONGODB_URL;
//   "mongodb+srv://iciness_succulents:iciness_succulents@cluster0-9oxau.mongodb.net/test?retryWrites=true&w=majority";

console.log(mongoDB_URL);
mongoose
  .connect(mongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoDB connected..."))
  .catch(err => console.log("error" + err));
app.use("/api/succulents", allSucculentsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/add", addRouter);
const port = process.env.PORT || 9000;
app.listen(port, console.log(`server started on port ${port}`));
