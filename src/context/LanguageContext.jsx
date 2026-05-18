import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('ar');

  const setLang = (newLang) => {
    setLangState(newLang);
    const isRtl = newLang === 'ar';
    document.documentElement.dir  = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang === 'pt-PT' ? 'pt' : newLang === 'ar' ? 'ar' : 'en';
  };

  useEffect(() => {
    document.documentElement.dir  = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
