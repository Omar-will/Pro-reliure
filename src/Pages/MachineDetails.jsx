import React from 'react';
import { useParams } from 'react-router-dom';
import '../Scss/MachineDetails.scss';

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
];

const MachineDetails = () => {
  const { id } = useParams(); // Récupère l'ID de la machine depuis l'URL
  const machine = machines.find((machine) => machine.id === parseInt(id)); // Trouve la machine correspondante

  if (!machine) {
    return <h2>Machine non trouvée</h2>;
  }

  return (
    <div className="machine-details">
      <img src={machine.image} alt={machine.name} className="machine-image" />
      <h2>{machine.name}</h2>
      <p>{machine.description}</p>
    </div>
  );
};

export default MachineDetails;
