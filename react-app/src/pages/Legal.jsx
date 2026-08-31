/** Generic renderer for the legal pages. Content stays English-only on purpose —
    see CLAUDE.md "Known gaps" for why translating legal text wasn't done casually. */
export default function Legal({ content }) {
  return (
    <>
      <header className="hero service-hero" style={{ paddingBottom: 20 }}>
        <div className="hero-bg"><div className="dot-grid" /></div>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="eyebrow">Legal</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)' }}>{content.title}</h1>
        </div>
      </header>
      <section style={{ paddingTop: 20 }}>
        <div className="container prose" dir="ltr" style={{ textAlign: 'left' }}>
          <p className="updated">Last updated: {content.updated}</p>
          {content.toc && (
            <div className="toc">
              <h4>Contents</h4>
              <ol>{content.toc.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
            </div>
          )}
          {content.body.map((block, i) => {
            if (block.type === 'h2') return <h2 id={block.id} key={i}>{block.text}</h2>;
            if (block.type === 'p') return <p key={i} dangerouslySetInnerHTML={{ __html: block.text }} />;
            if (block.type === 'ul') return <ul key={i}>{block.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
            return null;
          })}
        </div>
      </section>
    </>
  );
}
