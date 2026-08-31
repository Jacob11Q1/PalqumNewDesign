import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';

function FeatureCard({ icon, tKey, t }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`card tilt-card reveal${visible ? ' is-visible' : ''}`}>
      <div className="ic"><Icon name={icon} size={22} /></div>
      <h3>{t(`feat.${tKey}.t`)}</h3>
      <p>{t(`feat.${tKey}.d`)}</p>
    </div>
  );
}

export default function ServiceFeatures({ content }) {
  const t = useT(content.i18n);
  const [headRef, headVisible] = useReveal();
  return (
    <section id="included">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow">{t('feat.eyebrow')}</div>
          <h2>{t('feat.title')}</h2>
        </div>
        <div className="grid grid-3">
          {content.features.map(f => <FeatureCard key={f.key} icon={f.icon} tKey={f.key} t={t} />)}
        </div>
      </div>
    </section>
  );
}
