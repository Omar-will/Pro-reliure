import React from 'react';
import { FaTruck, FaWrench, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Scss/Footer.scss';

const Footer = ({ setIsMenuOpen }) => {
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
        <a href="/conditions-generales-de-vente">Conditions générales de vente</a>
        <Link to="/Utilisation" onClick={() => setIsMenuOpen(false)}>Conseil d'experts</Link>
        <Link to="/FAQ" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
        <Link to="/Contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        <p className="phone-contact2">Contact par téléphone : 06 52 52 81 51</p>
      </div>
    </footer>
  );
};

export default Footer;
