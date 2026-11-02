const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/StudentRoutes.js");

const app = express();

const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());


// Student routes
app.use("/api/students", studentRoutes);


// Health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "Student Management API is running",
  });
});


// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});