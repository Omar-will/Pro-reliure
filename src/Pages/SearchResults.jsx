import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder] = useState('popularity'); // État pour le tri
  const [keywords] = useState(""); // État pour les mots-clés

  const fetchSearchResults = useCallback(async () => {
    try {
      const searchQuery = location.state?.searchQuery || ""; // Utiliser le terme de recherche depuis l'état de navigation
      console.log("État de navigation :", location.state); // Debug
      console.log("Requête de recherche :", searchQuery); // Debug

      const machinesRef = collection(db, 'machines');
      const querySnapshot = await getDocs(machinesRef);
      const machines = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Machines récupérées :", machines); // Debug

      // Filtrer les machines en fonction du terme de recherche
      const filteredMachines = machines.filter(machine => {
        const searchTerm = searchQuery.toLowerCase();
        
        // Vérification si le terme de recherche correspond à l'un des champs
        const keywordsMatch = machine.keywords?.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        );

        const descriptionMatch =
          machine.description.toLowerCase().includes(searchTerm) ||
          (machine.additionalDescription && machine.additionalDescription.toLowerCase().includes(searchTerm)) ||
          (machine.additionalDetails && machine.additionalDetails.toLowerCase().includes(searchTerm));

        return keywordsMatch || descriptionMatch || machine.name.toLowerCase().includes(searchTerm);
      });

      setResults(filteredMachines);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  // Fonction pour trier les résultats
  const sortedResults = results.sort((a, b) => {
    if (sortOrder === 'popularity') {
      return b.popularity - a.popularity; // Tri par popularité (assurez-vous que ce champ existe)
    } else if (sortOrder === 'date') {
      return new Date(b.dateAdded) - new Date(a.dateAdded); // Tri par date d'ajout (assurez-vous que ce champ existe)
    }
    return 0; // Aucune modification si aucun tri n'est sélectionné
  });

  // Filtrer par mots-clés
  const finalResults = sortedResults.filter(machine => {
    if (!keywords) return true; // Si aucun mot-clé, afficher tous
    const keywordLower = keywords.toLowerCase();
    return machine.keywords?.some(keyword => keyword.toLowerCase().includes(keywordLower)) || 
           machine.name.toLowerCase().includes(keywordLower) || 
           machine.description.toLowerCase().includes(keywordLower);
  });

  if (loading) {
    return <h2>Chargement des résultats...</h2>;
  }

  return (
    <div className="search-results">
      <div>
        
      </div>
      {finalResults.length > 0 ? (
        finalResults.map(machine => (
          <div className="machine-card" key={machine.id}>
            <img src={machine.image} alt={machine.name} className="machine-image" />
            <h3>{machine.name}</h3>
            <p>{machine.description}</p>
            <p>Stock: {machine.stock}</p>
            <Link to={`/machines/${machine.id}`}>
              <button>Voir le produit</button>
            </Link>
          </div>
        ))
      ) : (
        <h2>Aucun résultat trouvé</h2>
      )}
    </div>
  );
};

export default SearchResults;
