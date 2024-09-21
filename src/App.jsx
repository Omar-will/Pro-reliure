import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Sections/Header.jsx';
import Footer from './Sections/Footer.jsx';
import Accueil from './Pages/Accueil.jsx';
// import NosServices from './Pages/NosServices.jsx';
import DestructeurDeDocuments from './Pages/DestructeurDeDocuments.jsx';
import MachineDetails from './Pages/MachineDetails.jsx';
import Contact from './Pages/Contact.jsx';
// import Acces from './Pages/Acces.jsx';
import FAQ from './Pages/FAQ.jsx';
import MentionsLegales from './Sections/MentionsLegales.jsx'
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
          {/* <Route path="/NosServices" element={<NosServices />} /> */}
          <Route path="/DestructeurDeDocuments" element={<DestructeurDeDocuments />} />
          <Route path="/machines/:id" element={<MachineDetails />} />
          <Route path="/Contact" element={<Contact />} />
          {/* <Route path="/Acces" element={<Acces />} /> */}
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
