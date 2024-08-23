const express = require("express");
const cors = require("cors");

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "https://signin.abinish.in", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());

// Define your routes
app.post("/user/createUser", (req, res) => {
  // Handle the POST request here
  res.send("User created");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
