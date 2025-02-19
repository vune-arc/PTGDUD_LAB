import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [inputValueA, setInputValueA] = useState("");
  const [inputValueB, setInputValueB] = useState("");
  const [cal, setCal] = useState(0);
  const [operator, setOperator] = useState("");
  const handleSelectCal = (e) => {
    const numA = parseFloat(inputValueA);
    const numB = parseFloat(inputValueB);
    setOperator(e.target.value);
    if (e.target.value === "+") {
      setCal(numA + numB);
    } 
    if (e.target.value === "-") {
      setCal(numA - numB);
    }
    if (e.target.value === "*") {
      setCal(numA * numB);
    }
    if (e.target.value === "/") {
      setCal(numA / numB);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="input a"
        value={inputValueA}
        onChange={(e) => setInputValueA(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="input b"
        value={inputValueB}
        onChange={(e) => setInputValueB(e.target.value)}
      />
      <br />
      <input
        onChange={handleSelectCal}
        type="radio"
        name="group"
        value="+"
      />{" "}
      <span>+</span>
      <input
        onChange={handleSelectCal}
        type="radio"
        name="group"
        value="-"
      />{" "}
      <span>-</span>
      <input
        onChange={handleSelectCal}
        type="radio"
        name="group"
        value="*"
      />{" "}
      <span>*</span>
      <input
        onChange={handleSelectCal}
        type="radio"
        name="group"
        value="/"
      />{" "}
      <span>/</span>
      {/* <span>{inputValue}</span> */}
      <br />
      <Button
        inputValueA={inputValueA}
        inputValueB={inputValueB}
        cal={cal}
        valueResult={inputValueA}
      >
        Click
      </Button>
    <br />
    <span>Kết quả phép tính {operator} là :{cal}</span>
    </>
    
  );
}

export default App;
