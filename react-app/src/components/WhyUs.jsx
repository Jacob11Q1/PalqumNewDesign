import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

const CHECKS = ['c1','c2','c3','c4','c5','c6'];

export default function WhyUs() {
  const t = useT(I18N);
  const [leftRef, leftVisible] = useReveal();
  const [rightRef, rightVisible] = useReveal();

  return (
    <section id="why-us">
      <div className="container why-grid">
        <div ref={leftRef} className={`reveal${leftVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow">{t('why.eyebrow')}</div>
          <h2>{t('why.title')}</h2>
          <p className="section-head desc" style={{ marginTop: 16, maxWidth: '48ch' }}>{t('why.desc')}</p>
          <div className="checklist">
            {CHECKS.map(c => (
              <div className="check-item" key={c}>
                <div className="ic"><Icon name="check" size={15} strokeWidth={2.4} /></div>
                <div><b>{t(`why.${c}`)}</b><span>{t(`why.${c}s`)}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div ref={rightRef} className={`stat-panel reveal${rightVisible ? ' is-visible' : ''}`}>
          <div className="stat-hero">
            <div className="label">{t('why.rev')}</div>
            <div className="value">+284%</div>
            <div className="sub">{t('why.revsub')}</div>
            <div className="bar"><i /></div>
            <div className="sub" style={{ marginTop: 8 }}>{t('why.revsub2')}</div>
          </div>
          <div className="mini-stats">
            <div className="mini-stat"><b>★ 4.9</b><span>{t('why.m1')}</span></div>
            <div className="mini-stat"><b>24h</b><span>{t('why.m2')}</span></div>
            <div className="mini-stat"><b>100%</b><span>{t('why.m3')}</span></div>
            <div className="mini-stat"><b>3x</b><span>{t('why.m4')}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
