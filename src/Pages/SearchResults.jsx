import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || { results: [] };

  const [keywords, setKeywords] = useState('');

  // Filtre les résultats en fonction des mots-clés
  const filteredResults = results.filter((machine) => {
    const machineKeywords = machine.keywords || []; // Assurez-vous que keywords est un tableau

    // Vérifie si l'un des mots-clés correspond à l'entrée de recherche
    const keywordMatch = machineKeywords.some(keyword => 
      keyword.toLowerCase().includes(keywords.toLowerCase())
    );

    return (
      machine.name.toLowerCase().includes(keywords.toLowerCase()) ||
      machine.description.toLowerCase().includes(keywords.toLowerCase()) ||
      keywordMatch
    );
  });

  // Redirige vers l'accueil si aucun résultat n'est trouvé
  useEffect(() => {
    if (!results.length) {
      navigate('/'); // Rediriger vers l'accueil si aucun résultat
    }
  }, [results, navigate]);

  return (
    <div>
      <h2>Résultats de recherche</h2>
      
      {/* Champ de saisie pour les mots-clés */}
      <input 
        type="text" 
        placeholder="Rechercher par mots-clés..." 
        value={keywords} 
        onChange={(e) => setKeywords(e.target.value)} 
      />

      {filteredResults.length > 0 ? (
        <div className="machines-list">
          {filteredResults.map((machine) => (
            <div className="machine-card" key={machine.id || machine.name}>
              <img src={machine.image} alt={machine.name} className="machine-image" style={{ width: '150px' }} />
              <h3>{machine.name}</h3>
              <p>{machine.description}</p>
              <p><strong>Stock:</strong> {machine.stock}</p>
              <Link to={`/machines/${machine.id}`}>
                <button>Voir le produit</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
    </div>
  );
};

export default SearchResults;
