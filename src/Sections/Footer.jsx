import React from 'react';
import { FaTruck, FaWrench, FaHeadset, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Scss/Footer.scss';

const Footer = ({ setIsMenuOpen }) => {
  return (
    <footer>
  <div className="footer-container">
    {/* Colonne gauche */}
    <div className="section left-column">
      <div className="icon-container">
        <FaTruck /> Livraison rapide
      </div>
      <div className="icon-container">
        <FaEnvelope /> 
        <a href="mailto:contact@proreliure.fr">contact@proreliure.fr</a>
      </div>
      <div className="icon-container">
        <FaHeadset /> Assistance commerciale
      </div>
      <div className="icon-container">
        <FaWrench /> Installation et dépannage
      </div>
      <div className="icon-container">
        <FaPhone /> Contact par téléphone : 06 52 52 81 51
      </div>
    </div>
    <div className="section center-column">
          <span className="pro">DESTRUCTEURS</span><span className="reliure">-ARCHIVES</span>
        </div>
    {/* Colonne droite */}
    <div className="section right-column">
      <Link to="/FAQ" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
      <Link to="/Contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
      <Link to="/Utilisation" onClick={() => setIsMenuOpen(false)}>Conseil d'experts</Link>
      <a href="/mentions-legales">Mentions légales</a>
      <a href="/conditions-generales-de-vente">Conditions générales de vente</a>
      {/* <p className="phone-contact2">Contact par téléphone : 06 52 52 81 51</p> */}
    </div>
  </div>
</footer>

  );
};

export default Footer;
