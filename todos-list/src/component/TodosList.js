import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, onDelete }) => {
  return (
    <div className="container my-3">
      <h3 className="text-center">Todo List</h3>
      {todos.length === 0 ? (
        <p className="text-muted text-center">No todos to display</p>
      ) : (
        <div className="row">
          {todos.map((todo) => (
            <div key={todo.sno} className="col-md-4 mb-4">
              <TodoItem todo={todo} onDelete={onDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
