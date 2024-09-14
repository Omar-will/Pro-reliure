import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../Scss/Header.scss';
import SearchBar from '../Components/SearchBar';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleSearch = (query) => {
    console.log('Recherche effectuée avec la requête :', query);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    navigate('/DestructeurDeDocuments'); 
  };

  return (
    <header className="navbar">
      <nav>
        <div className="logo">
        <Link to="/Accueil">
          <img src="/images/thumbnail_logo-proreliure-achat-materiel-reliure-internet-removebg-preview.webp" alt="Logo" />
        </Link>
        </div>
        <ul className="nav-links">
        <li><Link to="/Accueil">Accueil</Link></li>
          <li><Link to="/NosServices">Nos Services</Link></li>
          <li className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
              Destructeur de Documents (31)
              <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}></span>
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>Destructeurs individuels (4)</li>
                <li>Destructeurs de bureau (9)</li>
                <li>Destructeurs de haut rendement (6)</li>
                <li>Destructeurs de forte capacité (9)</li>
                <li>Destructeurs de médias (3)</li>
                <li>LOCATION DESTRUCTEURS PAPIER (2)</li>
              </ul>
            )}
          </li>
          <li><Link to="/Contact">Contact</Link></li>
          <li><Link to="/Acces">Accès</Link></li>
          <li><Link to="/FAQ">FAQ</Link></li>
        </ul>
        <SearchBar onSearch={handleSearch} />
      </nav>
    </header>
  );
};

export default Header;
