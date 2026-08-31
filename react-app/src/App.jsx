import { Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext.jsx';
import Layout from './components/Layout.jsx';
import ServicePage from './components/ServicePage.jsx';
import Home from './pages/Home.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Legal from './pages/Legal.jsx';
import { webDevelopment } from './data/services/webDevelopment.js';
import { aiAutomation } from './data/services/aiAutomation.js';
import { branding } from './data/services/branding.js';
import { ads } from './data/services/ads.js';
import { pos } from './data/services/pos.js';
import { privacy, terms, cookies } from './data/legalContent.js';

export default function App() {
  return (
    <LangProvider>
      <Routes>
        <Route path="/" element={<Layout title="Palqum — Build. Automate. Grow."><Home /></Layout>} />
        <Route path="/web-development" element={<Layout title="Web Design & Development — Palqum"><ServicePage content={webDevelopment} /></Layout>} />
        <Route path="/ai-automation" element={<Layout title="AI Automations — Palqum"><ServicePage content={aiAutomation} /></Layout>} />
        <Route path="/branding" element={<Layout title="Branding & Identity — Palqum"><ServicePage content={branding} /></Layout>} />
        <Route path="/ads" element={<Layout title="Digital Advertising — Palqum"><ServicePage content={ads} /></Layout>} />
        <Route path="/pos" element={<Layout title="POS Systems — Palqum"><ServicePage content={pos} /></Layout>} />
        <Route path="/portfolio" element={<Layout title="Portfolio — Palqum"><Portfolio /></Layout>} />
        <Route path="/privacy" element={<Layout title="Privacy Policy — Palqum"><Legal content={privacy} /></Layout>} />
        <Route path="/terms" element={<Layout title="Terms of Service — Palqum"><Legal content={terms} /></Layout>} />
        <Route path="/cookies" element={<Layout title="Cookie Policy — Palqum"><Legal content={cookies} /></Layout>} />
      </Routes>
    </LangProvider>
  );
}
