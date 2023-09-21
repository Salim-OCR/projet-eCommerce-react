import React from "react";

const QuantityInput = ({ quantity, onQuantityChange }) => {
  return (
    <div className="quantity">
      <h4>Quantité:</h4>
      <input
        type="number"
        value={quantity}
        onChange={(e) => onQuantityChange(parseInt(e.target.value))}
        min="1"
        max="5"
      />
    </div>
  );
};

export default QuantityInput;
