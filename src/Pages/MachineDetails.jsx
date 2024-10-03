import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Scss/MachineDetails.scss';

// Ajout des informations spécifiques pour la machine "Destructeur Ideal 4005"
const machines = [
  {
    id: 'id915',
    name: 'Destructeur de Bureau Ideal 4005',
    description: 'Destructeur centralisé de haut rendement, avec système de lubrification automatique, pour détruire jusqu’à 55 feuilles.',
    additionalDescription: 'Existe en modèles coupe fibres (C/F), coupe croisée (C/C), coupe micro (C/M) et super micro coupe (SM/C). Ouverture de 405 mm adaptée au format A3. Lubrification automatique des cylindres de coupe pour assurer un rendement régulier.',
    images: [
      '/images/id1a.webp',
      '/images/id1b.webp',
      '/images/id1c.webp',
      '/images/id1d.webp',
      '/images/id1e.webp',
      '/images/id1f.webp',
      '/images/id1g.webp',
    ],
    video: 'https://www.youtube.com/embed/xyz-video-id',
    additionalInfo: [
      { label: 'Ouverture', value: '405 mm' },
      { label: 'Capacité du réceptacle', value: '165 litres' },
      { label: 'Niveau sonore (sans papier)', value: '54dB' },
      { label: 'Alimentation ', value: '230 Volts / 50 Hz / monophasé' },
      { label: 'Puissance moteur', value: '1600 Watts' },
      { label: 'Dimensions (HxLxP)', value: '1010 x 640 x 590 mm' },
      { label: 'Poids', value: '115 kg' },
    ],
    fullDescription: `
      <p>Destructeur centralisé de haut rendement, avec système de lubrification automatique, pour détruire jusqu’à 55 feuilles.</p>
      <p>Existe en modèles coupe fibres (C/F), coupe croisée (C/C), coupe micro (C/M) et super micro coupe (SM/C). Ouverture de 405 mm adaptée au format A3. Lubrification automatique des cylindres de coupe pour assurer un rendement régulier. Destruction de CD/DVD selon modèle. Marche/arrêt automatiques par cellule. Réceptacle pratique avec poignée de préhension d’une capacité de 165 litres. Meuble en bois de grande qualité, monté sur roulettes. Bloc de coupe en acier spécial. Système d’entraînement robuste et étanche à la poussière. Conforme aux normes de sécurité européennes CE.</p>
      <p><strong>SPS – Système de Protection et de Sécurité :</strong></p>
      <p>Volet de sécurité contrôlé électriquement au niveau de l’ouverture ; Commande électronique multi-fonctions EASY-SWITCH avec guidage de l’utilisateur grâce à des codes couleurs et des symboles lumineux ; Retour automatique et arrêt en cas de surépaisseur ; Arrêt automatique en cas de réceptacle plein ; Protection électronique de la porte par contact magnétique ; Double protection du moteur ; Mode zéro énergie.</p>
      <p><strong>ECC – Électronique de Contrôle de Capacité :</strong></p>
      <p>Voyant signalant le rendement du destructeur pendant la destruction afin d’éviter les surépaisseurs et donc les éventuels bourrages.</p>
      <p><strong>Éco-label « Ange Bleu » :</strong></p>
      <p>Grâce à sa grande efficacité énergétique, sa longue durée de vie et sa fabrication respectueuse de l’environnement, ce destructeur a obtenu l’éco-label « Ange Bleu ».</p>
      <p><strong>Caractéristiques Techniques :</strong></p>
      <ul>
        <li>Ouverture : 405 mm</li>
        <li>Capacité du réceptacle : 165 litres</li>
        <li>Niveau sonore (sans papier) : 54 dB</li>
        <li>Alimentation : 230 Volts / 50 Hz / monophasé</li>
        <li>Puissance moteur : 1600 Watts</li>
        <li>Dimensions (HxLxP) : 1010 x 640 x 590 mm</li>
        <li>Poids : 115 kg</li>
      </ul>
    `,
    additionalDetails: `
      <p><strong>Informations complémentaires :</strong></p>
      <p><strong>Produits Associés :</strong></p>
      <ul>
        <li>Bouteille de 200 ml d’huile de lubrification</li>
        <li>Fournitures : Boîte de 18 feuilles de lubrification</li>
        <li>Sacs plastique pour destructeurs de documents (différentes tailles disponibles)</li>
        <li>Voir Categories : Fournitures et Consommables</li>
      </ul>
      <p><strong>Région :</strong> Île-de-France</p>
    `
  },
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
  // { id: 'id2', name: 'Machine 2', description: 'Description de la machine 2', image: '/images/machine2.jpg' },
  // { id: 'id3', name: 'Machine 3', description: 'Description de la machine 3', image: '/images/machine3.jpg' },
  // autres machines...


const MachineDetails = () => {
  const { id } = useParams(); // Récupère l'ID depuis les paramètres d'URL
  const machine = machines.find((machine) => machine.id === id); // Recherche la machine avec l'ID correspondant
  
  const [selectedImage, setSelectedImage] = useState(machine ? machine.images[0] : ''); // Image sélectionnée
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false); // État pour la description
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false); // État pour les infos supplémentaires

  if (!machine) {
    return <h2>Machine non trouvée</h2>; // Message d'erreur si la machine n'est pas trouvée
  }

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  const toggleAdditionalInfo = () => {
    setIsAdditionalInfoOpen(!isAdditionalInfoOpen);
  };

  return (
    <div className="machine-details">
      {/* Grande image principale */}
      <div className="image-container">
        <img src={selectedImage} alt={machine.name} className="machine-image" />
      </div>

      {/* Miniatures des autres images */}
      <div className="image-thumbnails">
        {machine.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${machine.name} thumbnail ${index + 1}`}
            className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <div className="machine-info">
        <a href="/contact" className="quote-button">Obtenir un devis</a>
        <h2>{machine.name}</h2>

        <p className="machine-description">{machine.description}</p>
        <p>{machine.additionalDescription}</p>

        <ul className="additional-info">
          {machine.additionalInfo.map((info, index) => (
            <li key={index}><strong>{info.label}:</strong> {info.value}</li>
          ))}
        </ul>

        <div className="video-container">
          <h3>Vidéo de démonstration</h3>
          <iframe
            width="560"
            height="315"
            src={machine.video}
            title="Vidéo de démonstration"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="description-container">
          <h3 onClick={toggleDescription} className="description-toggle">
            Description {isDescriptionOpen ? '-' : '+'}
          </h3>

          {isDescriptionOpen && (
            <div
              className="description-content"
              dangerouslySetInnerHTML={{ __html: machine.fullDescription }}
            />
          )}
        </div>

        <div className="additional-info-container">
          <h3 onClick={toggleAdditionalInfo} className="additional-info-toggle">
            Informations complémentaires {isAdditionalInfoOpen ? '-' : '+'}
          </h3>

          {isAdditionalInfoOpen && (
            <div
              className="additional-info-content"
              dangerouslySetInnerHTML={{ __html: machine.additionalDetails }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
