import React, { useState } from 'react';
import '../Scss/FAQ.scss'; 

const FAQ = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "Quelle est l'adresse de M. Sébastien Azanza ?",
      answer: "M. Sébastien Azanza reçoit des patients aux adresses suivantes: 75 Rue du Pré aux Moutons, 78670 Villennes-sur-Seine, 130 Rue de la Roquette, 75011 Paris, 4 Allée de la Crète, 78670 Villennes-sur-Seine"
    },
    {
      question: "Comment se préparer pour une consultation ?",
      answer: "Il est recommandé de porter des vêtements confortables et d'éviter de manger un repas lourd juste avant la consultation."
    },
    {
      question: "Combien de séances sont nécessaires ?",
      answer: "Le nombre de séances dépend du problème traité. Certaines personnes ressentent un soulagement en une séance, tandis que d'autres peuvent nécessiter plusieurs consultations."
    },
    {
      question: "L'ostéopathie est-elle remboursée ?",
      answer: "L'ostéopathie n'est généralement pas remboursée par la Sécurité Sociale, mais certaines mutuelles prennent en charge tout ou partie des consultations."
    },
    {
      question: "Quels sont les moyens de paiement acceptés par M.Sébastien Azanza ?",
      answer:"M. Sébastien Azanza accepte les moyens de paiements suivants: Chèques et espèces. Cartes bancaires non acceptées."
    },
    {
      question: "Quelles sont les langues parlées par M.Sébastien Azanza ?",
      answer:"Les langues qui peuvent être parlées avec M. Sébastien Azanza sont les suivantes : Allemand, Anglais et Français"
    },
    {
      question: "Est-ce que M.Sébastien Azanza accepte des nouveaux patients ?",
      answer:"Oui, M. Sébastien Azanza accepte des nouveaux patients."
    }, 
    
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Questions Fréquentes</h1>
      <div className="faq-list">
        {questions.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              {item.question}
              <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
