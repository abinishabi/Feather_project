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
app.use(
  cors(
    (origin = "https://api.abinish.in/user/createUser"),
    (methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]),
    (allowedHeaders = ["Content-Type", "Authorization"])
  )
);
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
app.use(
  cors({
    origin: "https://signin.abinish.in",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Your API route
app.post("/user/createUser", (req, res) => {
  // Handle the request
  res.send("User created");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

axios
  .post("https://api.abinish.in/user/createUser", {
    /* data */
  })
  .then((response) => console.log(response))
  .catch((error) =>
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    )
  );
