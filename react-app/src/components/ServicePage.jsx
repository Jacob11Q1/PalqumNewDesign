import Icon from './Icon.jsx';
import ServiceHero from './ServiceHero.jsx';
import ServiceFeatures from './ServiceFeatures.jsx';
import ServiceProcess from './ServiceProcess.jsx';
import ServiceStats from './ServiceStats.jsx';
import ServicePricing from './ServicePricing.jsx';
import CtaBand from './CtaBand.jsx';
import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';

/** Shared template for every /service page — identical structure to the live
    site's pattern (hero, 6 features, 5 process steps, 4 stats, pricing, CTA),
    driven entirely by the `content` object passed in from data/services/*.js */
export default function ServicePage({ content }) {
  const t = useT(content.i18n);
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <>
      <ServiceHero content={content} />
      <ServiceFeatures content={content} />
      <ServiceProcess content={content} />
      <ServiceStats content={content} />
      <ServicePricing content={content} />
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div ref={ctaRef} className={`cta-band reveal${ctaVisible ? ' is-visible' : ''}`}>
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.desc')}</p>
            <a href="/#contact" className="btn btn-primary"><span>{t('cta.btn')}</span><Icon name="arrow" size={15} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
