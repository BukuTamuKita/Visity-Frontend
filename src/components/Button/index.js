import React from "react";

const Button = ({ content, action, prop, height, width, disabled }) => {
  return (
    <button
      className={`px-4 py-2 text-white border-2 border-white rounded-lg transition bg-indigo-700 hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${height} ${width} ${prop}`}
      type="submit"
      disabled={disabled} 
      onClick={action}
    >
      { content }
    </button>
  );
};

export default Button;