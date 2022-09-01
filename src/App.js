import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuid } from 'uuid'
import "./App.css"

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem
      (LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos);
  }
  return (
    <div className='container'>
      <TodoList className="todo-list" todos={todos} toggleTodo={toggleTodo} />
      <div className='form-controls'>

        <input className='text-input' ref={todoNameRef} type="text" />
        <button onClick={handleAddTodo} className="add-todo">Add Todo</button>
        <button onClick={handleClearTodos} className="clear-todo">Clear Complete</button>
        <div className='todo-indicator'>{todos.filter(todo => !todo.complete).length} left to do</div>
      </div>
    </div>

  )
};

export default App;
