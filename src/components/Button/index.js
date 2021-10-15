import React, { Component } from "react";

const Button = ({ title,onClick }) => {
  return (
    <button
      class="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-indigo-500 hover:bg-indigo-500 active:bg-indigo-700 focus:ring-gray-300"
      type="submit" onClick = {onClick}
    >
      {title}
    </button>
  );
};

export default Button;
