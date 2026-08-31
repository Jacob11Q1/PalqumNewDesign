import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

export default function Footer() {
  const t = useT(I18N);

  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand"><span className="mark">PQ</span><span>Palqum</span></Link>
          <p>{t('footer.about')}</p>
          <div className="footer-tagline">{t('footer.tagline')}</div>
          <div className="badge pop" style={{ marginTop: 16 }}><Icon name="shield" size={13} /><span>{t('footer.reg')}</span></div>
        </div>
        <div>
          <h4>{t('footer.services')}</h4>
          <ul>
            <li><Link to="/web-development">{t('footer.s1')}</Link></li>
            <li><Link to="/ai-automation">{t('footer.s2')}</Link></li>
            <li><Link to="/branding">{t('footer.s3')}</Link></li>
            <li><Link to="/ads">{t('footer.s4')}</Link></li>
            <li><Link to="/pos">{t('footer.s5')}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t('footer.company')}</h4>
          <ul>
            <li><Link to="/portfolio">{t('footer.c1')}</Link></li>
            <li><a href="/#contact">{t('footer.c2')}</a></li>
            <li><Link to="/privacy">{t('footer.c3')}</Link></li>
            <li><Link to="/terms">{t('footer.c4')}</Link></li>
            <li><Link to="/cookies">{t('footer.c5')}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t('footer.touch')}</h4>
          <div className="contact-line" style={{ marginTop: 0 }}><span className="ic"><Icon name="mail" size={15} /></span><span style={{ fontSize: 14 }}>Support@palqum.com</span></div>
          <div className="contact-line"><span className="ic"><Icon name="wa" size={15} /></span><span style={{ fontSize: 14 }}>+972 56-921-4745</span></div>
          <div className="contact-line"><span className="ic"><Icon name="pin" size={15} /></span><span style={{ fontSize: 13.5 }}>128 City Road, London, EC1V 2NX, United Kingdom</span></div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t('footer.copy')}</span>
        <span>{t('footer.made')}</span>
      </div>
    </footer>
  );
}
