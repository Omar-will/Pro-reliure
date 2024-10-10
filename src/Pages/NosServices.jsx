import React from 'react';
import '../Scss/NosServices.scss';

const NosServices = () => {
  return (
    <div className="nos-services">
      <div className="content">
        <h1>Spécialiste du Service Après-Vente</h1>
        <p>
          Nous nous consacrons à l’entretien et à la maintenance de matériel de façonnage pour les professionnels. Nous proposons une large gamme de services, ainsi que la vente de massicots neufs et d'occasion, destinés aux petites et moyennes entreprises, aux organismes de formation et d’enseignement, ainsi qu'aux collectivités et administrations.
        </p>
        <h2>Qui bénéficie de nos services ?</h2>
        <p>Nous intervenons dans tous les secteurs d'activité :</p>
        <ul>
          <li>Petites et moyennes entreprises</li>
          <li>Organismes de formation et d’enseignement</li>
          <li>Collectivités et administrations</li>
        </ul>

        <h2>Expertise en maintenance de destructeurs de bureau</h2>
        <p>
          <strong>Des solutions sur mesure pour vos besoins en sécurité documentaire :</strong>
        </p>
        <p>
          Notre savoir-faire s'étend à une gamme variée de destructeurs de papier, adaptés aux exigences de sécurité de chaque entreprise. Nous comprenons l'importance de la confidentialité et de la protection des données, c'est pourquoi nous vous offrons des équipements performants et fiables.
        </p>
        <p>
          Nous collaborons avec des marques de renommée mondiale, telles que IDEAL, qui proposent des destructeurs de bureau conçus pour traiter différents volumes de documents, que ce soit pour un usage personnel ou en milieu professionnel. Qu'il s'agisse de déchiqueter des documents sensibles ou de gérer des flux importants de papier, nous vous aidons à choisir l'appareil le plus approprié, garantissant ainsi la sécurité de vos informations tout en optimisant votre espace de travail.
        </p>
        <p>
          De l'entretien préventif à la maintenance corrective, notre équipe de techniciens qualifiés est à votre disposition pour assurer le bon fonctionnement de votre matériel, minimisant ainsi les interruptions de votre activité. Nous vous accompagnons dans l’affûtage des lames et les révisions régulières, pour que votre destructeur reste toujours en parfait état de marche.
        </p>

        <h2>Pour quels types de documents ?</h2>
        <ul>
          <li>Documents commerciaux et de marketing</li>
          <li>Supports d'affichage</li>
          <li>Présentations</li>
          <li>Documents de consultation</li>
        </ul>
      </div>

      <div className="images">
        <img src="images/image1.webp" alt="Destructeur de bureau 1" />
        <img src="images/image3.webp" alt="Destructeur de bureau 2" />
      </div>
    </div>
  );
};

export default NosServices;
