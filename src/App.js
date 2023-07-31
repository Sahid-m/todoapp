import "./App.css";
import { useState, react, useEffect } from "react";

function App() {
  const [newtodo, setnewtodo] = useState("");
  const [todos, settodos] = useState(() => {
    let local = localStorage.getItem("ITEMS");

    if (local == null) {
      return [];
    }

    return JSON.parse(local);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  });

  function peee(e) {
    e.preventDefault();
    settodos((crr) => {
      return [
        ...todos,
        { id: crypto.randomUUID(), title: newtodo, complited: false },
      ];
    });

    setnewtodo("");
  }

  function handlecheck(id, complited) {
    settodos((crr) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complited };
        }
        return todo;
      });
    });
  }
  function handledelete(id) {
    settodos((crr) => {
      return todos.filter((todos) => todos.id !== id);
    });
  }

  // while (true) {
  //   alert("HIII");
  // }
  console.log(todos);
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center my-4">Todo App</h1>
        <div className="card">
          <div className="cardbody">
            <form onSubmit={peee}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="task"
                  className="form-control"
                  placeholder="Enter a new task"
                  value={newtodo}
                  onChange={(e) => {
                    setnewtodo(e.target.value);
                  }}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </form>
            <ul className="list-group">
              {todos.map((todo) => {
                return (
                  <li
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      todo.complited ? "checked" : " "
                    }`}
                    key={todo.id}
                  >
                    <input
                      type="checkbox"
                      checked={todo.complited}
                      onChange={(e) => handlecheck(todo.id, e.target.checked)}
                    ></input>
                    {todo.title}
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handledelete(todo.id)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
