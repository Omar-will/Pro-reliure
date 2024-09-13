import React from 'react';
import { FaTruck, FaWrench, FaHeadset } from 'react-icons/fa';
import '../Scss/Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="section">
        <div className="icon-container">
          <FaTruck /> Livraison rapide
        </div>
        <div className="icon-container">
          <FaWrench /> Installation et dépannage
        </div>
        <div className="icon-container">
          <FaHeadset /> Assistance commerciale
        </div>
      </div>

      <div className="section">
        <div className="icon-container">
          <img src="/images/paypal.webp" alt="PayPal et moyens de paiement" />
        </div>
      </div>

      <div className="section">
        <a href="/mentions-legales">Mentions légales</a>
        <a href="/conditions-generales">Conditions générales de vente</a>
      </div>
    </footer>
  );
};

export default Footer;
