const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  assignTodoToUser,
} = require("../controllers/todoController");

router.get("/", getAllTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

// Assign todo to user
router.put("/:id/assign", assignTodoToUser);

module.exports = router;
