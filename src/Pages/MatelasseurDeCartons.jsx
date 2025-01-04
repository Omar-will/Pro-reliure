import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../Scss/MatelasseurDeCartons.scss';

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

const Matelasseurs = () => {
  const [matelasseurs, setMatelasseurs] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const { category } = useParams(); // Récupère la catégorie depuis l'URL

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchMatelasseurs = async () => {
      try {
        const matelasseursCollection = collection(db, 'matelasseurs');
        const matelasseursSnapshot = await getDocs(matelasseursCollection);
        const matelasseursList = matelasseursSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Affiche les matelasseurs récupérés pour vérification
        console.log("Matelasseurs récupérés:", matelasseursList);

        // Vérifie si category existe et filtre les matelasseurs
        if (category) {
          console.log("Category from URL:", category); // Vérification de la catégorie
          const filteredMatelasseurs = matelasseursList.filter(matelasseur =>
            Array.isArray(matelasseur.categories) && matelasseur.categories.includes(category)
          );
          console.log("Matelasseurs filtrés:", filteredMatelasseurs); // Affiche les matelasseurs filtrés
          setMatelasseurs(filteredMatelasseurs);
        } else {
          setMatelasseurs(matelasseursList); // Si aucune catégorie n'est sélectionnée, affiche tous les matelasseurs
        }
      } catch (error) {
        console.error("Error fetching matelasseurs: ", error);
      }
    };

    fetchMatelasseurs();
  }, [category]); // Met à jour le hook d'effet si la catégorie change

  return (
    <div className="matelasseurs-container">
      <div className="tabs">
        <button className={`tab-button ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabChange(1)}>
          1
        </button>
        <button className={`tab-button ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabChange(2)}>
          2
        </button>
      </div>

      {activeTab === 1 && (
        <div className="matelasseurs-list">
          {matelasseurs.slice(0, 12).map((matelasseur) => (
            <div className="matelasseur-card" key={matelasseur.id}>
              <img src={matelasseur.image} alt={matelasseur.name} className="matelasseur-image" />
              <h3>{matelasseur.name}</h3>
              <p>{matelasseur.description}</p>
              {/* <p>Stock: {matelasseur.stock}</p> */}
              <Link to={`/matelasseurs/${matelasseur.id}`}>
                <button>Voir le produit</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {activeTab === 2 && (
        <div className="matelasseurs-list">
          {matelasseurs.slice(12).map((matelasseur) => (
            <div className="matelasseur-card" key={matelasseur.id}>
              <img src={matelasseur.image} alt={matelasseur.name} className="matelasseur-image" />
              <h3>{matelasseur.name}</h3>
              <p>{matelasseur.description}</p>
              {/* <p>Stock: {matelasseur.stock}</p> */}
              <Link to={`/matelasseurs/${matelasseur.id}`}>
                <button>Voir le produit</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matelasseurs;
