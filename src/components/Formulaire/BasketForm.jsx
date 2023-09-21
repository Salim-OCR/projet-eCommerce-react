import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const BasketForm = ({ cartItems }) => {
  // //Mode de paiement
  const stripe = useStripe();
  const elements = useElements();

  //Mode formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValidation = async () => {
    if (
      formData.firstName.trim() === "" ||
      formData.lastName.trim() === "" ||
      formData.email.trim() === ""
    ) {
      setValidationError("Veuillez remplir tous les champs.");
    } else if (cartItems.length === 0) {
      setValidationError("Le panier est vide.");
    } else {
      setValidationError("");

      if (!stripe || !elements) {
        console.log("Stripe n'est pas encore chargé.");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        console.error("Erreur lors de la création du token :", error);
        setValidationError("Erreur lors de la validation du paiement.");
      } else {
        console.log("Token de paiement créé :", token);
        // Envoyez le token à votre backend pour traitement du paiement

        // Réinitialisez le formulaire si nécessaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
        });

        // Générer un numéro de commande fictif (ou le récupérer d'où vous le souhaitez)
        const orderNumber = generateOrderNumber();

        // Enregistrer le numéro de commande dans le localStorage
        localStorage.setItem("orderNumber", orderNumber);

        // Rediriger vers la page de confirmation
        window.location.href = `/confirm/${orderNumber}`;
      }
    }
  };

  // Générer un numéro de commande unique basé sur le timestamp (peut être adapté)
  const generateOrderNumber = () => {
    const timestamp = Date.now();
    return `${timestamp}`;
  };

  return (
    <div className="formulaire">
      <h2>Informations de l'acheteur</h2>

      <form>
        <div className="content-left">
          <div>
            <label htmlFor="firstName">Prénom:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Nom:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Adresse e-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="content-right">
          <label>Carte de crédit:</label>
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        </div>
        <div className="content-bottom">
          <button type="button" onClick={handleValidation}>
            Valider
          </button>
          {validationError && <p style={{ color: "red" }}>{validationError}</p>}
        </div>
      </form>
    </div>
  );
};

export default BasketForm;
