import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const intervalId = setInterval(updateCurrentTimeFooter, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const updateCurrentTimeFooter = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('current-time-footer').textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
  };

  const addToDoList = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') {
      alert('Du musst etwas eingeben!');
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      text: trimmedValue,
      checked: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          Todo List{' '}
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-checkbox-2652909-2202826.png"
            alt="Checkbox"
          />
        </h2>
        <div className="row">
          <input
            type="text"
            placeholder="Enter task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addToDoList()}
          />
          <button onClick={addToDoList}>Add</button>
        </div>
        <ul id="list-container">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.checked ? 'checked' : ''}
              onClick={() => toggleTask(todo.id)}
            >
              {todo.text}
              <span
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(todo.id);
                }}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
        <footer>
          <p>
            Current Time: <span id="current-time-footer">00:00:00</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
