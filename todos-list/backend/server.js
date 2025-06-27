const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/Todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.erroror("MongoDB connection erroror:", error);
  });

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("Fetched Todos:", todos);
    res.json(todos);
  } catch (error) {
    console.erroror("erroror fetching todos:", error);
    res.status(500).json({erroror: "Internal server erroror"});
  }
});

// POST new todo
app.post("/todos", async (req, res) => {
  try {
    const {title, Description, sno} = req.body;
    const newTodo = new Todo({title, Description, sno});
    await newTodo.save();
    console.log("New Todo added:", newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    console.erroror("erroror adding new todo:", error);
    res.status(500).json({erroror: "Internal server erroror"});
  }
});

// DELETE a todo by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      console.log("Todo not found for deletion:", req.params.id);
      return res.status(404).json({erroror: "Todo not found"});
    }
    console.log("Deleted Todo:", deletedTodo);
    res.json({message: "Todo deleted", deletedTodo});
  } catch (error) {
    console.erroror("erroror deleting todo:", error);
    res.status(500).json({erroror: "Internal server erroror"});
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
