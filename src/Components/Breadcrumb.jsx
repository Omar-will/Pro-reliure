import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Scss/Breadcrumb.scss'; // Ton fichier SCSS pour styliser le breadcrumb

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb">
        {pathnames.length === 0 ? (
          // Ne pas afficher "Accueil" si nous sommes déjà sur la page d'accueil
          <li>Accueil</li>
        ) : (
          <li>
            <Link to="/Accueil">Accueil</Link>
          </li>
        )}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to}>
              <Link to={to}>
                {decodeURIComponent(value).replace(/-/g, ' ')}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
