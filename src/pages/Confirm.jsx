import React from "react";

const Confirm = () => {
  const orderNumber = localStorage.getItem("orderNumber");
  const totalAmount = localStorage.getItem("totalAmount");
  const cartItems = JSON.parse(localStorage.getItem("cart"));

  const handleReturnHome = () => {
    // Effacer toutes les données du LocalStorage
    localStorage.clear();

    // Rediriger vers la page d'accueil
    window.location.href = `/`;
  };

  return (
    <section id="pageConfirm">
      <div className="content">
        <h2>Merci pour votre achat !</h2>
        <p>
          Votre numéro de commande est : <strong>{orderNumber}</strong>
        </p>

        <h3>Récapitulatif du panier :</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="resum">
                <p>
                  {item.nomProduit} -{" "}
                  <strong>Quantité : {item.quantity}</strong>
                </p>

                <p>Options : {item.selectedOptions.join(", ")}</p>
                <h3>Prix total :{item.totalPrice.toLocaleString()} $</h3>
              </div>
            </li>
          ))}
        </ul>

        <h3>Total du montant : {totalAmount.toLocaleString()} $</h3>

        <button onClick={handleReturnHome}>Retour à la page d'accueil</button>
      </div>
    </section>
  );
};

export default Confirm;
