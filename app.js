// Adding library
const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/rootRoute");
require("dotenv").config();

// Create express app
const app = express();

// Use express modules
app.use(cors());
app.use(express.json());

// port 3000 is being used by MochiMachi client side
app.set("port", process.env.PORT || 3001);

// Distribute requests to routes
app.use("/", rootRouter);

// ------Below is default set up for express----
// Hanlde 404
app.all("*", (req, res) => {
  return res.status(404).send("Damn! Resource not found");
});

// Express server listening
app.listen(app.get("port"), (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server listening at port: ${app.get("port")}`);
});

// Export the Express API for Vercel to turn Express into a serverless function
module.exports = app;
