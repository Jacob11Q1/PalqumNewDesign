import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('palqum_lang') || 'en'; } catch { return 'en'; }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('palqum_lang', lang); } catch { /* storage unavailable */ }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(l => (l === 'en' ? 'ar' : 'en'));
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}

/** Pick the right string out of a { en, ar } dictionary entry for the current language. */
export function useT(dict) {
  const { lang } = useLang();
  return (key) => dict?.[lang]?.[key] ?? dict?.en?.[key] ?? '';
}
