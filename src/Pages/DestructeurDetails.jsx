import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from 'emailjs-com';
import '../Scss/MachineDetailsLocation.scss';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzf5uhhb6jaF46e6SsW46SlHYVHPetWCk",
  authDomain: "stock-proreliure.firebaseapp.com",
  projectId: "stock-proreliure",
  storageBucket: "stock-proreliure.appspot.com",
  messagingSenderId: "813766962774",
  appId: "1:813766962774:web:e58d093f1b6a3d885f15f7",
  measurementId: "G-15SVBHWPFH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LocationDetails = () => {
  const { id } = useParams();
  const [locationItem, setLocationItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState({ totalHT: 0, totalTTC: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    entreprise: '',
    nom: '',
    email: '',
    telephone: '',
    objet: '',
    message: ''
  });

  // Fetch item details from Firestore
  useEffect(() => {
    const fetchLocationItem = async () => {
      try {
        const locationDoc = doc(db, 'location', id);
        const locationSnapshot = await getDoc(locationDoc);
        if (locationSnapshot.exists()) {
          const data = locationSnapshot.data();
          setLocationItem(data);
          setSelectedImage(data.images?.[0] || '');
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

  // Calculate price based on selected dates
  const calculatePrice = useCallback(() => {
    if (!startDate || !endDate || !locationItem) return;

    const dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    let totalHT = 0;

    // Tarification basée sur la grille
    if (dayCount === 1) {
      totalHT = 198 * dayCount; // Prix HT sans réduction
    } else if (dayCount >= 2 && dayCount <= 5) {
      totalHT = 198 * dayCount * 0.95; // Réduction 5%
    } else if (dayCount > 5 && dayCount <= 7) {
      totalHT = 198 * dayCount * 0.90; // Réduction 10%
    } else if (dayCount > 7) {
      totalHT = 198 * dayCount * 0.85; // Réduction 15%
    }

    const totalTTC = totalHT * 1.2; // Ajout de la TVA (20%)
    setCalculatedPrice({ totalHT, totalTTC });
  }, [startDate, endDate, locationItem]);

  useEffect(() => {
    calculatePrice();
  }, [calculatePrice]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const templateParams = {
      entreprise: formData.entreprise,
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      objet: formData.objet,
      message: formData.message,
      startDate: startDate ? startDate.toLocaleDateString() : 'Non sélectionnée',
      endDate: endDate ? endDate.toLocaleDateString() : 'Non sélectionnée',
      prixHT: calculatedPrice.totalHT.toFixed(2),
      prixTTC: calculatedPrice.totalTTC.toFixed(2)
    };

    try {
      await emailjs.send('service_7pba7t4', 'template_ozcwc8m', templateParams, 'bRuyjX8eO_jXjKNDl');
      alert("Formulaire envoyé avec succès !");
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
      alert("Erreur lors de l'envoi du formulaire.");
    }
  };

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
              <p>Prix HT :</p>
              <strong>
                {calculatedPrice.totalHT
                  ? `${calculatedPrice.totalHT.toFixed(2)} € HT`
                  : 'Veuillez sélectionner des dates.'}
              </strong>
              <p>Prix TTC :</p>
              <strong>
                {calculatedPrice.totalTTC
                  ? `${calculatedPrice.totalTTC.toFixed(2)} € TTC`
                  : 'Veuillez sélectionner des dates.'}
              </strong>
            </div>

            {/* Bouton Réserver ou Modal */}
            {calculatedPrice.totalTTC > 0 && (
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
        <a href="#description-container" className="info-item">Fonctionnalité</a>
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
      {/* {locationItem.video && (
        <div id="video-container" className="video-containers">
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
      )} */}

      {/* Modal de réservation */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={toggleModal} className="close-btn">X</button>
            <h3>Formulaire de réservation</h3>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <label>
                Votre entreprise (obligatoire)
                <input type="text" name="entreprise" value={formData.entreprise} onChange={handleFormChange} required />
              </label>
              <label>
                Votre nom (obligatoire)
                <input type="text" name="nom" value={formData.nom} onChange={handleFormChange} required />
              </label>
              <label>
                E-mail (obligatoire)
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
              </label>
              <label>
                Téléphone (obligatoire)
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleFormChange} required />
              </label>
              <label>
                Objet (obligatoire)
                <input type="text" name="objet" value={formData.objet} onChange={handleFormChange} required />
              </label>
              <label>
                Message (obligatoire)
                <textarea name="message" value={formData.message} onChange={handleFormChange} required />
              </label>
              {/* Ajout des dates sélectionnées */}
              <label>
                Date de début : {startDate ? startDate.toLocaleDateString() : 'Non sélectionnée'}
              </label>
              <label>
                Date de fin : {endDate ? endDate.toLocaleDateString() : 'Non sélectionnée'}
              </label>
               {/* Affichage des prix */}
        <label>
          Prix HT : {calculatedPrice.totalHT ? `${calculatedPrice.totalHT.toFixed(2)} € HT` : 'Calcul en cours...'}
        </label>
        <label>
          Prix TTC : {calculatedPrice.totalTTC ? `${calculatedPrice.totalTTC.toFixed(2)} € TTC` : 'Calcul en cours...'}
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
