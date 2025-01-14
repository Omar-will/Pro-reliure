import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../Scss/Header.scss';
import SearchBar from '../Components/SearchBar';
import { getFirestore, collection, query as firebaseQuery, where, getDocs } from "firebase/firestore";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
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

      navigate('/search-results', { state: { results, searchQuery } });
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category) => {
    if (category.includes('Location')) {
      navigate(`/location-destructeurs/${encodeURIComponent(category)}`);
    } else {
      navigate(`/destructeurs-de-documents/${encodeURIComponent(category)}`);
    }

    setIsDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleMouseEnter = (menu) => {
    if (menu === 'destructeurs') {
      setIsDropdownOpen(true);
      setIsLocationDropdownOpen(false);
    } else if (menu === 'location') {
      setIsLocationDropdownOpen(true);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const banner = document.querySelector(".banner");
    if (isMenuOpen) {
      banner.classList.add("force-visible");
    } else {
      banner.classList.remove("force-visible");
    }
  }, [isMenuOpen]);
  

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setIsLocationDropdownOpen(false);
  };

  document.addEventListener("scroll", function () {
    const banner = document.querySelector(".banner");
    const scrollPosition = window.scrollY;
  
    // Ajoute ou retire la classe `fixed` en fonction de la position de défilement
    if (scrollPosition > 50) { // Ajustez `50` selon le déclenchement souhaité
      banner.classList.add("fixed");
    } else {
      banner.classList.remove("fixed");
    }
  });

  return (
    <header className="navbar">
      <nav>
        <div className="logo">
        <Link to="/" className="logo-link">
          <span className="pro">DESTRUCTEURS</span><span className="reliure">ARCHIVES</span>
          </Link>
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="banner">
          <button className="hamburger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/nos-services" onClick={() => setIsMenuOpen(false)}>Nos Services</Link></li>

            <li 
              className="dropdown" 
              onMouseEnter={() => handleMouseEnter('destructeurs')} 
              onMouseLeave={handleMouseLeave}
            >
              <button className="dropdown-button">
                Destructeurs
                <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}></span>
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <div className="dropdown-section">
                    <li className="dropdown-title">Destructeurs de documents</li>
                    <li onClick={() => handleCategoryClick('toutes-les-machines')}>Toutes les machines</li>
                    <li onClick={() => handleCategoryClick('destructeurs-de-bureau')}>Destructeurs de bureau</li>
                    <li onClick={() => handleCategoryClick('destructeurs-de-forte-capacité')}>Destructeurs de forte capacité</li>
                    {/* <li onClick={() => handleCategoryClick('destructeurs-de-données')}>Destructeurs de supports de données numériques</li> */}
                  </div>
                  <div className="dropdown-section">
                    <li className="dropdown-title">Niveaux de sécurité</li>
                    <li onClick={() => handleCategoryClick('p-1')}>P-1 : Documents courants</li>
                    <li onClick={() => handleCategoryClick('p-2')}>P-2 : Documents internes</li>
                    <li onClick={() => handleCategoryClick('p-3')}>P-3 : Documents sensibles</li>
                    <li onClick={() => handleCategoryClick('p-4')}>P-4 : Documents confidentiels</li>
                    <li onClick={() => handleCategoryClick('p-5')}>P-5 : Documents ultra-confidentiels</li>
                    <li onClick={() => handleCategoryClick('p-6')}>P-6 : Documents secrets</li>
                    <li onClick={() => handleCategoryClick('p-7')}>P-7 : Documents ultra-secrets</li>
                  </div>
                  <div className="dropdown-section">
                    <li className="dropdown-title">Type de coupe</li>
                    <li onClick={() => handleCategoryClick('coupe-croisée')}>Coupe croisée</li>
                    <li onClick={() => handleCategoryClick('coupe-fibres')}>Coupe fibres</li>
                  </div>
                  <div className="dropdown-section">
                    <li className="dropdown-title">Accessoires</li>
                    <li onClick={() => handleCategoryClick('sacs-plastique')}>Sacs plastique</li>
                    <li onClick={() => handleCategoryClick("huiles-de-lubrification")}>Bouteille d'huile de lubrification</li>
                    <li onClick={() => handleCategoryClick('sacs-en-papier-kraft')}>Sacs en papier kraft</li>
                    <li onClick={() => handleCategoryClick('fil-de-ligature')}>Fil de ligature</li>
                    <li onClick={() => handleCategoryClick('lingettes-de-nettoyage')}>Lingettes de nettoyage</li>
                  </div>
                  <div className="dropdown-section">
                    <li className="dropdown-title">Destructeurs de supports de données numériques</li>
                    <li onClick={() => handleCategoryClick('destructeurs-de-données')}>Toutes les machines</li>
                  </div>
                  <div className="dropdown-sections">
                    <li className="dropdown-title">Marques</li>
                    <li onClick={() => handleCategoryClick('ideal')}>Ideal</li>
                    <li onClick={() => handleCategoryClick('hsm')}>Hsm</li>
                  </div>
                </ul>
              )}
            </li>

            <li 
              className="dropdown" 
              onMouseEnter={() => handleMouseEnter('location')} 
              onMouseLeave={handleMouseLeave}
            >
              <button className="dropdown-button">
                Location de Destructeurs
                <span className={`arrow ${isLocationDropdownOpen ? 'up' : 'down'}`}></span>
              </button>
              {isLocationDropdownOpen && (
                <ul className="dropdown-menus">
                  <div className="dropdown-section">
                    <li className="dropdown-title">Destructeurs de documents</li>
                    <li onClick={() => handleCategoryClick('Toutes-les-Locations')}>Toutes les locations</li>
                    <li onClick={() => handleCategoryClick('Location-Destructeurs-de-bureau')}>Location destructeurs de bureau</li>
                    <li onClick={() => handleCategoryClick('Location-Destructeurs-de-forte-capacité')}>Location destructeurs de forte capacité</li>
                  </div>
                </ul>
              )}
            </li>

            <li><Link to="/matelasseur-de-cartons" onClick={() => setIsMenuOpen(false)}>Matelasseur De Cartons</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
        <p className="showRoom">contact@destructeurs-archives.fr</p>
        <p className="phone-contact">Contact : 06 52 52 81 51</p>
      </nav>
    </header>
  );
};

export default Header;
