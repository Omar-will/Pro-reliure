import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);

  useEffect(() => {
    const fetchMachine = async () => {
      const machineDoc = doc(db, 'machines', id);
      const machineSnapshot = await getDoc(machineDoc);
      if (machineSnapshot.exists()) {
        setMachine(machineSnapshot.data());
        setSelectedImage(machineSnapshot.data().images[0]); // Définit l'image sélectionnée par défaut
      } else {
        console.log("Machine non trouvée");
      }
    };

    fetchMachine();
  }, [id]); // Met à jour le hook d'effet si l'ID change

  if (!machine) {
    return <h2>Chargement des détails de la machine...</h2>; // Message d'attente pendant le chargement
  }

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  const toggleAdditionalInfo = () => {
    setIsAdditionalInfoOpen(!isAdditionalInfoOpen);
  };

  return (
    <div className="machine-details">
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
        <h2>{machine.name}</h2>

        <p className="machine-description">{machine.description}</p>


        {/* Description complète */}
        <div className="description-container">
          <h3 onClick={toggleDescription} className="description-toggle">
            Description {isDescriptionOpen ? '-' : '+'}
          </h3>

          {isDescriptionOpen && (
            <div>
              <div
                className="description-content"
                dangerouslySetInnerHTML={{ __html: machine.fullDescription }} // Affichage HTML complet de la description
              />
              {/* Ajout de additionalDescription ici */}
              <div
                className="additional-description-content"
                dangerouslySetInnerHTML={{ __html: machine.additionalDescription }} // Affiche additionalDescription sous la section de description
              />
            </div>
          )}
          {/* Affichage de la vidéo */}
        {machine.video && (
          <div className="video-container">
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

        {/* Informations complémentaires et détails additionnels */}
        <div className="additional-info-container">
          <h3 onClick={toggleAdditionalInfo} className="additional-info-toggle">
            Informations complémentaires {isAdditionalInfoOpen ? '-' : '+'}
          </h3>

          {isAdditionalInfoOpen && (
            <div className="additional-info-content">
              <ul>
                <div
                  className="additional-details-content"
                  dangerouslySetInnerHTML={{ __html: machine.additionalDetails }} // Affiche les détails additionnels sous la même section
                />
                {/* Assurez-vous qu'il n'y a pas de point après "Île-de-France" */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
