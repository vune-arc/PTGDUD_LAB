function Item({ data }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "100px",margin: "0 auto", justifyContent: "center" }}>
            {data.map((item, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                    <img 
                        src={item.img} 
                        width="100px" 
                        height="100px" 
                        style={{ borderRadius: "10px" }} 
                    />
                    <h1 style={{ fontSize: "18px", marginTop: "10px" }}>{item.name}</h1>
                    <p>{item.id}</p>
                </div>
            ))}
        </div>
    );
}

export default Item;
