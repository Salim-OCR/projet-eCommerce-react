import React from "react";
import { Link } from "react-router-dom";

const Card = ({ produit }) => {
  return (
    <li className="card">
      <div className="img_produit">
        <img src={produit.url} alt={produit.nomProduit} />
      </div>
      <div className="produit">
        <h3>{produit.nomProduit}</h3>
        <p>{produit.description}</p>
        <button className="btnProduit">
          <Link to={`/product/${produit.id}`}>Voir le produit</Link>
        </button>
      </div>
    </li>
  );
};

export default Card;
