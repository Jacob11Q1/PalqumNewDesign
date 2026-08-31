import { useEffect } from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import WhatsAppFab from './WhatsAppFab.jsx';

export default function Layout({ title, children }) {
  useEffect(() => {
    if (title) document.title = title;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <WhatsAppFab />
    </>
  );
}
