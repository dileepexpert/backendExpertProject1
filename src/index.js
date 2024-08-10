const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const authRoute=require("./routes/authRoute");

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MongoURL)
  .then(() => {
    console.log("MongoDb connected Successfully");
  })
  .catch((error) => {
    console.log("Connection is Failed:", error);
  });

//route
app.use("/",authRoute);

app.listen(PORT, () => {
  console.log("Server is listen on Port:", PORT);
});
