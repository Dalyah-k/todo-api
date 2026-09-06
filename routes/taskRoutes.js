const express = require("express");
const router = express.Router();
const Task = require("../model/Task");

// 1. GET ALL TASKS
router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// 2. GET SINGLE TASK BY ID
router.get("/tasks/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}); // 👈 مهم جدًا

// 3. CREATE NEW TASK (POST)
router.post("/tasks", async (req, res, next) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      completed: req.body.completed,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
});

// 4. UPDATE TASK (PUT)
router.put("/tasks/:id", async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});
// 5. DELETE TASK
router.delete("/tasks/:id", async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
