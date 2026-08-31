import { useState } from 'react';
import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';
import { useLang, useT } from '../context/LangContext.jsx';
import { I18N, SERVICE_PLANS } from '../data/homeContent.js';

const RATES = { USD: 1, EUR: 0.92, ILS: 3.7 };
const SYM = { USD: '$', EUR: '€', ILS: '₪' };
const SERVICE_TABS = [['web', 'pricing.tab1'], ['ai', 'pricing.tab2'], ['brand', 'pricing.tab3'], ['pos', 'pricing.tab4']];
const CURRENCIES = ['USD', 'EUR', 'ILS'];

function fmtPrice(price, cur, lang) {
  if (price === null) return lang === 'ar' ? 'مخصص' : 'Custom';
  const val = Math.round(price * RATES[cur]);
  return SYM[cur] + val.toLocaleString('en-US');
}

function PriceCard({ plan, lang, cur, t }) {
  const p = plan[lang];
  return (
    <div className={`price-card${plan.featured ? ' featured' : ''}`}>
      {plan.featured && <span className="pop-badge">{lang === 'ar' ? 'الأكثر طلبًا' : 'Most Popular'}</span>}
      <h3>{p.name}</h3>
      <div className="plan-desc">{p.desc}</div>
      <div className="amount">
        <b>{fmtPrice(plan.price, cur, lang)}</b>
        {plan.price !== null && <span>/ {lang === 'ar' ? 'لمرة واحدة' : 'one-time'}</span>}
      </div>
      <ul>
        {p.feats.map(f => (
          <li key={f}><Icon name="check" size={16} /><span>{f}</span></li>
        ))}
      </ul>
      <a href="#contact" className={`btn ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}>
        <span>{lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span><Icon name="arrow" size={14} />
      </a>
    </div>
  );
}

export default function Pricing() {
  const { lang } = useLang();
  const t = useT(I18N);
  const [service, setService] = useState('web');
  const [cur, setCur] = useState('USD');
  const [headRef, headVisible] = useReveal();
  const [ctrlRef, ctrlVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal();

  return (
    <section id="pricing">
      <div className="container">
        <div ref={headRef} className={`section-head center reveal${headVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>{t('pricing.eyebrow')}</div>
          <h2>{t('pricing.title')}</h2>
          <p className="desc">{t('pricing.desc')}</p>
        </div>
        <div ref={ctrlRef} className={`pricing-controls reveal${ctrlVisible ? ' is-visible' : ''}`}>
          <div className="tab-group">
            {SERVICE_TABS.map(([id, key]) => (
              <button key={id} className={service === id ? 'active' : ''} onClick={() => setService(id)}>{t(key)}</button>
            ))}
          </div>
          <div className="tab-group">
            {CURRENCIES.map(c => (
              <button key={c} className={cur === c ? 'active' : ''} onClick={() => setCur(c)}>{c === 'ILS' ? 'ILS ₪' : c}</button>
            ))}
          </div>
        </div>
        <div ref={gridRef} className={`price-grid reveal${gridVisible ? ' is-visible' : ''}`}>
          {SERVICE_PLANS[service].map(plan => <PriceCard key={plan.id} plan={plan} lang={lang} cur={cur} t={t} />)}
        </div>
        <p className="price-note">{t('pricing.notePre')}<a href="#contact">{t('pricing.noteLink')} →</a></p>
      </div>
    </section>
  );
}
