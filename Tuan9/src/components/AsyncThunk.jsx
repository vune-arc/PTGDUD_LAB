import React, { useEffect } from 'react';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// --------------------- Tạo Async Thunk ---------------------
const fetchUsers = createAsyncThunk(
  'users/fetchUsers', // Tên action
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  }
);

// --------------------- Tạo Slice cho Users ---------------------
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle', // Trạng thái của dữ liệu (idle, loading, succeeded, failed)
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// --------------------- Tạo Store ---------------------
const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

// --------------------- Component Chính ---------------------
function App() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  return (
    <div className="App">
      <h1>User List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --------------------- Wrapper với Provider ---------------------
export default function WrappedApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
