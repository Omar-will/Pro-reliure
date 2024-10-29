import React, { useState } from 'react';
import '../Scss/FAQ.scss'; 

const FAQ = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "Quel type de coupe est le plus adapté ?",
      answer: "La coupe croisée est plus sécurisée que la coupe droite, idéale pour les documents confidentiels."
    },
    {
      question: "Quelle est la capacité de destruction ?",
      answer: "Cela dépend des modèles, certains détruisent jusqu'à 20 feuilles à la fois, pratique pour les bureaux chargés."
    },
    {
      question: "Le destructeur peut-il gérer d'autres matériaux ?",
      answer: "Certains modèles acceptent agrafes, trombones et même cartes de crédit."
    },
    {
      question: "Quelles options de sécurité offrent-ils ?",
      answer: "Ils incluent souvent des capteurs de surcharge et de sécurité anti-bourrage."
    },
    {
      question: "Quelle taille de bac de récupération est nécessaire ? ",
      answer:"Un bac plus grand réduit la fréquence de vidage, essentiel dans les grands bureaux."
    },
    {
      question: "Comment entretenir un destructeur de papier ?",
      answer:"Utiliser de l'huile pour destructeurs et vider le bac régulièrement prolonge la durée de vie."
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
