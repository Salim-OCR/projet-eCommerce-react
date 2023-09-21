import React, { useState } from "react";
import WrappedBasketForm from "../components/Formulaire/WrappedBasketForm";
import { Link } from "react-router-dom";

const Basket = () => {
  // Récupérer les produits du panier depuis le localStorage
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Calculer la somme totale des prix totaux
  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Fonction pour supprimer un élément du panier
  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    const removedItem = updatedCart.splice(index, 1)[0]; // Retourne l'élément supprimé
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Mise à jour des prix
    const updatedPrices = JSON.parse(localStorage.getItem("prices"));
    const updatedTotalAmount = totalAmount - removedItem.totalPrice;
    const updatedPricesArray = updatedPrices.filter(
      (price) => price !== removedItem.totalPrice
    );

    localStorage.setItem("totalAmount", updatedTotalAmount.toString());
    localStorage.setItem("prices", JSON.stringify(updatedPricesArray));
  };

  return (
    <>
      <div className="liens">
        <Link className="lien" to={"/"}>
          accueil
        </Link>
      </div>
      <section id="pagePanier">
        <div className="infosPanier">
          <h2>Panier</h2>
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Options</th>
                <th>Quantité</th>
                <th>Prix total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.nomProduit}</td>
                  <td>{item.selectedOptions.join(", ")}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice.toLocaleString()} $</td>
                  <td>
                    <button onClick={() => handleRemoveItem(index)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Prix total de tous les produits :</td>
                <td>{totalAmount.toLocaleString()} $</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      <footer id="footerPanier">
        <WrappedBasketForm cartItems={cartItems} />
      </footer>
    </>
  );
};

export default Basket;
