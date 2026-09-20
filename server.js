require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to To Do list API");
});

app.use("/api", taskRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);

    return res.status(400).json({
      message: messages,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  res.status(500).json({
    message: "Something went wrong",
  });
});

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("MONGO_URI host:", process.env.MONGO_URI?.split("@")[1]);

mongoose
  .connect(process.env.MONGO_URI, {
    family: 4,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
