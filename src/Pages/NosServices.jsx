import React from 'react';
import '../Scss/NosServices.scss';

const NosServices = () => {
  return (
    <div className="nos-services">
      <div className="content">
        <div className="section">
          <div>
            <h1>Spécialiste du Service Après-Vente</h1>
            <p>
              Nous nous consacrons à l’entretien et à la maintenance de matériel de façonnage pour les professionnels.<br />
              Destinés aux petites et moyennes entreprises, aux organismes de formation et d’enseignement,
              ainsi qu'aux collectivités et administrations.<br />
              ainsi que la vente de massicots neufs et d'occasion.
              Nous proposons une large gamme de services,<br />
            </p>

          </div>
        </div>

        <div className="section">
          <div>
            <h2>Qui bénéficie de nos services ?</h2>
            <p>Nous intervenons dans tous les secteurs d'activité :</p>
            <ul>
              <li>Petites et moyennes entreprises</li>
              <li>Organismes de formation et d’enseignement</li>
              <li>Collectivités et administrations</li>
            </ul>
          </div>
        <img src="/images/nosServices1.webp" alt="Service Après-Vente" className="section-image" />
        </div>

        <div className="section">
          <div>
            <h2>Expertise en maintenance de destructeurs de bureau</h2>
            <p><strong>Des solutions sur mesure pour vos besoins en sécurité documentaire :</strong></p>
            <p>
              Notre savoir-faire s'étend à une gamme variée de destructeurs de papier, adaptés aux exigences de sécurité de chaque entreprise.<br /> Nous comprenons l'importance de la confidentialité et de la protection des données, <br />c'est pourquoi nous vous offrons des équipements performants et fiables.
            </p>
            <p>
              Nous collaborons avec des marques de renommée mondiale, telles que IDEAL, qui proposent des destructeurs de bureau conçus <br /> pour traiter différents volumes de documents, que ce soit pour un usage personnel ou en milieu professionnel.
            </p>
            <p>
              De l'entretien préventif à la maintenance corrective, <br /> notre équipe de techniciens qualifiés est à votre disposition pour assurer le bon fonctionnement de votre matériel.
            </p>
          </div>
        <img src="/images/nosServices2.webp" alt="Bénéficiaires des Services" className="section-image" />
        </div>

        <div className="section">
          <div>
            <h2>Pour quels types de documents ?</h2>
           
            <ul>
              <li>Documents commerciaux et de marketing</li>
              <li>Supports d'affichage</li>
              <li>Présentations</li>
              <li>Documents de consultation</li>
            </ul>
          </div>
        <img src="/images/nosServices3.webp" alt="Maintenance Destructeurs" className="section-image" />
        </div>
      </div>
    </div>
  );
};

export default NosServices;
