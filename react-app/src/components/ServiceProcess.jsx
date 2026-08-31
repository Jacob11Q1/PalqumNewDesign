import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';

export default function ServiceProcess({ content }) {
  const t = useT(content.i18n);
  const [headRef, headVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();
  return (
    <section>
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow">{t('proc.eyebrow')}</div>
          <h2>{t('proc.title')}</h2>
        </div>
        <div ref={gridRef} className={`process-grid reveal${gridVisible ? ' is-visible' : ''}`}>
          {content.process.map((p, i) => (
            <div className="process-step" key={p}>
              <div className="num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{t(`proc.${p}.t`)}</h3>
              <p>{t(`proc.${p}.d`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
