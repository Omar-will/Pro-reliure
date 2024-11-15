import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../Scss/Accueil.scss';

const images = [
  'images/copeaux.WEBP',
  'images/image2.webp',
  'images/image3.webp',
];

const firebaseConfig = {
  apiKey: "AIzaSyAzf5uhhb6jaF46e6SsW46SlHYVHPetWCk",
  authDomain: "stock-proreliure.firebaseapp.com",
  projectId: "stock-proreliure",
  storageBucket: "stock-proreliure.appspot.com",
  messagingSenderId: "813766962774",
  appId: "1:813766962774:web:e58d093f1b6a3d885f15f7",
  measurementId: "G-15SVBHWPFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Accueil = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newArrivals, setNewArrivals] = useState([]);
  const [popularItems, setPopularItems] = useState([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'machines'));
        const machines = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Vérifiez que dateAdded et popularity sont correctement interprétés
        const filteredMachines = machines.filter(machine => machine.dateAdded && machine.popularity !== "");

        // Trier les machines par dateAdded et popularity
        const sortedNewArrivals = [...filteredMachines]
          .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
          .slice(0, 5);
        const sortedPopularItems = [...filteredMachines]
          .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity))
          .slice(0, 5);

        setNewArrivals(sortedNewArrivals);
        setPopularItems(sortedPopularItems);
      } catch (error) {
        console.error("Erreur lors de la récupération des machines : ", error);
      }
    };

    fetchMachines();
  }, []);

  return (
    <div className="accueil-page">
      {/* Carousel */}
      <div className="carousel-container">
        <button className="prev-button" onClick={handlePrev}>❮</button>
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex}`} 
          className="carousel-image active" 
        />
        <div className="carousel-caption">
          <p>Protégez vos informations sensibles <br /> avec nos destructeurs de bureau performants, <br /> conçus pour une destruction rapide et sécurisée <br /> de vos documents en toute confidentialité.</p>
        </div>
        <button className="next-button" onClick={handleNext}>❯</button>
      </div>

      {/* Marques */}
      {/* <div className="marques-container">
        <h2>Nos Marques</h2>
        <div className="marques-content">
          <img src="images/DSB.png" alt="HSM" />
          <img src="images/GBC.png" alt="GBC" />
          <img src="images/GMP.png" alt="GMP" />
          <img src="images/IDEAL.png" alt="IDEAL" />
          <img src="images/JBI.png" alt="JBI" />
          <img src="images/FUJIPLAT.png" alt="FUJIPLAT" />
          <img src="images/DEMPACK.png" alt="DEMPACK" />
          <img src="images/fastback.png" alt="fastback" />
          <img src="images/DSB.png" alt="HSM" />
          <img src="images/GBC.png" alt="GBC" />
          <img src="images/GMP.png" alt="GMP" />
          <img src="images/IDEAL.png" alt="IDEAL" />
          <img src="images/JBI.png" alt="JBI" />
          <img src="images/FUJIPLAT.png" alt="FUJIPLAT" />
          <img src="images/DEMPACK.png" alt="DEMPACK" />
          <img src="images/fastback.png" alt="fastback" />
        </div>
      </div> */}

      {/* Services */}
      <div className="services-section">
  <div className="service-item">
    <div className="service-circle green-border">
      <div className="img-wrapper">
        <img src="images/SAV.webp" alt="Assistance" />
        <div className="overlay">
          <p>Trouvez un centre technique en cas de dysfonctionnement de votre matériel de reliure professionnel hors garantie.</p>
        </div>
      </div>
    </div>
    <h3>Assistance/Dépannage</h3>
  </div>

  <div className="service-item">
    <div className="service-circle fuchsia-border">
      <div className="img-wrapper">
        <img src="images/Optimisation.webp" alt="Matériel Reconditionné" />
        <div className="overlay">
          <p>Équipez-vous avec des destructeurs de documents en location pour un service adapté à votre activité.</p>
        </div>
      </div>
    </div>
    <h3>Location destructeurs</h3>
  </div>

  <div className="service-item">
    <div className="service-circle orange-border">
      <div className="img-wrapper">
        <img src="images/Solution.webp" alt="Sous-traitance" />
        <div className="overlay">
          <p>Prolongez l’usage de votre matériel pour des pièces détachées en stock pour un dépannage efficace et immédiat.</p>
        </div>
      </div>
    </div>
    <h3>Pièces détachées</h3>
  </div>
</div>


      {/* Nouveautés */}
      <div className="new-arrivals-section">
        <h2>Nouveautés</h2>
        <div className="new-arrivals-content">
          {newArrivals.length > 0 ? (
            newArrivals.map((machine) => (
              <div key={machine.id} className="machine-card">
                <img src={machine.image} alt={machine.name} className="machine-image" />
                <h3 className="machine-name">{machine.name}</h3>
                <p>{machine.description}</p>
              <p>Stock: {machine.stock}</p>
              <Link to={`/machines/${machine.id}`}>
                <button>Voir le produit</button>
              </Link>
              </div>
            ))
          ) : (
            <p>Aucune nouveauté disponible.</p>
          )}
        </div>
      </div>

      {/* Produits Populaires */}
      <div className="popular-items-section">
        <h2>Produits Populaires</h2>
        <div className="popular-items-content">
          {popularItems.length > 0 ? (
            popularItems.map((machine) => (
              <div className="machine-card" key={machine.id}>
              <img src={machine.image} alt={machine.name} className="machine-image" />
              <h3>{machine.name}</h3>
              <p>{machine.description}</p>
              <p>Stock: {machine.stock}</p>
              <Link to={`/machines/${machine.id}`}>
                <button>Voir le produit</button>
              </Link>
            </div>
            ))
          ) : (
            <p>Aucun produit populaire disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accueil;
