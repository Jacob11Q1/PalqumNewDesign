import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';
import { I18N, WORK_ITEMS } from '../data/homeContent.js';

function WorkCard({ item }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`work-card reveal${visible ? ' is-visible' : ''}`}>
      <div className="work-thumb" style={{ background: `linear-gradient(135deg,${item.grad[0]},${item.grad[1]})` }}>
        <span>{item.name}</span>
      </div>
      <div className="work-body">
        <div className="work-cat">Web</div>
        <h3>{item.name}</h3>
        {item.lift && <div className="work-lift">{item.lift}</div>}
      </div>
    </div>
  );
}

export default function Work() {
  const t = useT(I18N);
  const [headRef, headVisible] = useReveal();

  return (
    <section id="work">
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' is-visible' : ''}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, maxWidth: 'none' }}>
          <div>
            <div className="eyebrow">{t('work.eyebrow')}</div>
            <h2>{t('work.title')}</h2>
          </div>
          <Link to="/portfolio" className="btn btn-ghost btn-sm">{t('work.seeall')}</Link>
        </div>
        <div className="work-grid">
          {WORK_ITEMS.map(item => <WorkCard key={item.name} item={item} />)}
        </div>
      </div>
    </section>
  );
}
