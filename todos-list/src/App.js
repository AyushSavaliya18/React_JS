import "./App.css";
import Header from "./component/header";
import Todos from "./component/todos";
import Footer from "./component/footer";

function App() {
  return (
    <div>
      <Header title="TodosList" searchBar={true}/>
      <Todos />
      <Footer />
    </div>
  );
}

export default App;
