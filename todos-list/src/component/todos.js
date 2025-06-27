import React from "react";
import { TodoItem } from "./TodoItem";

export const Todos = ({ todos, onDelete }) => {
  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Your Todos</h3>
      {todos.length === 0 ? (
        <p className="text-center text-muted">No Todos to display</p>
      ) : (
        <div className="row">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
