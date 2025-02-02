import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import '../Scss/searchResults.scss';

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
  const [error, setError] = useState(null);
  const [sortOrder] = useState('popularity');
  const [keywords] = useState("");

  const fetchSearchResults = useCallback(async () => {
    try {
      const searchQuery = location.state?.searchQuery || "";

      const machinesRef = collection(db, 'machines');
      const matelasseursRef = collection(db, 'matelasseurs');
      const locationRef = collection(db, 'location');
      
      const machinesSnapshot = await getDocs(machinesRef);
      const matelasseursSnapshot = await getDocs(matelasseursRef);
      const locationSnapshot = await getDocs(locationRef);

      const machines = machinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'machine' }));
      const matelasseurs = matelasseursSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'matelasseur' }));
      const locations = locationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'location' }));

      const allResults = [...machines, ...matelasseurs, ...locations];

      // Filtrage des résultats par terme de recherche
      const filteredResults = allResults.filter(result => {
        const searchTerm = searchQuery.toLowerCase();
        const descriptionMatch =
          result.description?.toLowerCase().includes(searchTerm) ||
          (result.additionalDescription && result.additionalDescription.toLowerCase().includes(searchTerm)) ||
          (result.additionalDetails && result.additionalDetails.toLowerCase().includes(searchTerm));

        return descriptionMatch || result.name?.toLowerCase().includes(searchTerm);
      });

      setResults(filteredResults);
    } catch (error) {
      setError("Une erreur est survenue lors du chargement des résultats.");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const sortedResults = results.sort((a, b) => {
    if (sortOrder === 'popularity') {
      return b.popularity - a.popularity;
    } else if (sortOrder === 'date') {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
    return 0;
  });

  const finalResults = sortedResults.filter(result => {
    if (!keywords) return true;
    const keywordLower = keywords.toLowerCase();
    return result.keywords?.some(keyword => keyword.toLowerCase().includes(keywordLower)) || 
           result.name?.toLowerCase().includes(keywordLower) || 
           result.description?.toLowerCase().includes(keywordLower);
  });

  if (loading) {
    return <h2>Chargement des résultats...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="search-results">
      <Helmet>
        <title>Résultats de recherche</title>
        <meta
          name="description"
          content="Consultez les résultats de votre recherche pour trouver des destructeurs de bureau, matelasseurs, ou services de location adaptés à vos besoins."
        />
      </Helmet>
      {finalResults.length > 0 ? (
        <div className="results-container">
          {finalResults.map(result => {
            // Définir l'URL du lien en fonction du type
            let linkTo = '';
            if (result.type === 'machine') {
              linkTo = `/machines/${result.id}`;
            } else if (result.type === 'matelasseur') {
              linkTo = `/matelasseurs/${result.id}`;
            } else if (result.type === 'location') {
              linkTo = `/location/destructeur/${result.id}`;
            }

            return (
              <div className="result-card" key={result.id}>
                <img src={result.image} alt={result.name} className="result-image" />
                <h3>{result.name}</h3>
                <p>{result.description}</p>
                {/* <p>Stock: {result.stock}</p> */}
                <Link to={linkTo}>
                  <button>Voir le produit</button>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <h2>Aucun résultat trouvé</h2>
      )}
    </div>
  );
};

export default SearchResults;
