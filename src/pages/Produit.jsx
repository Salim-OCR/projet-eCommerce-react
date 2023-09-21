import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import arrayProduits from "../data/arrayProduits";
import ProduitDetails from "../components/Produit/ProduitDetails";
import InfodProduit from "../components/Produit/InfosProduit";
// import OptionsList from "../components/Produit/OptionsList";
// import QuantityInput from "../components/Produit/QuantityInput";
import ErrorMessage from "../components/Produit/ErrorMessage";

const Produit = () => {
  const { id } = useParams();

  const produit = arrayProduits.find((p) => p.id === parseInt(id));

  if (!produit) {
    return <div>Produit non trouvé</div>;
  }

  const [selectedOptions, setSelectedOptions] = useState([produit.options[0]]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedOptions([produit.options[0]]);
  }, [produit.options]);

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 5) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (selectedOptions.length === 0) {
      setError(
        "Veuillez sélectionner au moins une option avant d'ajouter au panier."
      );
      return;
    }
    if (selectedOptions.length > 1) {
      setError(
        "Veuillez sélectionner qu'une option avant d'ajouter au panier."
      );
      return;
    }

    setError(""); // Reset error message

    const totalPrice = produit.prix * quantity;

    const cartItem = {
      id: produit.id,
      nomProduit: produit.nomProduit,
      selectedOptions: [...selectedOptions],
      quantity: quantity,
      totalPrice: totalPrice,
    };

    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      const cart = JSON.parse(existingCart);
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const cart = [cartItem];
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    const existingPrices = localStorage.getItem("prices");
    if (existingPrices) {
      const prices = JSON.parse(existingPrices);
      prices.push(totalPrice);
      localStorage.setItem("prices", JSON.stringify(prices));
    } else {
      const prices = [totalPrice];
      localStorage.setItem("prices", JSON.stringify(prices));
    }

    const totalPrices = JSON.parse(localStorage.getItem("prices"));
    const totalAmount = totalPrices.reduce((sum, price) => sum + price, 0);
    localStorage.setItem("totalAmount", totalAmount.toString());

    alert("Le produit a été ajouté au panier !");
  };

  return (
    <>
      <div className="liens">
        <Link className="lien" to={"/"}>
          accueil
        </Link>
        <Link className="lien" to={"/panier"}>
          panier
        </Link>
      </div>
      <section id="pageProduit">
        <div className="content">
          <ProduitDetails produit={produit} />

          <div className="infos">
            <InfodProduit
              produit={produit}
              options={produit.options}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />

            <ErrorMessage error={error} />

            <button onClick={handleAddToCart}>Ajouter au panier</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Produit;
