import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import './Login.css';

// --------------------- Auth Slice ---------------------
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

const { login, logout } = authSlice.actions;
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// --------------------- Login Component ---------------------
function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) return alert("Vui lòng nhập đầy đủ!");
    const user = {
      username,
      email: `${username}@example.com`,
    };
    dispatch(login(user));
  };

  return (
    <div className="auth-box">
      <h2>Đăng nhập</h2>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}

// --------------------- Welcome Component ---------------------
function Welcome() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="auth-box">
      <h2>Chào mừng, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={() => dispatch(logout())}>Đăng xuất</button>
    </div>
  );
}

// --------------------- Inner App ---------------------
function InnerApp() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="auth-wrapper">
      {isLoggedIn ? <Welcome /> : <Login />}
    </div>
  );
}

// --------------------- App with Provider ---------------------
export default function AuthApp() {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  );
}
