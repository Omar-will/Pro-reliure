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
    <div className="carousel-container">
      <button className="prev-button" onClick={handlePrev}>❮</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image" />
      <div className="carousel-caption">
        <p>Protégez vos informations sensibles avec nos destructeurs de bureau performants, conçus pour une destruction rapide et sécurisée de vos documents en toute confidentialité.</p>
      </div>
      <button className="next-button" onClick={handleNext}>❯</button>
    </div>
  );
};

export default Accueil;
