import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../Scss/LocationDestructeurs.scss';

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

const LocationDestructeurs = () => {
  const [locationItems, setLocationItems] = useState([]);
  const { category } = useParams(); // Récupère la catégorie depuis l'URL

  useEffect(() => {
    const fetchLocationItems = async () => {
      try {
        const locationCollection = collection(db, 'location');
        const locationSnapshot = await getDocs(locationCollection);
        const locationList = locationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Si une catégorie est spécifiée dans l'URL, filtrer les éléments
        if (category) {
          const filteredItems = locationList.filter(item => 
            item.categories && item.categories.includes(category)
          );
          setLocationItems(filteredItems);
        } else {
          setLocationItems(locationList); // Affiche tous les éléments si aucune catégorie n'est spécifiée
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des éléments de location:", error);
      }
    };

    fetchLocationItems();
  }, [category]); // Met à jour lorsque la catégorie change

  return (
    <div className="location-destructeurs-container">
      <div className="location-destructeurs-list">
        {locationItems.map((item) => (
          <div className="destructeur-card" key={item.id}>
            <img src={item.image} alt={item.name} className="destructeur-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Stock: {item.stock}</p>
            <Link to={`/location/destructeur/${item.id}`}>
              <button>Voir les détails</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationDestructeurs;
