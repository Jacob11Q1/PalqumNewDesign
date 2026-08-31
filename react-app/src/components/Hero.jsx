import Icon from './Icon.jsx';
import useCountUp from '../hooks/useCountUp.js';
import { useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

function Stat({ target, suffix, labelKey, t }) {
  const [ref, value] = useCountUp(target);
  return (
    <div className="stat">
      <b ref={ref}>{value}</b>{suffix}<span>{t(labelKey)}</span>
    </div>
  );
}

export default function Hero() {
  const t = useT(I18N);

  return (
    <header className="hero">
      <div className="hero-bg"><div className="dot-grid" /><div className="blob blob-1" /><div className="blob blob-2" /></div>
      <div className="container hero-grid">
        <div className="stagger-in">
          <div className="hero-badges">
            <span className="badge">{t('hero.badge1')}</span>
            <span className="badge pop"><Icon name="shield" size={13} /> <span>{t('hero.badge2')}</span></span>
          </div>
          <h1>{t('hero.titlePre')}<span className="hl">{t('hero.titleHl')}</span></h1>
          <p className="desc">{t('hero.desc')}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary"><span>{t('hero.cta1')}</span><Icon name="arrow" size={15} /></a>
            <a href="#results" className="btn btn-ghost">{t('hero.cta2')}</a>
          </div>
          <div className="hero-stats">
            <Stat target={20} suffix="+" labelKey="hero.stat1" t={t} />
            <Stat target={98} suffix="%" labelKey="hero.stat2" t={t} />
            <Stat target={5} suffix="+" labelKey="hero.stat3" t={t} />
            <Stat target={30} suffix="+" labelKey="hero.stat4" t={t} />
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-core" />
          <div className="float-card card-1 drift-a">
            <div className="fc-label"><span className="fc-dot" /><span>{t('hero.fc1label')}</span></div>
            <div className="fc-title">{t('hero.fc1title')}</div>
            <div className="fc-val">↑ 312%</div>
          </div>
          <div className="float-card card-2 drift-b">
            <div className="fc-label"><span className="fc-dot" /><span>{t('hero.fc2label')}</span></div>
            <div className="fc-val">+847%</div>
            <div className="fc-title">{t('hero.fc2title')}</div>
          </div>
          <div className="float-card card-3 drift-c">
            <div className="fc-label"><Icon name="check" size={12} /><span>{t('hero.fc3label')}</span></div>
          </div>
        </div>
      </div>
    </header>
  );
}
