import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// --------------------- Counter Slice ---------------------
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

const { increment, reset, incrementByAmount } = counterSlice.actions;
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// --------------------- App Component ---------------------
function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [step, setStep] = useState(1); // Giá trị step mặc định là 1

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(step)); // Tăng theo bước người dùng nhập
  };

  const handleChangeStep = (e) => {
    const newStep = Number(e.target.value);
    if (!isNaN(newStep) && newStep > 0) {
      setStep(newStep);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Counter: {count}</h1>
      <div>
        <button onClick={() => dispatch(increment())} style={{ padding: '10px 20px', margin: '5px' }}>
          Increment
        </button>
        <button onClick={() => dispatch(reset())} style={{ padding: '10px 20px', margin: '5px' }}>
          Reset
        </button>
        <br />
        <input
          type="number"
          value={step}
          onChange={handleChangeStep}
          style={{ margin: '10px', padding: '5px' }}
        />
        <button onClick={handleIncrementByAmount} style={{ padding: '10px 20px', margin: '5px' }}>
          Increment by {step}
        </button>
      </div>
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
