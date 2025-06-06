import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import TodoItem from "./component/TodoItem.tsx";

function App() {
  let todos = [
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
      title: " take the lunch",
      Description: "Stay o the diet eat Healthy",
    },
    {
      sno: 4,
      title: "learn new tech",
      Description: "its essencial to learn new techs",
    },
  ];
  return (
    <div>
      <Header title="TodosList" searchBar={false} />
      <Todos todos={todos} />
      <Footer />
    </div>
  );
}

export default App;
