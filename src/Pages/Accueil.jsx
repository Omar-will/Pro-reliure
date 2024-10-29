import React, { useState, useEffect } from 'react';
import '../Scss/Accueil.scss';

const images = [
  'images/image1.webp',
  'images/image2.webp',
  'images/image3.webp',
];

const Accueil = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div>
      {/* Carousel */}
      <div className="carousel-container">
        <button className="prev-button" onClick={handlePrev}>❮</button>
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex}`} 
          className="carousel-image active" 
        />
        <div className="carousel-caption">
          <p>Protégez vos informations sensibles <br /> avec nos destructeurs de bureau performants, <br /> conçus pour une destruction rapide et sécurisée <br />de vos documents en toute confidentialité.</p>
        </div>
        <button className="next-button" onClick={handleNext}>❯</button>
      </div>

      {/* Marques */}
      <div className="marques-container">
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
      </div>

      {/* Services */}
      <div className="services-section">
        <div className="service-item">
          <div className="service-circle green-border">
            <img src="images/SAV.webp" alt="Assistance" />
          </div>
          <h3>Assistance/Dépannage</h3>
          <p>Trouvez un centre technique en cas de dysfonctionnement de votre matériel de reliure professionnel hors garantie.</p>
        </div>
        <div className="service-item">
          <div className="service-circle fuchsia-border">
            <img src="images/SAV.webp" alt="Matériel Reconditionné" />
          </div>
          <h3>Optimisation d'Équipement</h3>
          <p>Réduisez vos dépenses en optant pour du matériel reconditionné pour vos besoins d'entreprise.</p>
        </div>
        <div className="service-item">
          <div className="service-circle orange-border">
            <img src="images/sous_traitance.webp" alt="Sous-traitance" />
          </div>
          <h3>Solutions de Sous-traitance</h3>
          <p>Simplifiez la gestion de vos projets avec des services de sous-traitance, tout en profitant d’un service clé en main.</p>
        </div>
        <div className="service-item">
          <div className="service-circle blue-border">
            <img src="images/time.webp" alt="Conseil des Experts" />
          </div>
          <h3>Livraison</h3>
          <p>Rapide et fiable pour toutes vos commandes dans et seulement toute l'Île-de-France.</p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
