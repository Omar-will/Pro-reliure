import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../Scss/Header.scss';
import SearchBar from '../Components/SearchBar';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryClick = (category) => {
    // Redirige vers la page avec la catégorie sélectionnée
    navigate(`/DestructeurDeDocuments/${category}`);
    setIsDropdownOpen(false); // Ferme le menu après la sélection
  };

  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="/images/thumbnail_logo-proreliure-achat-materiel-reliure-internet-removebg-preview.webp" alt="Logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/NosServices">Nos Services</Link></li>
          <li className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
              Destructeur de Documents (31)
              <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}></span>
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleCategoryClick('Toutes les machines')}>Toutes les machines (4)</li>
                <li onClick={() => handleCategoryClick('Destructeurs de bureau')}>Destructeurs de bureau ()</li>
                <li onClick={() => handleCategoryClick('haut-rendement')}>Destructeurs de haut rendement (6)</li>
                <li onClick={() => handleCategoryClick('forte-capacite')}>Destructeurs de forte capacité (9)</li>
                <li onClick={() => handleCategoryClick('medias')}>Destructeurs de médias (3)</li>
                <li onClick={() => handleCategoryClick('location')}>LOCATION DESTRUCTEURS PAPIER (2)</li>
              </ul>
            )}
          </li>
          <li><Link to="/Contact">Contact</Link></li>
          <li><Link to="/Acces">Accès</Link></li>
          <li><Link to="/FAQ">FAQ</Link></li>
        </ul>
        <SearchBar onSearch={(query) => console.log('Recherche effectuée avec la requête :', query)} />
      </nav>
    </header>
  );
};

export default Header;
