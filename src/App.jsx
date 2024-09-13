import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Sections/Header.jsx';
import Footer from './Sections/Footer.jsx';
// import NosServices from './Pages/NosServices.jsx';
import DestructeurDeDocuments from './Pages/DestructeurDeDocuments.jsx';
import MachineDetails from './Pages/MachineDetails.jsx';
import Contact from './Pages/Contact.jsx';
// import Acces from './Pages/Acces.jsx';
import FAQ from './Pages/FAQ.jsx';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* <Route path="/NosServices" element={<NosServices />} /> */}
          <Route path="/DestructeurDeDocuments" element={<DestructeurDeDocuments />} />
          <Route path="/machines/:id" element={<MachineDetails />} />
          <Route path="/Contact" element={<Contact />} />
          {/* <Route path="/Acces" element={<Acces />} /> */}
          <Route path="/FAQ" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
