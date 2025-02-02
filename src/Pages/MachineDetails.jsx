import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Helmet } from 'react-helmet-async';
import '../Scss/MachineDetails.scss';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MachineDetails = () => {
  const { id } = useParams(); // Récupère l'ID depuis les paramètres d'URL
  const [machine, setMachine] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchMachine = async () => {
      const machineDoc = doc(db, 'machines', id);
      const machineSnapshot = await getDoc(machineDoc);
      if (machineSnapshot.exists()) {
        setMachine(machineSnapshot.data());
        setSelectedImage(machineSnapshot.data().images[0]); 
      } else {
        console.log("Machine non trouvée");
      }
    };

    fetchMachine();
  }, [id]); // Met à jour le hook d'effet si l'ID change

  if (!machine) {
    return <h2>Chargement des détails de la machine...</h2>; // Message d'attente pendant le chargement
  }

  return (
    <div className="machine-details">
      {/* Meta description dynamique */}
      <Helmet>
        <title>{machine.name} - Détails</title>
        <meta name="description" content={machine.metaDescription || "Découvrez cette machine en détail."} />
      </Helmet>
      {/* Grande image principale */}
      <div className="image-container">
        <img src={selectedImage} alt={machine.name} className="machine-image" />
      </div>

      {/* Miniatures des autres images */}
      <div className="image-thumbnails">
        {machine.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${machine.name} thumbnail ${index + 1}`}
            className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <div className="machine-info">
        <a href="/contact" className="quote-button">Obtenir un devis</a>

        {/* Lien vers le PDF */}
        <h2>{machine.name}</h2>
        <p className="machine-description">{machine.description}</p>
      </div>

      {/* Bandeau avec "Fonctionnalité", "Caractéristique", "Démonstration" */}
      <div className="info-banner">
        <a href="#description-container" className="info-item">Fonctionnalité</a>
        <a href="#additional-details-content" className="info-item">Caractéristique</a>
        <a href="#video-container" className="info-item">Démonstration</a>
        {machine.pdfUrl && (
          <div className="info-item">
            <a href={machine.pdfUrl} target="_blank" rel="noopener noreferrer">
              Voir la fiche produit
            </a>
          </div>
        )}
      </div>


      {/* Description complète */}
      <div id="description-container" className="description-container">
        <div
          className="description-content"
          dangerouslySetInnerHTML={{ __html: machine.fullDescription }} // Affichage HTML complet de la description
        />
        <div
          className="additional-description-content"
          dangerouslySetInnerHTML={{ __html: machine.additionalDescription }} // Affiche additionalDescription sous la section de description
        />
      </div>

      {/* Informations complémentaires */}
      <div className="additional-info-container">
        <div className="additional-info-content">
          <div
            id="additional-details-content" 
            className="additional-details-content"
            dangerouslySetInnerHTML={{ __html: machine.additionalDetails }} // Affiche les détails additionnels sous la même section
          />
        </div>

        {/* Vidéo de démonstration */}
        {machine.video && (
          <div id="video-container" className="video-container">
            <h3>Vidéo de démonstration</h3>
            <iframe
              width="560"
              height="315"
              src={machine.video} // Assurez-vous que le champ video est dans Firestore
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

export default MachineDetails;
