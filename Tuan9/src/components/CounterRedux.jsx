import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 1. Reducer
const initialState = { count: 0 };
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// 2. Store
const store = createStore(counterReducer);

// 3. Component dùng Redux
function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch({ type: 'DECREMENT' })} style={{ fontSize: '1.5rem', marginRight: '1rem' }}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })} style={{ fontSize: '1.5rem' }}>
        +
      </button>
    </div>
  );
}

// 4. Component tổng (gói Redux)
export default function CounterApp() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
