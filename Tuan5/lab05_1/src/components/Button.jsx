import PropTypes from "prop-types";

function Button({ valueResult = "", children }) {
  return (
    <button
      // onClick={() => alert("Hello " + valueResult)}
      style={{
        paddingInline: "16px",
        backgroundColor: "blue",
        color: "white",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        border: "none",
        outline: "none",
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  valueResult: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
