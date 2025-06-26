import React, { useState } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { AddTodo } from "./component/AddTodo";
import { TodoList } from "./component/TodosList";

function App() {
  // ✅ Step 1: Load todos from localStorage on first render
  const getInitialTodos = () => {
    const todos = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("todo-")) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const todo = JSON.parse(item);
            if (todo && typeof todo.sno === "number") {
              todos.push(todo);
            }
          }
        } catch (e) {
          console.error(`Error parsing ${key}:`, e);
        }
      }
    }

    todos.sort((a, b) => a.sno - b.sno);
    return todos;
  };

  // ✅ Step 2: Initialize state once
  const [todos, setTodos] = useState(() => getInitialTodos());

  // ✅ Step 3: Add todo and save to localStorage
  const addTodo = (title, description) => {
    const sno = todos.length ? todos[todos.length - 1].sno + 1 : 1;
    const newTodo = {
      sno,
      title,
      description, // 👈 updated key
    };

    localStorage.setItem(`todo-${sno}`, JSON.stringify(newTodo));
    setTodos([...todos, newTodo]);
  };

  // ✅ Step 4: Delete todo from localStorage and state
  const onDelete = (todo) => {
    localStorage.removeItem(`todo-${todo.sno}`);
    setTodos(todos.filter((e) => e.sno !== todo.sno));
  };

  return (
    <>
      <Header title="My Todo List" searchBar={true} />
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} onDelete={onDelete} />
      <Footer />
    </>
  );
}

export default App;
