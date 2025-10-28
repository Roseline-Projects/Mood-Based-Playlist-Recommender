import React from "react";
import "./../styles/buttons.css";

const MoodButton = ({ label, onClick }) => {
  return (
    <button className="mood-btn" onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default MoodButton;
