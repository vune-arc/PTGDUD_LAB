import React, { useState } from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import './TodoApp.css'; // Import CSS file for styles

// 1. Tạo Slice cho To-Do List
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

// 2. Lấy Actions và Reducer từ Slice
const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
const todoReducer = todoSlice.reducer;

// 3. Tạo Store Redux
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// 4. Component TodoApp
function TodoApp() {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo)); // Thêm todo mới
      setNewTodo(''); // Clear input
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id)); // Chuyển đổi trạng thái hoàn thành
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id)); // Xóa todo
  };

  return (
    <div className="todo-app">
      <h2 className="todo-header">To-Do List</h2>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="todo-add-btn">
          Add Todo
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <span
              onClick={() => handleToggleTodo(todo.id)} // Toggle trạng thái khi nhấp vào todo
              className="todo-text"
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleRemoveTodo(todo.id)} // Xóa todo khi nhấn Remove
              className="todo-remove-btn"
            >
              &#10006;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. Component tổng (Provider gói Redux)
export default function TodoAppWrapper() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
