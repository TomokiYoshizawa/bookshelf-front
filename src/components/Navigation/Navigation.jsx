import "./Navigation.scss";
import logo from "../../assets/images/logo_blue_2.png";
import { useState } from "react";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navigation">
      <div className="navigation__img-container">
        <img src={logo} alt="logo" className="navigation__img" />
      </div>
      <div className="navigation__search-container">
        <input
          type="text"
          className="navigation__search-input"
          placeholder="Search"
        />
      </div>
      <div className="navigation__menu-container">
        <button
          className={`navigation__menu-button ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="navigation__menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className={`navigation__menu ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li className="navigation__modal">Login</li>
            <li className="navigation__modal">Add New Book</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
