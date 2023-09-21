import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Basket from "./pages/Basket";
import Confirm from "./pages/Confirm";
import Home from "./pages/Home";
import Produit from "./pages/Produit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Produit />} />
        <Route path="/panier" element={<Basket />} />
        <Route path="/confirm/:orderNumber" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
