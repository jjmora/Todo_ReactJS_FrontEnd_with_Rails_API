import './App.css';
import TodoList from "./TodoList/TodoList"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do List</h1>
        <h2>Made with React JS with Ruby on Rails API</h2>
        <hr />
        <TodoList />
      </header>
    </div>
  );
}

export default App;
