import React from 'react';
import '../Scss/NosServices.scss';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom'; // Assurez-vous que le routage est configuré

const NosServices = () => {
  return (
    <div className="nos-services">
      <Helmet>
        <title>Nos Services - Assistance, Location et Pièces Détachées</title>
        <meta
          name="description"
          content="Découvrez nos services d'assistance et dépannage, location de destructeurs de documents et gestion de pièces détachées pour vos équipements de bureau."
        />
      </Helmet>
      <div className="content">

        {/* Section Assistance et Dépannage */}
        <div className="section">
          <div>
            <h2>Assistance et Dépannage</h2>
            <p>
              Notre service d’assistance et dépannage est spécialement conçu pour répondre rapidement à vos besoins en matière de maintenance et réparation de vos équipements de bureau.
              Nous nous engageons à diagnostiquer et résoudre les pannes dans les plus brefs délais pour minimiser les interruptions dans votre activité.<br />
              <Link to="/contact" className="contact-link">Contactez-nous</Link> pour en savoir plus ou obtenir une assistance immédiate.
            </p>
          </div>
          <img src="/images/nosServices1.webp" alt="Assistance et Dépannage" className="section-image" />
        </div>

        {/* Section Location de Destructeur */}
        <div className="section">
          <div>
            <h2>Location de Destructeur</h2>
            <p>
              Nous proposons des solutions flexibles de location de destructeurs de documents pour les entreprises de toutes tailles. Avec des options personnalisées, vous pouvez louer un destructeur adapté à vos besoins sans investissement initial important.
              Idéal pour les entreprises ayant des besoins ponctuels ou saisonniers de destruction de documents.<br />
              <Link to="/contact" className="contact-link">Contactez-nous</Link> pour découvrir nos options de location.
            </p>
          </div>
          <img src="/images/id1b.webp" alt="Location de Destructeur" className="section-image" />
        </div>

        {/* Section Gestion de Pièces Détachées */}
        <div className="section">
          <div>
            <h2>Gestion de Pièces Détachées</h2>
            <p>
              Nous assurons la disponibilité des pièces détachées pour une variété d’équipements de bureau. Grâce à notre service de gestion de pièces détachées, nous garantissons que vos machines peuvent être réparées rapidement et efficacement avec des pièces d’origine ou compatibles.
              Notre stock inclut des composants pour les marques les plus reconnues du secteur.<br />
              <Link to="/contact" className="contact-link">Contactez-nous</Link> pour toute demande de pièces ou renseignements.
            </p>
          </div>
          <img src="/images/nosServices2.webp" alt="Gestion de Pièces Détachées" className="section-image" />
        </div>

      </div>
    </div>
  );
};

export default NosServices;
