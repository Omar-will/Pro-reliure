import React from 'react';
import '../Scss/Contact.scss'; 

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="service-info">
        <h3>Services après-vente</h3>
        <p>Chez Proreliure, nous comprenons l'importance de la sécurité et de l'efficacité dans la gestion de vos documents sensibles. </p>
        <p>C’est pourquoi nous offrons un service après-vente dédié et personnalisé pour vos destructeurs de documents de bureau.</p>
        <h4>Une expertise à votre service</h4>
        <p>Une expertise à votre service Nos experts sont à votre disposition pour vous conseiller sur l'utilisation optimale de vos destructeurs de documents, afin de garantir une performance maximale et une sécurité renforcée. </p>
        <p>Nous assurons également la fourniture de pièces détachées d’origine, pour un fonctionnement fiable et durable.</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Formulaire de contact</h2>
          <p>Vous souhaitez avoir plus de renseignements sur nos différentes prestations ?</p>
          <p>Contactez par téléphone au : 06 52 52 81 51</p>
          <p>Ou par notre formulaire de contact, nous vous répondons dans les plus brefs délais.</p>
          <p>1 rue Ernest Bonin – 78100 Saint-Germain-en-Laye</p>
        </div>
        <form className="contact-form">
          <label>
            Votre entreprise (obligatoire)
            <input type="text" required />
          </label>
          <label>
            Votre nom (obligatoire)
            <input type="text" required />
          </label>
          <label>
            E-mail (obligatoire)
            <input type="email" required />
          </label>
          <label>
            Téléphone (obligatoire)
            <input type="tel" required />
          </label>
          <label>
            Objet (obligatoire)
            <input type="text" required />
          </label>
          <label>
            Votre message (obligatoire)
            <textarea required></textarea>
          </label>
          <label>
            Choisir un fichier
            <input type="file" />
          </label>
          <label>
            J'accepte la politique de confidentialité.
            <input className="inputCase" type="checkbox" required />
          </label>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
