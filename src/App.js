import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, seteditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updateTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updateTodos);
      seteditId(0);
      setTodo("");
      return;
    }

    if (todo !== " ") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo(" ");
    }
  };

  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    seteditId(id);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit} className="todoForm">
          <input
            value={todo}
            type="text"
            placeholder="Enter your work"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "Edit" : "Add"}</button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
