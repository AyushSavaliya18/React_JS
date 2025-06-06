 import React from "react";
import {TodoItem} from "../component/TodoItem";

export const todos = (props) => {
  return (
    <div className="container">
      <h3>Todos List </h3>
      {/* {this.props.todos} */}
      <TodoItem todo={todo[0]} />
    </div>
  );
};
