import React, { useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// --------------------- BMI/Tax Calculator Slice ---------------------
const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    weight: 0,
    height: 0,
    income: 0,
    result: null,
    type: 'bmi', // 'bmi' or 'tax'
  },
  reducers: {
    updateInput: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    calculateResult: (state) => {
      if (state.type === 'bmi') {
        // Tính BMI: BMI = weight / (height * height)
        const bmi = state.weight / (state.height * state.height);
        state.result = bmi.toFixed(2);
      } else if (state.type === 'tax') {
        // Tính thuế: thuế = 10% của thu nhập
        const tax = state.income * 0.1;
        state.result = tax.toFixed(2);
      }
    },
  },
});

const { updateInput, calculateResult } = calculatorSlice.actions;
const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer,
  },
});

// --------------------- BMI/Tax Form Component ---------------------
function CalculatorForm() {
  const dispatch = useDispatch();
  const { weight, height, income, result, type } = useSelector(
    (state) => state.calculator
  );

  const [localWeight, setLocalWeight] = useState(weight);
  const [localHeight, setLocalHeight] = useState(height);
  const [localIncome, setLocalIncome] = useState(income);

  const handleInputChange = (field, value) => {
    dispatch(updateInput({ field, value }));
    if (field === 'weight') setLocalWeight(value);
    if (field === 'height') setLocalHeight(value);
    if (field === 'income') setLocalIncome(value);
  };

  const handleSubmit = () => {
    dispatch(calculateResult());
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Tính toán {type === 'bmi' ? 'BMI' : 'Thuế'}</h1>

      {type === 'bmi' ? (
        <div>
          <input
            type="number"
            value={localWeight}
            min={0}
            step="0.01"
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="Cân nặng (kg)"
            style={{ margin: '10px', padding: '5px' }}
          />
          <input
            type="number"
            value={localHeight}
            min={0}
            step="0.01"
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder="Chiều cao (m)"
            style={{ margin: '10px', padding: '5px' }}
          />
        </div>
      ) : (
        <div>
          <input
            type="number"
            value={localIncome}
            onChange={(e) => handleInputChange('income', e.target.value)}
            placeholder="Thu nhập (VND)"
            style={{ margin: '10px', padding: '5px' }}
          />
        </div>
      )}

      <button onClick={handleSubmit} style={{ padding: '10px 20px', margin: '5px' }}>
        Tính toán
      </button>

      {result !== null && (
        <div>
          <h3>Kết quả: {result}</h3>
        </div>
      )}
    </div>
  );
}

// --------------------- App Wrapper ---------------------
export default function App() {
  return (
    <Provider store={store}>
      <CalculatorForm />
    </Provider>
  );
}
