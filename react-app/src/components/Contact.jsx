import { useState } from 'react';
import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';
import { useT } from '../context/LangContext.jsx';
import { I18N } from '../data/homeContent.js';

export default function Contact() {
  const t = useT(I18N);
  const [sent, setSent] = useState(false);
  const [infoRef, infoVisible] = useReveal();
  const [formRef, formVisible] = useReveal();

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  }

  return (
    <section id="contact">
      <div className="container contact-grid">
        <div ref={infoRef} className={`reveal${infoVisible ? ' is-visible' : ''}`}>
          <div className="eyebrow">{t('contact.eyebrow')}</div>
          <h2>{t('contact.title')}</h2>
          <p className="desc">{t('contact.desc')}</p>
          <div className="contact-line"><span className="ic"><Icon name="wa" size={17} /></span><span>+972 56-921-4745 (WhatsApp)</span></div>
          <div className="contact-line"><span className="ic"><Icon name="mail" size={17} /></span><span>Support@palqum.com</span></div>
          <div className="contact-line"><span className="ic"><Icon name="clock" size={17} /></span><span>{t('contact.hours')}</span></div>
          <div className="trust-row">
            <span className="badge">{t('contact.t1')}</span>
            <span className="badge">{t('contact.t2')}</span>
            <span className="badge">{t('contact.t3')}</span>
          </div>
        </div>
        <div ref={formRef} className={`form-card reveal${formVisible ? ' is-visible' : ''}`}>
          <h3>{t('contact.form.title')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field"><label>{t('contact.form.name')}</label><input type="text" required /></div>
              <div className="field"><label>{t('contact.form.biz')}</label><input type="text" required /></div>
            </div>
            <div className="form-grid">
              <div className="field"><label>{t('contact.form.email')}</label><input type="email" required /></div>
              <div className="field"><label>{t('contact.form.phone')}</label><input type="tel" /></div>
            </div>
            <div className="field">
              <label>{t('contact.form.service')}</label>
              <select>
                <option>{t('contact.form.opt0')}</option>
                <option>{t('contact.form.opt1')}</option>
                <option>{t('contact.form.opt2')}</option>
                <option>{t('contact.form.opt3')}</option>
                <option>{t('contact.form.opt4')}</option>
                <option>{t('contact.form.opt5')}</option>
                <option>{t('contact.form.opt6')}</option>
              </select>
            </div>
            <div className="field"><label>{t('contact.form.msg')}</label><textarea /></div>
            <label className="consent"><input type="checkbox" required /><span>{t('contact.form.consent')}</span></label>
            <button type="submit" className="btn btn-primary"><span>{t('contact.form.submit')}</span><Icon name="arrow" size={15} /></button>
            <div className={`form-msg${sent ? ' show' : ''}`}>{t('contact.form.sent')}</div>
          </form>
        </div>
      </div>
    </section>
  );
}
