import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./component/Header";
import Footer from "./component/Footer";
import {Todos} from "./component/Todos";
import {AddTodo} from "./component/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/todos")
      .then((res) => {
        setTodos(res.data);
        console.log("Fetched from DB:", res.data);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = (title, description) => {
    const sno = todos.length > 0 ? todos[todos.length - 1].sno + 1 : 1;

    axios
      .post("http://localhost:8000/todos", {
        title,
        Description: description,
        sno,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
      })
      .catch((err) => {
        console.error("Error adding todo:", err);
      });
  };

  const onDelete = (todo) => {
    axios
      .delete(`http://localhost:8000/todos/${todo._id}`)
      .then(() => {
        setTodos(todos.filter((t) => t._id !== todo._id));
        console.log("Deleted from DB:", todo._id);
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  return (
    <>
      <Header />
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
      <Footer />
    </>
  );
}

export default App;
