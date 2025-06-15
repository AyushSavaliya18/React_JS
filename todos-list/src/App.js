import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import {Todos} from "./component/Todos";

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
      title: "Go for a run",
      Description: "Go and run as long as you can",
    },
  ];
  return (
    <div>
      <Header title="TodosList" searchBar={true} />
      <Todos todos={todos} />
      <Footer />
    </div>
  );
}

export default App;
