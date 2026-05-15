import React, { useState } from "react";
import { createPortal } from "react-dom";
import LanguageSelector from "./ui/LanguageSelector";
import { useLang } from "../context/LanguageContext";

/* ── CSS ── */
const customStyles = `
  @keyframes navPillEnter {
    from { opacity: 0; transform: scale(0.9) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .glass-container {
    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%);
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1);
  }

  .optn .elementor-icon-list-items {
    transition: 0.5s; padding: 0 25px;
    display: flex; align-items: center; justify-content: center;
  }
  .optn:hover .elementor-icon-list-items { padding: 12px 25px; }
  .optn .elementor-icon-list-icon {
    opacity: 0; width: 0; transition: 0.8s; transform: scale(0.2);
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .optn:hover .elementor-icon-list-icon { opacity: 1; width: 32px; transform: scale(1.1); margin-right: 12px; }
  .optn:hover .elementor-icon-list-text { color: white !important; transition: 0.5s; }

  .bookmarkBtn {
    width: auto; min-width: 140px; height: 48px; border-radius: 50px;
    border: 1px solid rgba(198,242,33,0.5); background: rgb(15,15,15);
    display: flex; align-items: center; justify-content: flex-start;
    cursor: pointer; overflow: hidden; padding: 0; position: relative; margin-left: 15px; transition: 0.3s;
    text-decoration: none;
  }
  .bookmarkBtn::before {
    content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(198,242,33,0.2) 25%, rgba(255,255,255,0.9) 50%, rgba(198,242,33,0.2) 75%, transparent 100%);
    background-size: 200% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none; opacity: 0; z-index: 5; transition: opacity 0.3s;
  }
  .bookmarkBtn:hover::before { opacity: 1; animation: shinerySync 2s infinite ease-in-out; }
  @keyframes shinerySync { 0% { background-position: 150% 0; } 100% { background-position: -150% 0; } }
  .IconContainer {
    width: 36px; height: 36px; background: linear-gradient(to bottom, #d8ff60, #c6f221);
    border-radius: 50px; display: flex; align-items: center; justify-content: center;
    overflow: hidden; z-index: 2; transition: 0.3s; flex-shrink: 0; margin-left: 6px; position: relative;
  }
  .bookmarkBtn:hover .IconContainer { width: calc(100% - 12px); border-radius: 40px; }
  .btn-icon-svg { width: 18px; height: 18px; color: #000; transition: 0.3s; }
  .bookmarkBtn:hover .btn-icon-svg { animation: arrowNudge 1s infinite ease-in-out; }
  @keyframes arrowNudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
  .btn-text { color: white; z-index: 1; font-size: 15px; font-weight: 600; margin-left: 12px; margin-right: 15px; transition: 0.3s; }
  .bookmarkBtn:hover .btn-text { opacity: 0; transform: translateX(40px); }

  .nav-pill-wrap {
    position: fixed; top: 16px; left: 0; right: 0;
    display: flex; justify-content: center;
    z-index: 9997; pointer-events: none;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .nav-pill-wrap > * { pointer-events: auto; }
  .nav-pill-wrap[data-hidden] { transform: translateY(-80px); opacity: 0; }
  .nav-pill-wrap[data-hidden] > * { pointer-events: none; }
  .nav-pill-inner { animation: navPillEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

  @media (max-width: 768px) {
    .nav-pill-wrap { left: auto; right: 16px; justify-content: flex-end; }
  }
  .mobile-brand { display: none; }
  .hamburger {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    width: 40px; height: 40px; cursor: pointer; background: none; border: none; padding: 4px; margin-left: 8px;
  }
  .hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: all .3s ease; }
  @media (max-width: 768px) {
    .hamburger { display: flex; }
    .desktop-nav { display: none !important; }
    .desktop-cta { display: none !important; }
    .mobile-brand { display: flex; align-items: center; gap: 8px; margin-right: auto; padding-left: 4px; }
    .mobile-brand .mb-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 1rem; color: #fff; letter-spacing: -.03em; }
    .mobile-brand .mb-dot { color: #c6f221; }
  }
`;

const mobileOverlayStyles = `
  .mob-overlay-bg {
    position: fixed; inset: 0;
    background: rgba(3,21,18,0.6); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    z-index: 9998; opacity: 0; pointer-events: none; visibility: hidden;
    transition: opacity 0.2s, visibility 0s 0.2s;
  }
  .mob-overlay-bg.mob-open {
    opacity: 1; pointer-events: auto; visibility: visible;
    transition: opacity 0.2s, visibility 0s 0s;
  }
  .mob-sheet {
    position: fixed; top: 16px; right: 16px;
    width: calc(100vw - 32px); max-width: 340px;
    background: rgba(5,28,24,0.98); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px);
    border: 1px solid rgba(198,242,33,0.15); border-radius: 28px; z-index: 9999; overflow: hidden;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 32px 64px -12px rgba(0,0,0,0.7), 0 0 40px -10px rgba(198,242,33,0.08);
    opacity: 0; transform: translateY(-24px) scale(0.97); pointer-events: none; visibility: hidden;
    transition: opacity 0.3s cubic-bezier(0.34,1.56,0.64,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1), visibility 0s 0.3s;
  }
  .mob-sheet.mob-open {
    opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; visibility: visible;
    transition: opacity 0.3s cubic-bezier(0.34,1.56,0.64,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1), visibility 0s 0s;
  }
  .mob-sheet-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .mob-logo-area { display: flex; align-items: center; gap: 10px; }
  .mob-logo-area img { height: 48px; width: auto; border-radius: 8px; }
  .mob-logo-area .ml-name { font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 1rem; color: #fff; letter-spacing: -.02em; }
  .mob-logo-area .ml-sub { font-size: 0.55rem; color: #c6f221; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; }
  .mob-close-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6); cursor: pointer;
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem; line-height: 1; transition: all .2s ease;
  }
  .mob-close-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
  .mob-nav-list { padding: 8px 12px; display: flex; flex-direction: column; gap: 2px; }
  .mob-nav-item {
    display: flex; align-items: center; gap: 14px; padding: 14px 12px; border-radius: 16px;
    text-decoration: none; color: rgba(255,255,255,0.65);
    font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 600; letter-spacing: -.01em;
    position: relative; overflow: hidden;
    opacity: 0; transform: translateX(-12px);
    transition: background .2s ease, color .2s ease, opacity 0.25s, transform 0.25s;
  }
  .mob-nav-item:hover, .mob-nav-item:active { background: rgba(198,242,33,0.07); color: #fff; }
  .mob-nav-item:hover .mob-item-icon { background: rgba(198,242,33,0.2); }
  .mob-nav-item:hover .mob-item-arrow { opacity: 1; transform: translateX(0); color: #c6f221; }
  .mob-sheet.mob-open .mob-nav-item:nth-child(1) { opacity:1; transform:none; transition-delay:0.11s; }
  .mob-sheet.mob-open .mob-nav-item:nth-child(2) { opacity:1; transform:none; transition-delay:0.17s; }
  .mob-sheet.mob-open .mob-nav-item:nth-child(3) { opacity:1; transform:none; transition-delay:0.23s; }
  .mob-sheet.mob-open .mob-nav-item:nth-child(4) { opacity:1; transform:none; transition-delay:0.29s; }
  .mob-sheet.mob-open .mob-nav-item:nth-child(5) { opacity:1; transform:none; transition-delay:0.35s; }
  .mob-item-icon {
    width: 40px; height: 40px; border-radius: 12px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background .2s ease;
  }
  .mob-item-icon svg { width: 18px; height: 18px; color: rgba(255,255,255,0.7); }
  .mob-nav-item:hover .mob-item-icon svg { color: #c6f221; }
  .mob-item-label { flex: 1; }
  .mob-item-arrow { font-size: 0.9rem; color: rgba(255,255,255,0.2); opacity: 0; transform: translateX(-6px); transition: all .2s ease; flex-shrink: 0; }
  .mob-divider { height: 1px; margin: 0 20px; background: rgba(255,255,255,0.06); }
  .mob-sheet-footer { padding: 16px 16px 20px; }
  .mob-cta-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; padding: 16px 20px; border-radius: 14px; background: #c6f221; color: #000;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.875rem; font-weight: 800;
    letter-spacing: .07em; text-transform: uppercase; text-decoration: none; border: none; cursor: pointer;
    opacity: 0; transform: translateY(10px);
    transition: opacity 0.25s 0.38s, transform 0.25s 0.38s, box-shadow .25s ease;
  }
  .mob-sheet.mob-open .mob-cta-btn { opacity: 1; transform: translateY(0); }
  .mob-cta-btn:hover, .mob-cta-btn:active { transform: translateY(-1px) !important; box-shadow: 0 12px 32px rgba(198,242,33,0.3); }
  .mob-cta-btn .cta-arrow { transition: transform .25s ease; }
  .mob-cta-btn:hover .cta-arrow { transform: translateX(4px); }
  .mob-trust { margin-top: 10px; text-align: center; font-size: 0.62rem; letter-spacing: .06em; text-transform: uppercase; color: rgba(255,255,255,0.2); font-weight: 600; }
`;

/* ── Icons ── */
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);
const IconMethod = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const IconTeam = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const IconQuote = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2.5 1 5 2.5 5 1.5 0 2.5 1 2.5 2v1H3z"/><path d="M13 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-2c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2.5 1 5 2.5 5 1.5 0 2.5 1 2.5 2v1h-7z"/></svg>
);

/* ── FloatingNav — no framer-motion ── */
const FloatingNav = ({ navItems, lang, setLang }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visible, setVisible]           = useState(true);
  const [mobileOpen, setMobileOpen]     = useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return createPortal(
    <>
      <style>{customStyles}</style>
      <style>{mobileOverlayStyles}</style>

      {/* Mobile overlay */}
      <div
        className={`mob-overlay-bg${mobileOpen ? ' mob-open' : ''}`}
        onClick={closeMobile}
      />

      {/* Mobile sheet */}
      <div className={`mob-sheet${mobileOpen ? ' mob-open' : ''}`}>
        <div className="mob-sheet-head">
          <div className="mob-logo-area">
            <img src="/assets/vv-logo.png" alt="VV Traffic Data" width="48" height="48" />
          </div>
          <button className="mob-close-btn" onClick={closeMobile} aria-label="Fechar menu">✕</button>
        </div>

        <nav className="mob-nav-list" aria-label="Navegação mobile">
          {navItems.map((item, i) => (
            <a key={i} href={item.link} className="mob-nav-item" onClick={closeMobile}>
              <span className="mob-item-icon">{item.icon}</span>
              <span className="mob-item-label">{item.name}</span>
              <span className="mob-item-arrow">→</span>
            </a>
          ))}
        </nav>

        <div className="mob-divider" />

        <div className="mob-sheet-footer">
          <a href="#agendar" className="mob-cta-btn" onClick={closeMobile}>
            Agendar Reunião Diagnóstica
            <span className="cta-arrow">→</span>
          </a>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>
            <LanguageSelector lang={lang} setLang={setLang} />
          </div>
          <p className="mob-trust">30 min · sem compromisso · diagnóstico gratuito</p>
        </div>
      </div>

      {/* Floating pill */}
      <div className="nav-pill-wrap" {...(!visible ? { 'data-hidden': '' } : {})}>
        <div
          className="nav-pill-inner glass-container"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '9999px', padding: '12px 12px 12px 24px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', whiteSpace: 'nowrap',
          }}
        >
          <span className="mobile-brand">
            <span className="mb-logo">VV Traffic<span className="mb-dot">.</span></span>
          </span>

          <nav className="desktop-nav" aria-label="Navegação principal" style={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((navItem, idx) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="optn"
                style={{ position: 'relative', textDecoration: 'none' }}
              >
                <div className="elementor-icon-list-items">
                  <span className="elementor-icon-list-icon">{navItem.icon}</span>
                  <span className="elementor-icon-list-text" style={{ color: 'rgba(163,163,163,1)', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.025em' }}>
                    {navItem.name}
                  </span>
                  {hoveredIndex === idx && (
                    <span style={{
                      position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '3px',
                      background: 'linear-gradient(to right, transparent, #c6f221, transparent)',
                      boxShadow: '0 0 12px rgba(198,242,33,0.8)',
                    }} />
                  )}
                </div>
              </a>
            ))}
          </nav>

          <span className="desktop-cta">
            <LanguageSelector lang={lang} setLang={setLang} />
          </span>

          <a href="#agendar" className="bookmarkBtn desktop-cta" aria-label="Agendar reunião">
            <span className="IconContainer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-icon-svg">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </span>
            <p className="btn-text">Agendar</p>
          </a>

          <button
            className="hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            <span style={{ transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default function Header() {
  const { lang, setLang } = useLang();

  const navItems = [
    { name: "Início",      link: "#top",        icon: <IconHome /> },
    { name: "Resultados",  link: "#numeros",     icon: <IconChart /> },
    { name: "Método",      link: "#metodo",      icon: <IconMethod /> },
    { name: "Equipa",      link: "#equipa",      icon: <IconTeam /> },
    { name: "Testemunhos", link: "#testemunhos", icon: <IconQuote /> },
  ];
  return <FloatingNav navItems={navItems} lang={lang} setLang={setLang} />;
}
