import React from 'react';
import arrayProduits from "../data/arrayProduits";
import Card from '../components/Card';
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
      <header>
        <h1>Meuble moderne</h1>
      </header>
      <section id="pageHome">
        <div className="liens">
          <Link className="lien" to={"/panier"}>
            panier
          </Link>
        </div>
        <ul>
          {arrayProduits.map((produit) => (
            <Card key={produit.id} produit={produit} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;