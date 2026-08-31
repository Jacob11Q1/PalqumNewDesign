import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';

export default function ServiceStats({ content }) {
  const t = useT(content.i18n);
  const [ref, visible] = useReveal();
  return (
    <section>
      <div className="container">
        <div ref={ref} className={`stats-row reveal${visible ? ' is-visible' : ''}`}>
          {content.stats.map(s => (
            <div className="stat-box" key={s.key}><b>{s.value}</b><span>{t(`stats.${s.key}`)}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
