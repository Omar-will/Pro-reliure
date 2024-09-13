import React from 'react';
import '../Scss/Contact.scss'; 

const Contact = () => {
  return (
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
          <label>J'accepte la politique de confidentialité.
          <input type="checkbox" required />
          </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
