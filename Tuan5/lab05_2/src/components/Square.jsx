function Square({ style }) {
  {
    console.log("Square re-render");
  }
  return (
    <>
      <div style={style}></div>
    </>
  );
}

export default Square;
