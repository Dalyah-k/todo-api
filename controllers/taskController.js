const Task = require("../model/Task");
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user", "name email");

    res.json({
      message: "Tasks retrieved successfully",
      tasks: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("user", "name email");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task retrieved successfully",
      task: task,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      completed: req.body.completed,
      user: req.user.id,
    });

    const savedTask = await newTask.save();
    await savedTask.populate("user", "name email");

    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        $set: {
          ...(req.body.title !== undefined && { title: req.body.title }),
          ...(req.body.completed !== undefined && {
            completed: req.body.completed,
          }),
        },
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

    await updatedTask.populate("user", "name email");

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
