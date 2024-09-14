import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Scss/DestructeurDeDocuments.scss';


const Machines = () => {
  const machines = [
    { id: 1, name: 'Machine 1', description: 'Description de la machine 1', image: '/images/machine1.jpg' },
    { id: 2, name: 'Machine 2', description: 'Description de la machine 2', image: '/images/machine2.jpg' },
    { id: 3, name: 'Machine 3', description: 'Description de la machine 3', image: '/images/machine3.jpg' },
    { id: 4, name: 'Machine 4', description: 'Description de la machine 4', image: '/images/machine4.jpg' },
    { id: 5, name: 'Machine 5', description: 'Description de la machine 5', image: '/images/machine5.jpg' },
    { id: 6, name: 'Machine 6', description: 'Description de la machine 6', image: '/images/machine6.jpg' },
    { id: 7, name: 'Machine 7', description: 'Description de la machine 7', image: '/images/machine7.jpg' },
    { id: 8, name: 'Machine 8', description: 'Description de la machine 8', image: '/images/machine8.jpg' },
    { id: 9, name: 'Machine 9', description: 'Description de la machine 9', image: '/images/machine9.jpg' },
    { id: 10, name: 'Machine 10', description: 'Description de la machine 10', image: '/images/machine10.jpg' },
    { id: 11, name: 'Machine 11', description: 'Description de la machine 11', image: '/images/machine11.jpg' },
    { id: 12, name: 'Machine 12', description: 'Description de la machine 12', image: '/images/machine12.jpg' },
    { id: 13, name: 'Machine 13', description: 'Description de la machine 13', image: '/images/machine13.jpg' },
  ];

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="machines-container">
      <div className="tabs">
        <button className={`tab-button ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabChange(1)}>
          1
        </button>
        <button className={`tab-button ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabChange(2)}>
          2
        </button>
      </div>

      {activeTab === 1 && (
        <div className="machines-list">
          {machines.slice(0, 9).map((machine) => (
            <div className="machine-card" key={machine.id}>
              <img src={machine.image} alt={machine.name} className="machine-image" />
              <h3>{machine.name}</h3>
              <p>{machine.description}</p>
              <Link to={`/machines/${machine.id}`}>
                <button>Voir le produit</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {activeTab === 2 && (
        <div className="machines-list">
          {machines.slice(9).map((machine) => (
            <div className="machine-card" key={machine.id}>
              <img src={machine.image} alt={machine.name} className="machine-image" />
              <h3>{machine.name}</h3>
              <p>{machine.description}</p>
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