import React from "react";

const OptionsList = ({ options, selectedOptions, onOptionChange }) => {
  return (
    <div className="options">
      <h4>Options:</h4>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => onOptionChange(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionsList;
