function Total({ result = [] }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "100px" }}>Year</th>
                        <th style={{ width: "100px" }}>Invest</th>
                        <th style={{ width: "100px" }}>Rate</th>
                        <th style={{ width: "100px" }}>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, index) => (
                        <tr key={index}>
                            <td style={{ width: "100px" }}>{item.year}</td>
                            <td style={{ width: "100px" }}>{item.invest}</td>
                            <td style={{ width: "100px" }}>{item.rate}</td>
                            <td style={{ width: "100px" }}>{item.result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Total;
