import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../Scss/Header.scss';
import SearchBar from '../Components/SearchBar';
import { getFirestore, collection, query as firebaseQuery, where, getDocs } from "firebase/firestore";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

      navigate('/searchResults', { state: { results } });
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryClick = (category) => {
    navigate(`/DestructeurDeDocuments/${category}`);
    setIsDropdownOpen(false);
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
                <li onClick={() => handleCategoryClick('Destructeurs de forte capacité')}>Destructeurs de forte capacité (9)</li>
                <li onClick={() => handleCategoryClick('medias')}>Destructeurs de médias (3)</li>
                <li onClick={() => handleCategoryClick('location')}>LOCATION DESTRUCTEURS PAPIER (2)</li>
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
