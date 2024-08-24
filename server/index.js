const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./Routes/userRoute");
const connectDatabase = require("./db/db");
//env config
dotenv.config({ path: path.join(__dirname, ".", ".env") });

//cors
app.use(cors({ origin: "https://signin.abinish.in" }));
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));

// connect database
connectDatabase();

// Routes
app.use("/", userRoute);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
