import React from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import './ThemeToggleApp.css'; // Import CSS file for styles

// 1. Tạo Slice cho Theme
const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'light' }, // Mặc định là light mode
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'; // Chuyển đổi giữa light và dark
    },
  },
});

// 2. Lấy Actions và Reducer từ Slice
const { toggleTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;

// 3. Tạo Store Redux
const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// 4. Component ThemeToggleApp
function ThemeToggleApp() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Gọi action toggleTheme khi nhấn nút
  };

  return (
    <div className={`app-container ${theme}-mode`}>
      <h1 className="app-header">Toggle Theme (Dark/Light Mode)</h1>
      <button onClick={handleToggleTheme} className="theme-toggle-btn">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <p className="app-description">Current theme is {theme} mode.</p>
    </div>
  );
}

// 5. Component tổng (Provider gói Redux)
export default function ThemeToggleAppWrapper() {
  return (
    <Provider store={store}>
      <ThemeToggleApp />
    </Provider>
  );
}
