import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../Scss/Header.scss';
import SearchBar from '../Components/SearchBar';
import { getFirestore, collection, query as firebaseQuery, where, getDocs } from "firebase/firestore";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleSearch = async (searchQuery) => {
    try {
      const machinesRef = collection(db, 'machines');
      
      const nameQuery = firebaseQuery(
        machinesRef, 
        where('name', '>=', searchQuery),
        where('name', '<=', searchQuery + '\uf8ff')
      );

      const categoryQuery = firebaseQuery(
        machinesRef, 
        where('categories', 'array-contains', searchQuery)
      );

      const keywordsQuery = firebaseQuery(
        machinesRef, 
        where('keywords', 'array-contains', searchQuery)
      );

      const [nameSnapshot, categorySnapshot, keywordsSnapshot] = await Promise.all([
        getDocs(nameQuery), 
        getDocs(categoryQuery),
        getDocs(keywordsQuery)
      ]);

      const uniqueResults = new Set();
      const results = [];

      [nameSnapshot, categorySnapshot, keywordsSnapshot].forEach(snapshot => {
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          if (!uniqueResults.has(data.id)) {
            uniqueResults.add(data.id);
            results.push(data);
          }
        });
      });

      navigate('/searchResults', { state: { results, searchQuery } });
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category) => {
    navigate(`/DestructeurDeDocuments/${category}`);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="/images/proreliure.webp" alt="Logo"/>
          </Link>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
          <li><Link to="/NosServices" onClick={() => setIsMenuOpen(false)}>Nos Services</Link></li>
          <li className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
              Destructeurs de Documents 
              <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}></span>
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <div className="dropdown-section">
                  <li className="dropdown-title">Destructeurs de documents</li>
                  <li onClick={() => handleCategoryClick('Toutes les machines')}>Toutes les machines</li>
                  <li onClick={() => handleCategoryClick('Destructeurs de bureau')}>Destructeurs de bureau</li>
                  <li onClick={() => handleCategoryClick('Destructeurs de forte capacité')}>Destructeurs de forte capacité</li>
                </div>
                <div className="dropdown-section">
                  <li className="dropdown-title">Niveaux de sécurité</li>
                  <li onClick={() => handleCategoryClick('P-1')}>P-1 : Documents courants</li>
                  <li onClick={() => handleCategoryClick('P-2')}>P-2 : Documents internes</li>
                  <li onClick={() => handleCategoryClick('P-3')}>P-3 : Documents sensibles</li>
                  <li onClick={() => handleCategoryClick('P-4')}>P-4 : Documents confidentiels</li>
                  <li onClick={() => handleCategoryClick('P-5')}>P-5 : Documents ultra-confidentiels</li>
                  <li onClick={() => handleCategoryClick('P-6')}>P-6 : Documents secrets</li>
                  <li onClick={() => handleCategoryClick('P-7')}>P-7 : Documents ultra-secrets</li>
                </div>
                <div className="dropdown-section">
                  <li className="dropdown-title">Type de coupe</li>
                  <li onClick={() => handleCategoryClick('Coupe croisée')}>Coupe croisée</li>
                  <li onClick={() => handleCategoryClick('Coupe fibres')}>Coupe fibres</li>
                </div>
                <div className="dropdown-section">
                  <li className="dropdown-title">Accessoires</li>
                  <li onClick={() => handleCategoryClick('Sacs plastique')}>Sacs plastique</li>
                  <li onClick={() => handleCategoryClick("Bouteille d'huile de lubrification")}>Bouteille d'huile de lubrification</li>
                  <li onClick={() => handleCategoryClick('Sacs en papier kraft')}>Sacs en papier kraft</li>
                  <li onClick={() => handleCategoryClick('Fil de ligature')}>Fil de ligature</li>
                  <li onClick={() => handleCategoryClick('Lingettes de nettoyage')}>Lingettes de nettoyage</li>
                </div>
              </ul>
            )}
          </li>
          <li><Link to="/MatelasseurDeCartons" onClick={() => setIsMenuOpen(false)}>Matelasseur De Cartons</Link></li>
          <li><Link to="/Contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
          <p className="phone-contact">Contact par téléphone : 06 52 52 81 51</p>
        <SearchBar onSearch={handleSearch} />
      </nav>
    </header>
  );
};

export default Header;
