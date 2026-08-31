import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

const KEYS = ['1','2','3','4','5'];

export default function Testimonials() {
  const t = useT(I18N);
  const [headRef, headVisible] = useReveal();
  const [trackRef, trackVisible] = useReveal();

  return (
    <section>
      <div className="container">
        <div ref={headRef} className={`section-head reveal${headVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow">{t('tmn.eyebrow')}</div>
          <h2>{t('tmn.title')}</h2>
        </div>
        <div ref={trackRef} className={`tmn-track reveal${trackVisible ? ' is-visible' : ''}`}>
          {KEYS.map(k => (
            <div className="tmn-card" key={k}>
              <div className="stars">★★★★★</div>
              <p>{t(`tmn.q${k}`)}</p>
              <div className="tmn-who">
                <div className="tmn-avatar">{t(`tmn.n${k}`)[0]}</div>
                <div><b>{t(`tmn.n${k}`)}</b><span>{t(`tmn.r${k}`)}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
