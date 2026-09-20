const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

// 1. GET ALL TASKS
router.get("/tasks", authMiddleware, getTasks);

// 2. GET SINGLE TASK BY ID
router.get("/tasks/:id", authMiddleware, getTaskById);

// 3. CREATE NEW TASK (POST)
router.post("/tasks", authMiddleware, createTask);
// 4. UPDATE TASK (PUT)
router.put("/tasks/:id", authMiddleware, updateTask);

// 5. DELETE TASK
router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router;
