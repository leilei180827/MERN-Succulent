const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
const allSucculentsRouter = require("./routes/api/succulents");
const categoriesRouter = require("./routes/api/categories");
const addRouter = require("./routes/api/add");
const searchRouter = require("./routes/api/search");
const userRouter = require("./routes/api/user");
const mongoDB_URL =
  "mongodb+srv://iciness_succulents:iciness_succulents@cluster0-9oxau.mongodb.net/test?retryWrites=true&w=majority";
("mongodb+srv://iciness_succulents:iciness_succulents@cluster0-9oxau.mongodb.net/test?retryWrites=true&w=majority");

// process.env.MONGODB_URL;
//   "mongodb+srv://iciness_succulents:iciness_succulents@cluster0-9oxau.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB connected..."))
  .catch((err) => console.log("error" + err));
app.use("/api/succulents", allSucculentsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/add", addRouter);
app.use("/api/search", searchRouter);
app.use("/api/user", userRouter);
if (process.env.NODE_ENV == "production") {
  app.use(express.static("succulents-client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "succulents-client", "build", "index.html")
    );
  });
}
const port = process.env.PORT || 5000;
app.listen(port, console.log(`server started on port ${port}`));
