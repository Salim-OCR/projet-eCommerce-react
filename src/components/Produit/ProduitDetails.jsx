import React from "react";

const ProduitDetails = ({ produit }) => {
  return (
    <>
      <div className="img_produit">
        <img src={produit.url} alt={produit.nomProduit} />
      </div>

    </>
  );
};

export default ProduitDetails;
