import React from "react";
import { useState } from "react";
import Square from "./Square";

const ColoredSquare = ({ number }) => {
  const isEvent = number % 2 === 0;

  return <Square style={{ background: isEvent ? "red" : "green", width: '100px', height: '100px'}} />;
};

const MemoizedColoredSquare = React.memo(
    ColoredSquare,
    (prevProps, nextProps) => (prevProps.number % 2 === nextProps.number % 2),
);

export default function FeaturePage() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      />
      {/* <ColoredSquare number={number} /> */}
      <MemoizedColoredSquare number={number} />
    </div>
  );
}
