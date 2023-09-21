import React from "react";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
        <nav className="navigation">
          <ul>
            <li>
              <NavLink
                to={"/"}
                className={(nav) => (nav.isActive ? "nav-active" : null)}
              >
                accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/product/:id"}
                className={(nav) => (nav.isActive ? "nav-active" : null)}
              >
                produit
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/basket"}
                className={(nav) => (nav.isActive ? "nav-active" : null)}
              >
                panier
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/confirm/:orderNumber"}
                className={(nav) => (nav.isActive ? "nav-active" : null)}
              >
                confirmation
              </NavLink>
            </li>
          </ul>
        </nav>
  );
};

export default Navigation;
