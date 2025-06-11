 // ✅ src/component/Todos.js
import React from "react";
import { TodoItem } from "./TodoItem";

export default function Todos(props) {
  return (
    <div className="container">
      <h3>Todos List</h3>
      {/* Loop through todos */}
      {props.todos.map((todo) => (
        <TodoItem key={todo.sno} todo={todo} />
      ))}
    </div>
  );
}
