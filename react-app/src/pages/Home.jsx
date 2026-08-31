import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import WhyUs from '../components/WhyUs.jsx';
import UnderTheHood from '../components/UnderTheHood.jsx';
import Work from '../components/Work.jsx';
import Results from '../components/Results.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Pricing from '../components/Pricing.jsx';
import Contact from '../components/Contact.jsx';
import { useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

export default function Home() {
  const t = useT(I18N);
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <UnderTheHood />
      <Work />
      <Results />
      <Testimonials />
      <section style={{ paddingBlock: '40px 100px' }}>
        <div className="container">
          <CtaBand btn={t('cta1.btn')} />
        </div>
      </section>
      <Pricing />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand title={t('cta2.title')} desc={t('cta2.desc')} btn={t('cta2.btn')} />
        </div>
      </section>
      <Contact />
    </>
  );
}
