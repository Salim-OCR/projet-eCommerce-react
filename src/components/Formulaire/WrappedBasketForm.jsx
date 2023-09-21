import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BasketForm from "./BasketForm"; // Assurez-vous du chemin correct

const stripePublicKey =
  "pk_test_51NicP7CMSVNcJ3W0hvN6KTTK3RPLH5GKXXCTOe82sQmygpBbOlKuyx9M1HnhwI0fQ1Ilj9vEq3OCOLF8FgoPGJHc00yhpo03Rq"; // Remplacez ceci par votre clé publiable Stripe

const stripePromise = loadStripe(stripePublicKey);

const WrappedBasketForm = ({ cartItems }) => (
  <Elements stripe={stripePromise}>
    <BasketForm cartItems={cartItems} />
  </Elements>
);

export default WrappedBasketForm;
