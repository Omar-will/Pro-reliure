import React from 'react';
import '../Scss/Utilisation.scss';

const Utilisation = () => {
  return (
    <div className="ideal-machines">
      <h1>Destructeurs de Bureau et Grande Capacité</h1>

      <section className="office-shredders">
        <h2>Destructeurs de Bureau : Performants et Confortables</h2>
        <div className="content-with-image">
          <p>
            Nos destructeurs de documents sont pensés pour être placés au cœur de vos espaces de travail. Ils offrent une grande capacité de réception
            et une performance optimale, idéale pour une utilisation centralisée, au sein de plusieurs postes de travail ou près d’un copieur. 
            Les fonctions sont simples et intuitives grâce à la commande électronique avancée EASY-SWITCH, assurant une utilisation conviviale même 
            dans des environnements partagés.
          </p>
          <img src="/images/id1e.webp" alt="Destructeur de Bureau" className="image-desk" />
        </div>
        
        <h3>Fonctionnement Simplifié avec l'Interrupteur EASY-SWITCH</h3>
        <p>
          Grâce à l’interrupteur multifonctions EASY-SWITCH, chaque utilisateur peut manipuler l’appareil facilement, 
          avec des indications visuelles par codes couleur et témoins lumineux, facilitant l’identification de l’état 
          de la machine en un coup d'œil.
        </p>

        <h3>Cylindres de Coupe en Acier de Haute Qualité</h3>
        <p>
          Les cylindres de coupe sont fabriqués en acier de qualité supérieure, conçus pour durer et résister à des 
          matériaux comme les agrafes et les trombones, offrant une garantie à vie pour une utilisation normale (sauf 
          pour les modèles à micro-coupe MC et super micro-coupe SMC).
        </p>

        <h3>Système Anti-Bourrage ECC</h3>
        <p>
          Le système ECC (Contrôle Électronique de la Capacité) évite les bourrages en indiquant le niveau de charge 
          utilisé pendant la coupe grâce à des voyants lumineux. Ce dispositif permet une gestion fluide, optimisant 
          la performance et réduisant les risques de bourrage.
        </p>

        <h3>Réceptacle Amovible et Résistant</h3>
        <p>
          Chaque modèle est doté d’un réceptacle solide et léger, facilement amovible grâce à sa poignée ergonomique. 
          Ce bac peut être utilisé avec ou sans sac jetable, offrant une solution de collecte propre et pratique.
        </p>
      </section>

      <section className="high-capacity-shredders">
        <h2>Destructeurs à Forte Capacité : Pour de Grands Volumes</h2>
        <div className="content-with-image">
          <p>
            Conçus pour les besoins de destruction en masse, les destructeurs à forte capacité IDEAL offrent des volumes de 
            réception importants, de 230 à 300 litres selon le modèle. Ils sont pensés pour une utilisation intensive et 
            continue, répondant aux exigences des environnements de haute productivité.
          </p>
          <img src="/images/IDEAL-4108.webp" alt="Destructeur à Forte Capacité" className="image-large" />
        </div>

        <h3>Robustesse des Blocs de Coupe</h3>
        <p>
          Les blocs de coupe robustes des modèles forte capacité permettent de détruire non seulement de grandes quantités de 
          papier, mais aussi des documents froissés et des dossiers complets, mécanismes inclus, assurant une destruction 
          efficace sans encombre.
        </p>

        <h3>Lubrification Automatique</h3>
        <p>
          Un système de lubrification automatique prend soin des cylindres de coupe en appliquant de l’huile régulièrement 
          pendant l’utilisation, prolongeant la durée de vie des composants et maintenant une performance optimale dans le temps.
        </p>

        <h3>Compact et Polyvalent</h3>
        <p>
          Les destructeurs à forte capacité combinent une compacité étonnante et une capacité d’accueil exceptionnelle. 
          Certains modèles sont dotés d’un entonnoir pour accueillir directement le contenu d’une corbeille à papier, idéal 
          pour traiter les papiers froissés en grande quantité.
        </p>

        <h3>Solutions de Destruction à Haute Capacité</h3>
        <p>
          Les machines les plus performantes sont équipées d’une large table d’alimentation et d’une bande de transport pour 
          détruire efficacement des volumes importants de documents, et même des classeurs complets. Parfait pour répondre 
          aux besoins d’un étage entier de bureaux, ces modèles offrent une solution complète pour la destruction de grandes 
          quantités de papier.
        </p>
      </section>
    </div>
  );
};

export default Utilisation;
