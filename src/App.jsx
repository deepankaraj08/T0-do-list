import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Contexts/TodoContext'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {
  const [Todos, setTodos] = useState([])

  const addTodo = (Todo) => {
    setTodos((prev) => [{ id: Date.now(), ...Todo }, ...prev])
  }

  const updateTodo = (id, Todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? Todo : prevTodo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((Todo) => Todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    )
  }

  useEffect(() => {
    const Todos = JSON.parse(localStorage.getItem('Todos'))
    if (Todos && Todos.length > 0) {
      setTodos(Todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Todos', JSON.stringify(Todos))
  }, [Todos])

  return (
    <TodoProvider
      value={{ Todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-screen py-10 px-4">
        <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl px-6 py-6 text-white backdrop-blur-lg bg-white/10 border border-white/20">
          <h1 className="text-4xl font-extrabold text-center mb-8 mt-2 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Manage Your Todos
          </h1>

          {/* Add Todo Form */}
          <div className="mb-6">
            <TodoForm />
          </div>

          {/* Todo List */}
          <div className="flex flex-col gap-y-4">
            {Todos.length > 0 ? (
              Todos.map((Todo) => (
                <div
                  key={Todo.id}
                  className="w-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <TodoItem Todo={Todo} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 italic">
                No todos yet. Add one above! 🚀
              </p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
