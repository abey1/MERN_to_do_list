const TodoModel = require("../models/todoModel");

const create = async (req, res) => {
  const { item } = req.body;
  const { _id } = req.user;
  if (!item) {
    res.status(400).json({ error: "Todo item required" });
  }
  try {
    const todoItem = await TodoModel.create({ user_id: _id, item });
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTodos = async (req, res) => {
  const { _id } = req.user;
  try {
    const todos = await TodoModel.find({ user_id: _id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findOneAndDelete({ _id: id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findById({ _id: id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAll = (req, res) => {
  const { todos } = req.body;
  console.log(req.body);
  try {
    const result = todos.map(async (todo, index) => {
      return await TodoModel.findOneAndDelete({ _id: todo.id });
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  getTodos,
  updateTodo,
  deleteTodo,
  getSingle,
  deleteAll,
};
