import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';
import { I18N, SERVICES, SERVICE_KEYS } from '../data/homeContent.js';

function ServiceCard({ svc, t }) {
  const [ref, visible] = useReveal();
  const k = SERVICE_KEYS[svc.key];
  return (
    <div ref={ref} className={`card tilt-card reveal${visible ? ' is-visible' : ''}`}>
      <div className="ic"><Icon name={svc.icon} size={22} /></div>
      <h3>{t(k.title)}</h3>
      <p>{t(k.desc)}</p>
      <div className="tag-row">
        <span className="tag">{t(k.t1)}</span>
        <span className="tag">{t(k.t2)}</span>
        <span className="tag">{t(k.t3)}</span>
      </div>
      <Link to={svc.href} className="card-link"><span>{t('services.learn')}</span><Icon name="arrow" size={13} /></Link>
    </div>
  );
}

export default function Services() {
  const t = useT(I18N);
  const [headRef, headVisible] = useReveal();

  return (
    <section id="services">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow">{t('services.eyebrow')}</div>
          <h2>{t('services.title')}</h2>
        </div>
        <div className="grid grid-3">
          {SERVICES.map(svc => <ServiceCard key={svc.key} svc={svc} t={t} />)}
        </div>
      </div>
    </section>
  );
}
