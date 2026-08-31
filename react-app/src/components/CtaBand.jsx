import Icon from './Icon.jsx';
import useReveal from '../hooks/useReveal.js';

export default function CtaBand({ title, desc, btn, href = '#contact' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`cta-band reveal${visible ? ' is-visible' : ''}`}>
      {title && <h2>{title}</h2>}
      {desc && <p>{desc}</p>}
      <a href={href} className="btn btn-primary"><span>{btn}</span><Icon name="arrow" size={15} /></a>
    </div>
  );
}
