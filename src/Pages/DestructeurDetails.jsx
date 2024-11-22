import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Scss/MachineDetailsLocation.scss';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzf5uhhb6jaF46e6SsW46SlHYVHPetWCk",
  authDomain: "stock-proreliure.firebaseapp.com",
  projectId: "stock-proreliure",
  storageBucket: "stock-proreliure.appspot.com",
  messagingSenderId: "813766962774",
  appId: "1:813766962774:web:e58d093f1b6a3d885f15f7",
  measurementId: "G-15SVBHWPFH",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LocationDetails = () => {
  const { id } = useParams(); // Récupérer l'ID depuis les paramètres d'URL
  const [locationItem, setLocationItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Etat du modal

  // Récupérer les détails de l'élément de location depuis Firestore
  useEffect(() => {
    const fetchLocationItem = async () => {
      try {
        const locationDoc = doc(db, 'location', id); // Collection `location`
        const locationSnapshot = await getDoc(locationDoc);
        if (locationSnapshot.exists()) {
          const data = locationSnapshot.data();
          setLocationItem(data);
          setSelectedImage(data.images?.[0] || ''); // Image par défaut
        } else {
          setErrorMessage("Élément de location non trouvé.");
        }
      } catch (error) {
        setErrorMessage("Erreur lors de la récupération des données.");
        console.error("Erreur :", error);
      }
    };

    fetchLocationItem();
  }, [id]);

  // Calcul du prix basé sur les dates sélectionnées
  const calculatePrice = useCallback(() => {
    if (!startDate || !endDate || !locationItem) return;

    const dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    let price = dayCount * locationItem.basePrice;

    if (locationItem.discounts) {
      const applicableDiscount = locationItem.discounts
        .sort((a, b) => b.days - a.days)
        .find(discount => dayCount >= discount.days);

      if (applicableDiscount) {
        price -= (price * applicableDiscount.discount) / 100;
      }
    }

    setCalculatedPrice(price);
  }, [startDate, endDate, locationItem]);

  // Recalcul du prix lors du changement des dates
  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  // Fonction pour ouvrir/fermer le modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (!locationItem && !errorMessage) {
    return <h2>Chargement des détails...</h2>;
  }

  return (
    <div className="location-details">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {locationItem && (
        <>
          {/* Image principale */}
          <div className="image-container">
            <img src={selectedImage} alt={locationItem.name} className="location-image" />
          </div>
          {/* Section de réservation */}
          <div className="rental-section">
            <h3>Réserver cet article</h3>
            <div className="date-picker">
              <label>Début :</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()} // Pas de date passée
                placeholderText="Sélectionnez une date"
              />
              <label>Fin :</label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate} // Date de fin >= début
                placeholderText="Sélectionnez une date"
              />
            </div>

            {/* Affichage du prix calculé */}
            <div className="price-display">
              <p>Prix total pour la période sélectionnée :</p>
              <strong>
                {calculatedPrice
                  ? `${calculatedPrice.toFixed(2)} €`
                  : 'Veuillez sélectionner des dates.'}
              </strong>
            </div>

            {/* Bouton Réserver ou Modal */}
            {calculatedPrice > 0 && (
              <button onClick={toggleModal} className="reserve-button">
                Réserver
              </button>
            )}
          </div>
        </>
      )}

      {/* Miniatures des images */}
      {locationItem.images && (
        <div className="image-thumbnails">
          {locationItem.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${locationItem.name} thumbnail ${index + 1}`}
              className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      )}

      {/* Informations principales */}
      <div className="location-info">
        <h2>{locationItem.name}</h2>
        <p className="location-description">{locationItem.description}</p>
      </div>

      {/* Bannière d'informations */}
      <div className="info-banner">
        <a href="#description-container" className="info-item">Description</a>
        <a href="#additional-details-content" className="info-item">Caractéristiques</a>
        <a href="#video-container" className="info-item">Démonstration</a>
        {locationItem.pdfUrl && (
          <div className="info-item">
            <a href={locationItem.pdfUrl} target="_blank" rel="noopener noreferrer">
              Voir la fiche produit
            </a>
          </div>
        )}
      </div>

      {/* Description complète */}
      <div id="description-container" className="description-container">
        <div
          className="description-content"
          dangerouslySetInnerHTML={{ __html: locationItem.fullDescription }}
        />
        <div
          className="additional-description-content"
          dangerouslySetInnerHTML={{ __html: locationItem.additionalDescription }}
        />
      </div>

      {/* Informations complémentaires */}
      <div id="additional-details-content" className="additional-info-container">
        <div
          className="additional-info-content"
          dangerouslySetInnerHTML={{ __html: locationItem.additionalDetails }}
        />
      </div>

      {/* Vidéo de démonstration */}
      {locationItem.video && (
        <div id="video-container" className="video-container">
          <h3>Vidéo de démonstration</h3>
          <iframe
            width="560"
            height="315"
            src={locationItem.video}
            title="Vidéo de démonstration"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Modal de réservation */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={toggleModal} className="close-btn">X</button>
            <h3>Formulaire de réservation</h3>
            <form className="contact-form">
              <label>
                Votre entreprise (obligatoire)
                <input type="text" required />
              </label>
              <label>
                Votre nom (obligatoire)
                <input type="text" required />
              </label>
              <label>
                E-mail (obligatoire)
                <input type="email" required />
              </label>
              <label>
                Téléphone (obligatoire)
                <input type="tel" required />
              </label>
              <label>
                Objet (obligatoire)
                <input type="text" required />
              </label>
              
              <label>
                Message (obligatoire)
                <textarea required />
              </label>
              {/* Ajout des dates sélectionnées */}
              <label>
                Date de début : {startDate ? startDate.toLocaleDateString() : 'Non sélectionnée'}
              </label>
              <label>
                Date de fin : {endDate ? endDate.toLocaleDateString() : 'Non sélectionnée'}
              </label>
              <label>
                Joindre un fichier (facultatif)
                <input type="file" />
              </label>
              <button type="submit" className="submit-btn">Envoyer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;
