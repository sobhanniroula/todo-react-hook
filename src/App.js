import React, { useState } from 'react';
import './App.css';


function Todo({ todo, index, completeTodo, deleteTodo }) {
  return (
    <div 
      style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}
      className="todo"
    >
      { todo.text }
      <div>
        <button onClick={() => completeTodo(index)}>Finish</button>
        <button onClick={() => deleteTodo(index)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}


function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="write something.." />
    </form>
  );
}


function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Have breakfast',
      isCompleted: false
    },
    {
      text: 'Have lunch',
      isCompleted: false
    },
    {
      text: 'Have dinner',
      isCompleted: false
    },
    {
      text: 'sleep',
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  return (
    <div className="app">
      <h1>ToDo List</h1>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo 
            key={index} 
            index={index} 
            todo={todo} 
            completeTodo={completeTodo}  
            deleteTodo={deleteTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
