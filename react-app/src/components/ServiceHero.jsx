import Icon from './Icon.jsx';
import { useT } from '../context/LangContext.jsx';

export default function ServiceHero({ content }) {
  const t = useT(content.i18n);
  return (
    <header className="hero service-hero">
      <div className="hero-bg"><div className="dot-grid" /><div className="blob blob-1" /><div className="blob blob-2" /></div>
      <div className="container hero-grid">
        <div className="stagger-in">
          <div className="hero-badges">
            <span className="badge">{t('hero.badge1')}</span>
            <span className="badge pop"><Icon name="shield" size={13} /><span>{t('hero.badge2')}</span></span>
          </div>
          <h1>{t('hero.titlePre')}<span className="hl">{t('hero.titleHl')}</span></h1>
          <p className="desc">{t('hero.desc')}</p>
          <div className="hero-cta">
            <a href="/#contact" className="btn btn-primary"><span>{t('hero.cta1')}</span><Icon name="arrow" size={15} /></a>
            <a href="#included" className="btn btn-ghost">{t('hero.cta2')}</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-core" />
          <div className="float-card card-1 drift-a">
            <div className="fc-label"><span className="fc-dot" /><span>{t('hero.fc1label')}</span></div>
            {content.fc1title ? <div className="fc-title">{t('hero.fc1title')}</div> : null}
            <div className="fc-val">{content.fc1val}</div>
          </div>
          <div className="float-card card-2 drift-b">
            <div className="fc-label"><Icon name={content.fc2icon} size={12} /><span>{t('hero.fc2label')}</span></div>
            <div className="fc-val">{content.fc2val}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
