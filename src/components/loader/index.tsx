import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-[2px]">
      <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
