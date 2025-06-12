import React from "react";

export const TodoItem = ({todo}) => {
  return (
    <div className="container">
      <h4>{todo.title}</h4>
      <p>{todo.Description}</p>
      <button className="btn btn-sm btn-danger">Delete</button>
    </div>
  );
};
