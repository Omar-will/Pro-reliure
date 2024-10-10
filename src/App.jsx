import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Sections/Header.jsx';
import Footer from './Sections/Footer.jsx';
import Accueil from './Pages/Accueil.jsx';
import NosServices from './Pages/NosServices.jsx';
import Machines from './Pages/DestructeurDeDocuments.jsx';
import MachineDetails from './Pages/MachineDetails.jsx';
import SearchResults from './Pages/SearchResults.jsx'; // Importez votre composant SearchResults
import Contact from './Pages/Contact.jsx';
import FAQ from './Pages/FAQ.jsx';
import MentionsLegales from './Sections/MentionsLegales.jsx';
import ConditionsGeneralesDeVente from './Sections/ConditionsGeneralesDeVente.jsx';
import Breadcrumb from './Components/Breadcrumb.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Breadcrumb />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/NosServices" element={<NosServices />} />
          <Route path="/DestructeurDeDocuments/:category" element={<Machines />} />
          <Route path="/DestructeurDeDocuments" element={<Machines />} />
          <Route path="/machines/:id" element={<MachineDetails />} />
          <Route path="/searchResults" element={<SearchResults />} /> {/* Ajoutez cette ligne */}
          <Route path="/Contact" element={<Contact />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/conditions-generales-de-vente" element={<ConditionsGeneralesDeVente />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
