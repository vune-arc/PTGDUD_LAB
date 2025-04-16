import React from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Tạo Slice cho Redux
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

// 2. Lấy Actions và Reducer từ Slice
const { increment, decrement } = counterSlice.actions;
const counterReducer = counterSlice.reducer;

// 3. Tạo Store Redux
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// 4. Component Counter
function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Counter (RTK): {count}</h2>
      <button
        onClick={() => dispatch(decrement())}
        style={{ fontSize: '1.5rem', marginRight: '1rem' }}
      >
        -
      </button>
      <button
        onClick={() => dispatch(increment())}
        style={{ fontSize: '1.5rem' }}
      >
        +
      </button>
    </div>
  );
}

// 5. Component tổng (Provider gói Redux)
export default function CounterApp() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
