import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

export default function UnderTheHood() {
  const t = useT(I18N);
  const [headRef, headVisible] = useReveal();
  const [mockRef, mockVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <section>
      <div className="container">
        <div ref={headRef} className={`section-head center reveal${headVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>{t('hood.eyebrow')}</div>
          <h2>{t('hood.title')}</h2>
        </div>
        <div ref={mockRef} className={`hood-mock reveal${mockVisible ? ' is-visible' : ''}`}>
          <div className="hood-top">
            <span className="hood-dot" style={{ background: '#FF6159' }} /><span className="hood-dot" style={{ background: '#FFC02E' }} /><span className="hood-dot" style={{ background: '#28C93F' }} />
            <div className="tabs"><span className="active">analytics.ts</span><span>automation.js</span><span>config.ts</span></div>
          </div>
          <div className="hood-body">
            <ul className="hood-explorer">
              <li className="ex-title">{t('hood.explorer')}</li>
              <li className="active">📄 analytics.ts</li>
              <li>⚡ automation.js</li>
              <li>⚙️ config.ts</li>
              <li>🗄️ schema.sql</li>
            </ul>
            <div className="hood-panel">
              <div className="hood-stat"><div className="l">{t('hood.s1')}</div><div className="v">$84,230</div><div className="d">↑ 24.8%</div></div>
              <div className="hood-stat"><div className="l">{t('hood.s2')}</div><div className="v">3,847</div><div className="d">↑ 18.2%</div></div>
              <div className="hood-stat"><div className="l">{t('hood.s3')}</div><div className="v">4m 32s</div><div className="d">{t('hood.optimal')}</div></div>
              <div className="hood-chart">
                <div className="l">{t('hood.chart')}</div>
                <svg viewBox="0 0 400 80" width="100%" height="80" preserveAspectRatio="none">
                  <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D8FA46" stopOpacity=".35" /><stop offset="100%" stopColor="#D8FA46" stopOpacity="0" /></linearGradient></defs>
                  <path d="M0,60 L35,55 L70,58 L105,42 L140,48 L175,30 L210,36 L245,20 L280,26 L315,14 L350,18 L400,6 L400,80 L0,80 Z" fill="url(#chartFill)" />
                  <path d="M0,60 L35,55 L70,58 L105,42 L140,48 L175,30 L210,36 L245,20 L280,26 L315,14 L350,18 L400,6" fill="none" stroke="#D8FA46" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="hood-foot"><span>{t('hood.foot1')}</span><span>UTF-8 · palqum v2.4.1</span></div>
        </div>
        <div ref={ctaRef} className={`hood-cta reveal${ctaVisible ? ' is-visible' : ''}`}>
          <a href="#contact" className="btn btn-primary"><span>{t('hood.cta')}</span><Icon name="arrow" size={15} /></a>
        </div>
      </div>
    </section>
  );
}
