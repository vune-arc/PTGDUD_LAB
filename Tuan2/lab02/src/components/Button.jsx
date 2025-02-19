import React from "react";

function Button({ text, onClick, styleType }) {
  return (
    <button style={styleType} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
