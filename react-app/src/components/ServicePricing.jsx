import { useState } from 'react';
import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';
import { useLang, useT } from '../context/LangContext.jsx';

const RATES = { USD: 1, EUR: 0.92, ILS: 3.7 };
const SYM = { USD: '$', EUR: '€', ILS: '₪' };
const CURRENCIES = ['USD', 'EUR', 'ILS'];

function fmtPrice(price, cur, lang) {
  if (price === null) return lang === 'ar' ? 'مخصص' : 'Custom';
  const val = Math.round(price * RATES[cur]);
  return SYM[cur] + val.toLocaleString('en-US');
}

export default function ServicePricing({ content }) {
  const { lang } = useLang();
  const t = useT(content.i18n);
  const [cur, setCur] = useState('USD');
  const [headRef, headVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section id="pricing">
      <div className="container">
        <div ref={headRef} className={`section-head center reveal${headVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>{t('pricing.eyebrow')}</div>
          <h2>{t('pricing.title')}</h2>
        </div>
        <div className="pricing-controls" style={{ justifyContent: 'center' }}>
          <div className="tab-group">
            {CURRENCIES.map(c => (
              <button key={c} className={cur === c ? 'active' : ''} onClick={() => setCur(c)}>{c === 'ILS' ? 'ILS ₪' : c}</button>
            ))}
          </div>
        </div>
        <div ref={gridRef} className={`price-grid reveal${gridVisible ? ' is-visible' : ''}`}>
          {content.plans.map(plan => {
            const p = plan[lang];
            return (
              <div className={`price-card${plan.featured ? ' featured' : ''}`} key={plan.id}>
                {plan.featured && <span className="pop-badge">{lang === 'ar' ? 'الأكثر طلبًا' : 'Most Popular'}</span>}
                <h3>{p.name}</h3>
                <div className="plan-desc">{p.desc}</div>
                <div className="amount">
                  <b>{fmtPrice(plan.price, cur, lang)}</b>
                  {plan.price !== null && <span>/ {lang === 'ar' ? 'لمرة واحدة' : 'one-time'}</span>}
                </div>
                <ul>{p.feats.map(f => <li key={f}><Icon name="check" size={16} /><span>{f}</span></li>)}</ul>
                <a href="/#contact" className={`btn ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}>
                  <span>{lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span><Icon name="arrow" size={14} />
                </a>
              </div>
            );
          })}
        </div>
        <p className="price-note">{t('pricing.note')}</p>
      </div>
    </section>
  );
}
