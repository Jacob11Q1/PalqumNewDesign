import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

const CASES = [
  { key: 'r1', lift: '+312%', stats: [['+312%','s1'],['4.8%','s2'],['6.2x','s3']] },
  { key: 'r2', lift: '+847%', stats: [['+847%','s1'],['-64%','s2'],['+210%','s3']] },
  { key: 'r3', lift: '0→$40K', stats: [['$40K','s1'],['2.1%','s2'],['71','s3']] },
];

function ResultCard({ c, t }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`result-card reveal${visible ? ' is-visible' : ''}`}>
      <span className="tag">{t(`results.${c.key}.tag`)}</span>
      <h3>{t(`results.${c.key}.title`)}</h3>
      <div className="lift">{t(`results.${c.key}.lift`)}</div>
      <p>{t(`results.${c.key}.desc`)}</p>
      <div className="result-stats">
        {c.stats.map(([val, sKey]) => (
          <div key={sKey}><b>{val}</b><span>{t(`results.${c.key}.${sKey}`)}</span></div>
        ))}
      </div>
    </div>
  );
}

export default function Results() {
  const t = useT(I18N);
  const [headRef, headVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <section id="results">
      <div className="container">
        <div ref={headRef} className={`section-head center reveal${headVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>{t('results.eyebrow')}</div>
          <h2>{t('results.title')}</h2>
        </div>
        <div className="results-grid">
          {CASES.map(c => <ResultCard key={c.key} c={c} t={t} />)}
        </div>
        <div ref={ctaRef} className={`results-cta reveal${ctaVisible ? ' is-visible' : ''}`}>
          <a href="#contact" className="btn btn-primary"><span>{t('results.cta')}</span><Icon name="arrow" size={15} /></a>
        </div>
      </div>
    </section>
  );
}
