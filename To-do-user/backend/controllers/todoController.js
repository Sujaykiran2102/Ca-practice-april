const Todo = require("../models/Todo");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("userId");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const createTodo = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const todo = new Todo({ title, description, userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: "Failed to create todo" });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updated = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update todo" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete todo" });
  }
};

const assignTodoToUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, { userId }, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: "Failed to assign todo to user" });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  assignTodoToUser,
};
