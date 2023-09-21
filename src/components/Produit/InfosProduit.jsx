import React from "react";

const InfosProduit = ({
  produit,
  options,
  selectedOptions,
  onOptionChange,
  quantity,
  onQuantityChange,
}) => {
  return (
    <>
      <h2> {produit.prix.toLocaleString()} $</h2>
      <h3>{produit.nomProduit}</h3>
      <p> {produit.description} </p>
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
                  className="custom-checkbox"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
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
    </>
  );
};

export default InfosProduit;
