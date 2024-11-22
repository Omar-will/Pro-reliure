import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import '../Scss/MatelasseursDetails.scss';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzf5uhhb6jaF46e6SsW46SlHYVHPetWCk",
  authDomain: "stock-proreliure.firebaseapp.com",
  projectId: "stock-proreliure",
  storageBucket: "stock-proreliure.appspot.com",
  messagingSenderId: "813766962774",
  appId: "1:813766962774:web:e58d093f1b6a3d885f15f7",
  measurementId: "G-15SVBHWPFH"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MatelasseursDetails = () => {
  const { id } = useParams(); // Récupère l'ID depuis les paramètres d'URL
  const [matelasseur, setMatelasseur] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchMatelasseur = async () => {
      const matelasseurDoc = doc(db, 'matelasseurs', id);
      const matelasseurSnapshot = await getDoc(matelasseurDoc);
      if (matelasseurSnapshot.exists()) {
        setMatelasseur(matelasseurSnapshot.data());
        setSelectedImage(matelasseurSnapshot.data().images[0]); // Définit l'image sélectionnée par défaut
      } else {
        console.log("Matelasseur non trouvé");
      }
    };

    fetchMatelasseur();
  }, [id]); // Met à jour le hook d'effet si l'ID change

  if (!matelasseur) {
    return <h2>Chargement des détails du matelasseur...</h2>; // Message d'attente pendant le chargement
  }

  return (
    <div className="matelasseur-details">
      {/* Grande image principale */}
      <div className="image-container">
        <img src={selectedImage} alt={matelasseur.name} className="matelasseur-image" />
      </div>

      {/* Miniatures des autres images */}
      <div className="image-thumbnails">
        {matelasseur.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${matelasseur.name} thumbnail ${index + 1}`}
            className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <div className="matelasseurTiltle">
        <a href="/contact" className="quote-button">Obtenir un devis</a>
        <h2>{matelasseur.name}</h2>
            <p className="matelasseur-description">{matelasseur.description}</p>
            </div>
            

      <div className="matelasseur-info">
        <div className="info-banner">
        <a href="#description-content" className="info-item">Fonctionnalité</a>
        <a href="#additional-info-content" className="info-item">Caractéristique</a>
        <a href="#video-container" className="info-item">Démonstration</a>
        {matelasseur.pdfUrl && (
          <div className="info-item">
            <a href={matelasseur.pdfUrl} target="_blank" rel="noopener noreferrer">
              Voir la fiche produit
            </a>
          </div>
        )}
      </div>

        {/* Description complète affichée par défaut */}
        <div id="description-content" className="description-content">
          <div
            dangerouslySetInnerHTML={{ __html: matelasseur.fullDescription }}
          />
          <div
            className="additional-description-content"
            dangerouslySetInnerHTML={{ __html: matelasseur.additionalDescription }}
          />
        </div>

        {/* Informations complémentaires affichées par défaut */}
        <div id="additional-info-content"  className="additionalInfoContent">
          <div
            dangerouslySetInnerHTML={{ __html: matelasseur.additionalDetails }}
            />
        </div>

            {/* Affichage de la vidéo */}
            {matelasseur.video && (
              <div id="video-container" className="video-container">
                <h3>Vidéo de démonstration</h3>
                <iframe
                  width="560"
                  height="315"
                  src={matelasseur.video}
                  title="Vidéo de démonstration"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
      </div>
    </div>
  );
};

export default MatelasseursDetails;
