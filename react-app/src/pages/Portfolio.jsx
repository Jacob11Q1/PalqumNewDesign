import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { useT } from '../context/LangContext.jsx';

const I18N = {
  en: {
    'hero.badge1': 'Our Work', 'hero.badge2': 'Registered UK Company · No. 17326987',
    'hero.titlePre': 'Projects That ', 'hero.titleHl': 'Speak for Themselves',
    'hero.desc': 'Real work. Real results. Every project in this portfolio started with a business goal and ended with measurable growth.',
    'filter.all': 'All', 'filter.web': 'Web', 'filter.ai': 'AI', 'filter.brand': 'Branding', 'filter.ads': 'Ads', 'filter.pos': 'POS',
    'work.view': 'View Project',
    'cta.title': 'Want Your Project in This Portfolio?', 'cta.desc': "Let's talk about what we can build together.", 'cta.btn': 'Book a Free Call',
  },
  ar: {
    'hero.badge1': 'أعمالنا', 'hero.badge2': 'شركة مسجّلة في المملكة المتحدة · رقم 17326987',
    'hero.titlePre': 'مشاريع ', 'hero.titleHl': 'تتحدث عن نفسها',
    'hero.desc': 'عمل حقيقي. نتائج حقيقية. كل مشروع في هذا المعرض بدأ بهدف عمل وانتهى بنمو قابل للقياس.',
    'filter.all': 'الكل', 'filter.web': 'مواقع', 'filter.ai': 'ذكاء اصطناعي', 'filter.brand': 'هوية بصرية', 'filter.ads': 'إعلانات', 'filter.pos': 'نقاط بيع',
    'work.view': 'عرض المشروع',
    'cta.title': 'تريد مشروعك في هذا المعرض؟', 'cta.desc': 'لنتحدث عمّا يمكننا بناءه معًا.', 'cta.btn': 'احجز مكالمة مجانية',
  },
};

const ITEMS = [
  { name: 'GoMedia Design Agency', cat: 'web', grad: ['#4C3AA0', '#7C5CFF'] },
  { name: 'Lavanda Shisha Lounge', cat: 'web', grad: ['#8C5A0E', '#D8FA46'], lift: '+312%' },
  { name: 'DanialFactory Store', cat: 'web', grad: ['#2F6B4F', '#5B3FD6'], lift: '+152%' },
  { name: 'JB Carpentry Catalog', cat: 'web', grad: ['#3A5A88', '#9C86FF'] },
  { name: 'Jacob Qumsieh Portfolio', cat: 'web', grad: ['#5B3FD6', '#D8FA46'] },
  { name: 'Ibrahem Qumsieh Portfolio', cat: 'web', grad: ['#A6382B', '#7C5CFF'] },
  { name: '3alhatab Restaurant', cat: 'web', grad: ['#8C5A0E', '#A6382B'], lift: '+312%' },
  { name: 'Sanctishell Store', cat: 'web', grad: ['#2F6B4F', '#3A5A88'] },
  { name: 'Q Beauty Center Links Page', cat: 'web', grad: ['#7C5CFF', '#A6382B'], lift: '+152%' },
  { name: 'Doctor Fadi Abu Feda Links', cat: 'web', grad: ['#3A5A88', '#8C5A0E'] },
  { name: 'SilentGamerz Landing Page', cat: 'web', grad: ['#5B3FD6', '#2F6B4F'] },
];

const FILTERS = ['all', 'web', 'ai', 'brand', 'ads', 'pos'];

export default function Portfolio() {
  const t = useT(I18N);
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? ITEMS : ITEMS.filter(i => i.cat === filter);

  return (
    <>
      <header className="hero service-hero" style={{ paddingBottom: 50 }}>
        <div className="hero-bg"><div className="dot-grid" /></div>
        <div className="container stagger-in" style={{ maxWidth: 760, textAlign: 'center' }}>
          <div className="hero-badges" style={{ justifyContent: 'center' }}>
            <span className="badge">{t('hero.badge1')}</span>
            <span className="badge pop"><Icon name="shield" size={13} /><span>{t('hero.badge2')}</span></span>
          </div>
          <h1>{t('hero.titlePre')}<span className="hl">{t('hero.titleHl')}</span></h1>
          <p className="desc" style={{ marginInline: 'auto' }}>{t('hero.desc')}</p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filter-row">
            {FILTERS.map(f => (
              <button key={f} className={`filter-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{t(`filter.${f}`)}</button>
            ))}
          </div>
          <div className="work-grid">
            {visible.map(item => (
              <div className="work-card" key={item.name}>
                <div className="work-thumb" style={{ background: `linear-gradient(135deg,${item.grad[0]},${item.grad[1]})` }}>
                  <span>{item.name}</span>
                </div>
                <div className="work-body">
                  <div className="work-cat">{t(`filter.${item.cat}`)}</div>
                  <h3>{item.name}</h3>
                  {item.lift && <div className="work-lift">{item.lift}</div>}
                  <a href="#book" className="card-link" style={{ marginTop: 10 }}>
                    <span>{t('work.view')}</span><Icon name="arrow" size={13} style={{ marginInlineStart: 4 }} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }} id="book">
        <div className="container">
          <CtaBand title={t('cta.title')} desc={t('cta.desc')} btn={t('cta.btn')} href="/#contact" />
        </div>
      </section>
    </>
  );
}
