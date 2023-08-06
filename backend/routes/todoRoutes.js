const express = require("express");

const router = express.Router();

const {
  create,
  getTodos,
  updateTodo,
  deleteTodo,
  getSingle,
} = require("../controllers/todoController");

const checkAuth = require("../middleware/requireAuth");

router.use(checkAuth);

router.post("/create", create);
router.get("/get_todos", getTodos);
router.patch("/update_todo/:id", updateTodo);
router.get("/delete_todo/:id", deleteTodo);
router.get("/get_single/:id", getSingle);

module.exports = router;
