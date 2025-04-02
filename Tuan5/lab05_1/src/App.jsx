import { useReducer, useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";

// Khởi tạo state ban đầu
const initialState = { result: 0, operator: "" };

// Hàm reducer xử lý phép toán
function calculatorReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { result: action.numA + action.numB, operator: "+" };
    case "SUBTRACT":
      return { result: action.numA - action.numB, operator: "-" };
    case "MULTIPLY":
      return { result: action.numA * action.numB, operator: "*" };
    case "DIVIDE":
      return {
        result:
          action.numB !== 0
            ? action.numA / action.numB
            : "Không thể chia cho 0",
        operator: "/",
      };
    default:
      return state;
  }
}

function App() {
  const inputRefA = useRef(null);
  const inputRefB = useRef(null);
  const [selectedOperator, setSelectedOperator] = useState("ADD"); // Lưu toán tử được chọn
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const input = useRef(null);

  const handleCalculate = () => {
    const numA = parseFloat(inputRefA.current.value);
    const numB = parseFloat(inputRefB.current.value);

    if (isNaN(numA) || isNaN(numB)) {
      alert("Vui lòng nhập số hợp lệ!");
      return;
    }

    if (!selectedOperator) {
      alert("Vui lòng chọn phép toán!");
      return;
    }

    dispatch({ type: selectedOperator, numA, numB });
  };

  return (
    <>
      <input ref={inputRefA} type="number" placeholder="Nhập số A" />
      <input ref={inputRefB} type="number" placeholder="Nhập số B" />
      <br />

      <label>
        <input
          type="radio"
          name="group"
          value="ADD"
          onChange={(e) => setSelectedOperator(e.target.value)}
          defaultChecked
        />{" "}
        +
      </label>
      <label>
        <input
          type="radio"
          name="group"
          value="SUBTRACT"
          onChange={(e) => setSelectedOperator(e.target.value)}
        />{" "}
        -
      </label>
      <label>
        <input
          type="radio"
          name="group"
          value="MULTIPLY"
          onChange={(e) => setSelectedOperator(e.target.value)}
        />{" "}
        *
      </label>
      <label>
        <input
          type="radio"
          name="group"
          value="DIVIDE"
          onChange={(e) => setSelectedOperator(e.target.value)}
        />{" "}
        /
      </label>

      <br />
      <button onClick={handleCalculate}>Tính toán</button>
      {/* <Button valueResult={state.result}>Kết quả</Button> */}

      <h3>
        Kết quả phép tính {state.operator} là: {state.result}
      </h3>
    </>
  );
}

export default App;
