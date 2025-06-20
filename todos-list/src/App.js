import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import {Todos} from "./component/Todos";
import {useEffect, useState} from "react";

function App() {
  const onDelete = (todo) => {
    console.log("Delete This Todo", todo);

    setTodos(todos.filter((e)=>{
      return e !== todo;
    }))
  };
  const [todos, setTodos] = useState([
    {
      sno: 1,
      title: "Goto The gym",
      Description: "Do heavy workout as much you can",
    },
    {
      sno: 2,
      title: "Goto The office",
      Description: "Do work nicely",
    },
    {
      sno: 3,
      title: "Go for a run",
      Description: "Go and run as long as you can",
    },
    {
      sno: 4,
      title: "Cinema",
      Description: "Cinema is a ultimate pleasure.",
    },
  ]);
  return (
    <div>
      <Header title="TodosList" searchBar={true} />
      <Todos todos={todos} onDelete={onDelete} />
      <Footer />
    </div>
  );
}

export default App;
