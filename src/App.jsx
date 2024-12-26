import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Sections/Header.jsx';
import Footer from './Sections/Footer.jsx';
import Accueil from './Pages/Accueil.jsx';
import NosServices from './Pages/NosServices.jsx';
import Machines from './Pages/DestructeurDeDocuments.jsx';
import MatelasseurDeCartons from './Pages/MatelasseurDeCartons';
import MatelasseursDetails from './Pages/MatelasseursDetails';
import MachineDetails from './Pages/MachineDetails.jsx';
import SearchResults from './Pages/SearchResults.jsx'; 
import Utilisation from './Pages/Utilisation.jsx';
import LocationDestructeurs from './Pages/LocationDestructeurs.jsx';
import DestructeurDetails from './Pages/DestructeurDetails.jsx';
import Contact from './Pages/Contact.jsx';
import FAQ from './Pages/FAQ.jsx';
import MentionsLegales from './Sections/MentionsLegales.jsx';
import ConditionsGeneralesDeVente from './Sections/ConditionsGeneralesDeVente.jsx';
import Breadcrumb from './Components/Breadcrumb.jsx';
// import './Scss/index.scss';

function App() {
  return (
    <Router>
      <Header />
      <Breadcrumb />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/nos-services" element={<NosServices />} />
          <Route path="/matelasseur-de-cartons" element={<MatelasseurDeCartons />} />
          <Route path="/destructeurs-de-documents/:category" element={<Machines />} />
          {/* <Route path="/DestructeurDeDocuments" element={<Machines />} /> */}
          <Route path="/search-results" element={<SearchResults />} /> 
          <Route path="/machines/:id" element={<MachineDetails />} />
          <Route path="/matelasseurs/:id" element={<MatelasseursDetails />} />
          <Route path="/location-destructeurs/:category" element={<LocationDestructeurs />} />
          <Route path="/location/destructeur/:id" element={<DestructeurDetails />} />
          <Route path="/utilisation" element={<Utilisation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/conditions-generales-de-vente" element={<ConditionsGeneralesDeVente />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
