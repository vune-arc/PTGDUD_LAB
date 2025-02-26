import { useState } from "react";
import Total from "./Total";

function MyComponent() {
    const [moneyInput, setMoneyInput] = useState("");
    const [vat, setVat] = useState("");
    const [target, setTarget] = useState("");
    const [result, setResult] = useState([]);

    const handleCal = () => {
        // Ensure the input values are numbers
        let money = parseFloat(moneyInput);
        let vatRate = parseFloat(vat); // Assuming VAT is a percentage
        let targetAmount = parseFloat(target);
        let year = new Date().getFullYear();
        let cal = [];
        
        while (money < targetAmount) {
            let resultAmount = money + vatRate; // Calculation based on the rate
            cal.push({ year, invest: money, rate: vatRate, result: resultAmount });
            money = resultAmount;
            year++;
        }
        setResult(cal);
    };

    return (
        <div>
            <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                        type="text"
                        value={moneyInput}
                        onChange={(e) => setMoneyInput(e.target.value)}
                        placeholder="Initial Investment"
                    />
                    <input
                        type="text"
                        value={vat}
                        onChange={(e) => setVat(e.target.value)}
                        placeholder="Rate (in %)"
                    />
                    <input
                        type="text"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="Target"
                    />
                </div>
                <div>
                    <button onClick={handleCal}>Calc</button>
                </div>
            </div>
            <Total result={result} />
        </div>
    );
}

export default MyComponent;
