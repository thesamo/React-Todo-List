import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit, AiTwotoneDelete, AiOutlineFileDone } from "react-icons/ai";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editTodoIndex, setEditTodoIndex] = useState(null);

  const todosGetLocalStorage = JSON.parse(localStorage.getItem("todos")) || [];

  useEffect(() => {
    setTodos(todosGetLocalStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewTodo(value);
  };

  const addTodo = () => {
    if (newTodo !== "") {
      setTodos([...todos, { todo: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const clearTodoList = () => {
    localStorage.clear();
    setTodos([]);
    setNewTodo("");
  };

  const handleEdit = (id) => {
    const updatedTodos = todos.map((item, index) => {
      if (index === id) {
        return { ...item, todo: editTodo };
      }
      return item;
    });

    setTodos(updatedTodos);
    setEditTodoIndex(null);
    setEditTodo("");
  };

  const handleRemove = (id) => {
    const removedTodo = todos.filter((todo, index) => index !== id);
    setTodos(removedTodo);
  };

  const doneTodo = (id) => {
    const updatedTodos = todos.map((item, index) => {
      if (index === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="p-4 text-center">
        <h1 className="text-4xl w-80 text-white mb-2">Todo List</h1>
        <div className="flex items-center justify-between relative">
          <input
            onChange={handleChange}
            className="border outline-none p-2 rounded-full w-full bg-transparent text-white"
            type="text"
            value={newTodo}
            onKeyPress={handleKeyPress}
          />
          <button
            className="border p-2 rounded-full w-20 absolute right-0 text-white hover:bg-gradient-to-r from-blue-600 to-green-400"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <div className="mt-3 max-h-72 overflow-auto text-white text-bold">
          {todos.map((item, id) => (
            <div
            className={`rounded-full m-2 p-2 bg-gradient-to-r from-blue-600 to-green-400 relative ${item.completed ? 'line-through text-gray-500' : ''}`}
            key={id}

            >
              {id === editTodoIndex ? (
                <input
                  className="border outline-none p-2 rounded-full w-full bg-transparent text-white"
                  type="text"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  onBlur={() => handleEdit(id)}
                  onKeyPress={(e) => e.key === "Enter" && handleEdit(id)}
                />
              ) : (
                <div>
                  {item.todo}
                  <div className="absolute right-4 top-3 cursor-pointer flex gap-3 text-blue-700">
                    <AiFillEdit
                      onClick={() => {
                        setEditTodoIndex(id);
                        setEditTodo(item.todo);
                      }}
                    />
                    <AiTwotoneDelete
                      onClick={() => handleRemove(id)}
                      className="text-red-600"
                    />
                    <AiOutlineFileDone
                      onClick={() => doneTodo(id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="border px-4 py-2 mt-4 rounded-full text-white hover:bg-gradient-to-r from-blue-600 to-green-400"
          onClick={clearTodoList}
        >
          Clear Todos
        </button>
      </div>
    </>
  );
}

export default App;

