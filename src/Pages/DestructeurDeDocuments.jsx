import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../Scss/DestructeurDeDocuments.scss';

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

const Machines = () => {
  const [machines, setMachines] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const { category } = useParams(); // Récupère la catégorie depuis l'URL

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const machinesCollection = collection(db, 'machines');
        const machinesSnapshot = await getDocs(machinesCollection);
        const machinesList = machinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Affiche les machines récupérées pour vérification
        console.log("Machines récupérées:", machinesList);

        // Filtrer les machines par catégorie
        if (category) {
          const filteredMachines = machinesList.filter(machine => 
            machine.categories && machine.categories.includes(category)
          );
          console.log("Machines filtrées:", filteredMachines); // Affiche les machines filtrées
          setMachines(filteredMachines);
        } else {
          setMachines(machinesList); // Si aucune catégorie n'est sélectionnée, affiche toutes les machines
        }
      } catch (error) {
        console.error("Error fetching machines: ", error);
      }
    };

    fetchMachines();
  }, [category]); // Met à jour le hook d'effet si la catégorie change

  return (
    <div className="machines-container">
      <div className="tabs">
        <button className={`tab-button ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabChange(1)}>
          1
        </button>
        <button className={`tab-button ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabChange(2)}>
          2
        </button>
        {/* <button className={`tab-button ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabChange(3)}>
          3
        </button> */}
      </div>

      {activeTab === 1 && (
        <div className="machines-list">
          {machines.slice(0, 12).map((machine) => (
            <div className="machine-card" key={machine.id}>
              <img src={machine.image} alt={machine.name} className="machine-image" />
              <h3>{machine.name}</h3>
              <p>{machine.description}</p>
              <p>Stock: {machine.stock}</p>
              <Link to={`/machines/${machine.id}`}>
                <button>Voir le produit</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {activeTab === 2 && (
        <div className="machines-list">
          {machines.slice(12).map((machine) => (
            <div className="machine-card" key={machine.id}>
              <img src={machine.image} alt={machine.name} className="machine-image" />
              <h3>{machine.name}</h3>
              <p>{machine.description}</p>
              <p>Stock: {machine.stock}</p>
              <Link to={`/machines/${machine.id}`}>
                <button>Voir le produit</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Machines;
