import React from "react";
import emailjs from "emailjs-com";
import "../Scss/Contact.scss";

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7pba7t4", // Remplacez par votre Service ID
        "template_wpq8t7s", // Remplacez par votre Template ID
        e.target,
        "bRuyjX8eO_jXjKNDl" // Remplacez par votre Public Key
      )
      .then(
        (result) => {
          alert("Message envoyé avec succès !");
          console.log(result.text);
          e.target.reset(); // Réinitialise le formulaire
        },
        (error) => {
          alert("Une erreur est survenue. Veuillez réessayer.");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-page">
      <div className="service-info">
        <h3>Services après-vente</h3>
        <p>Chez Proreliure, nous comprenons l'importance de la sécurité et de l'efficacité dans la gestion de vos documents sensibles.</p>
        <p>C’est pourquoi nous offrons un service après-vente dédié et personnalisé pour vos destructeurs de documents de bureau.</p>
        <h4>Une expertise à votre service</h4>
        <p>Nos experts sont à votre disposition pour vous conseiller sur l'utilisation optimale de vos destructeurs de documents, afin de garantir une performance maximale et une sécurité renforcée.</p>
        <p>Nous assurons également la fourniture de pièces détachées d’origine, pour un fonctionnement fiable et durable.</p>
        <img src="/images/id1c.webp" alt="Service après-vente" className="service-image" />
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Formulaire de contact</h2>
          <p>Vous souhaitez avoir plus de renseignements sur nos différentes prestations ?</p>
          <p>Ou par notre formulaire de contact, nous vous répondons dans les plus brefs délais.</p>
          <p>1 rue Ernest Bonin – 78100 Saint-Germain-en-Laye</p>
          <p>Contactez par téléphone au : 06 52 52 81 51</p>
          <p>Contactez par email : contact@destructeurs-archives.fr</p>
        </div>
        <form className="contact-form" onSubmit={sendEmail}>
          <label>
            Votre entreprise (obligatoire)
            <input type="text" name="entreprise" required />
          </label>
          <label>
            Votre nom (obligatoire)
            <input type="text" name="nom" required />
          </label>
          <label>
            E-mail (obligatoire)
            <input type="email" name="email" required />
          </label>
          <label>
            Téléphone (obligatoire)
            <input type="tel" name="telephone" required />
          </label>
          <label>
            Objet (obligatoire)
            <input type="text" name="objet" required />
          </label>
          <label>
            Type de service (obligatoire)
            <select name="service" required>
              <option value="">Sélectionner...</option>
              <option value="achat">Achat</option>
              <option value="location">Location</option>
            </select>
          </label>
          <label>
            Votre message (obligatoire)
            <textarea name="message" required></textarea>
          </label>
          <label>
            J'accepte la politique de confidentialité.
            <input className="inputCase" type="checkbox" name="confidentialite" required />
          </label>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
