import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import image from '../../assets/images/image.png'
import { useNavigate } from "react-router-dom";

const Header = ({navigateWithLoading}) => {
    const navigate = useNavigate();

    const goToFAQ = () => {
        navigateWithLoading(() => navigate("/faq"));
      };
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img 
            src={image}
            alt="University Logo" 
            className="logo-image" 
          />
        </div>

        <div className="faq-button-container">
          
            <button onClick={goToFAQ} className="faq-button">FAQ</button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
