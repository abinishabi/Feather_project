import React from "react";

const CustomButton = ({ button, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{button}</button>
    </div>
  );
};

export default CustomButton;
