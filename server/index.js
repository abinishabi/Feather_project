const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./Routes/userRoute");
const connectDatabase = require("./db/db");
const axios = require("axios"); // Import axios if you plan to use it

const app = express();

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".", ".env") });

// CORS configuration
app.use(
  cors({
    origin: "https://signin.abinish.in", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

// Connect to database
connectDatabase();

// Routes
app.use("/", userRoute);

// Define a route if not handled by userRoute
app.post("/user/createUser", (req, res) => {
  // Handle the POST request here
  res.send("User created");
});

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

// Example Axios request within a function or route handler
const exampleFunction = async () => {
  try {
    const response = await axios.post(
      "https://api.abinish.in/user/createUser",
      {
        // payload
      }
    );
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error.response || error.message);
  }
};

// Call the function if needed
// exampleFunction();
