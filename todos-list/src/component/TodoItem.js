import React from "react";

export const TodoItem = ({todo, onDelete}) => {
  const todoStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    height: "100%", // Fill the grid cell
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    <div style={todoStyle}>
      <div>
        <h4>{todo.title}</h4>
        <p>{todo.description}</p>
      </div>
      <button
        className="btn btn-sm btn-danger mt-3"
        onClick={() => onDelete(todo)}
      >
        Delete
      </button>
    </div>
  );
};
