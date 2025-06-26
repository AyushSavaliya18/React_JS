import React from "react";
import {TodoItem} from "./TodoItem";

export const Todos = (props) => {
  return (
    <div className="container">
      <h3 className="text-center">Todos List</h3>
      {props.todos.length == 0 ? (
        <div className="card w-96 mx-auto mt-10" style={{width: "230px" ,marginRight:"-500px"}}>
          <div className="card-body">
            <h5 className="card-title">No Todos To Display</h5>
            <a href="http://localhost:3000" className="btn btn-primary">
              Todos
            </a>
          </div>
        </div>
      ) : (
        props.todos.map((todo) => {
          return (
            <TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete} />
          );
        })
      )}
    </div>
  );
};
