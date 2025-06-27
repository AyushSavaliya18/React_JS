import React from "react";

export const TodoItem = ({todo, onDelete}) => {
  const cardStyle = {
    background: "linear-gradient(135deg,rgb(224, 226, 227),rgb(217, 225, 232))",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    color: "#0d47a1",
    minHeight: "180px",
  };

  const btnStyle = {
    backgroundColor: "#e53935",
    border: "none",
    color: "#fff",
    padding: "5px 12px",
    borderRadius: "5px",
    fontSize: "0.9rem",
  };

  return (
    <div className="col-md-4 my-3">
      <div style={cardStyle}>
        <h5 className="fw-bold">{todo.title}</h5>
        <p className="mb-2">{todo.Description}</p>
        <p className="text-muted small">S.No: {todo.sno}</p>
        <button style={btnStyle} onClick={() => onDelete(todo)}>
          Delete
        </button>
      </div>
    </div>
  );
};
