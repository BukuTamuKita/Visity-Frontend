import React from "react";
import Button from "../Button"

const ShowUser = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
        <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
          <p className="text-xl">Santoso S. Santoso</p>
          <p className="text-2lg">Chief Executive Officer</p>
        </div>
        <div className="right-card md:col-span-2 md:mx-2.5 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300">
          <p className="text-3xl">Meeting List</p>
        </div>
        <Button
          className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
          to="/appointment"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default ShowUser;