'use client'

import { useEffect, useState } from "react"

export default function Page() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState(""); // 1. Add state for new todo

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json()).then(res => setTodos(res.todos))
  }, []);

  const handleNewTodoChange = (e) => { // 2. Handle new todo change
    setNewTodo(e.target.value);
  };

  const addTodo = () => { // 3. Add todo function
    const todo = { id: Date.now(), todo: newTodo };
    setTodos([...todos, todo]);
    setNewTodo(""); // Clear input after adding
  };

  const deleteTodo = (id) => { // 4. Delete todo function
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id) => { // 5. Update todo function
    const newTodoText = prompt("Edit todo:");
    if (newTodoText) {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: newTodoText } : todo));
    }
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <input type="text" value={newTodo} onChange={handleNewTodoChange} placeholder="Add new todo" />
      <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
      onClick={addTodo}>Add</button>
      <ul>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map(todo => (
            <li key={todo.id}>
              {todo.todo}
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
              onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
              onClick={() => updateTodo(todo.id)}>Update</button>
            </li>
          ))
        ) : (
          <li>No todos found.</li>
        )}
      </ul>
    </div>
  )
}