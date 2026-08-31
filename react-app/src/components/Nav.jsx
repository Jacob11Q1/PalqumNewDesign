import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useLang, useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

export default function Nav() {
  const { lang, toggleLang } = useLang();
  const t = useT(I18N);
  const [shrink, setShrink] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['nav.services', '/#services'],
    ['nav.why', '/#why-us'],
    ['nav.results', '/#results'],
    ['nav.pricing', '/#pricing'],
    ['nav.contact', '/#contact'],
  ];

  return (
    <>
      <div className="nav-wrap">
        <nav className={`nav${shrink ? ' shrink' : ''}`}>
          <Link to="/" className="brand"><span className="mark">PQ</span><span>Palqum</span></Link>
          <div className="nav-links">
            {links.map(([key, href]) => <a key={key} href={href}>{t(key)}</a>)}
          </div>
          <div className="nav-right">
            <button className="lang-btn" onClick={toggleLang}>
              <Icon name="globe" size={14} />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            <a href="/#contact" className="btn btn-primary btn-sm">
              <span>{t('nav.cta')}</span><Icon name="arrow" size={14} />
            </a>
            <button className="hamburger" onClick={() => setMobileOpen(true)}>
              <Icon name="menu" size={18} />
            </button>
          </div>
        </nav>
      </div>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
        <div className="mobile-panel">
          <button className="mobile-close" onClick={() => setMobileOpen(false)}><Icon name="close" size={16} /></button>
          {links.map(([key, href]) => <a key={key} href={href} onClick={() => setMobileOpen(false)}>{t(key)}</a>)}
          <a href="/#contact" className="btn btn-primary" onClick={() => setMobileOpen(false)}>{t('nav.cta')}</a>
        </div>
      </div>
    </>
  );
}
