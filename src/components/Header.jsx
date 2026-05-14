import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────────── */
const customStyles = `
  /* ── glass pill ── */
  .glass-container {
    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%);
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow:
      0 10px 25px -5px rgba(0,0,0,0.3),
      0 8px 10px -6px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,0.1);
  }

  /* ── desktop nav item ── */
  .optn .elementor-icon-list-items {
    transition: 0.5s;
    padding: 0 25px;
    display: flex; align-items: center; justify-content: center;
  }
  .optn:hover .elementor-icon-list-items {
    padding: 12px 25px;
  }
  .optn .elementor-icon-list-icon {
    opacity: 0; width: 0; transition: 0.8s;
    transform: scale(0.2);
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .optn:hover .elementor-icon-list-icon {
    opacity: 1; width: 32px; transform: scale(1.1); margin-right: 12px;
  }
  .optn:hover .elementor-icon-list-text { color: white !important; transition: 0.5s; }

  /* ── CTA button ── */
  .bookmarkBtn {
    width: auto; min-width: 140px; height: 48px;
    border-radius: 50px;
    border: 1px solid rgba(198,242,33,0.5);
    background: rgb(15,15,15);
    display: flex; align-items: center; justify-content: flex-start;
    cursor: pointer; overflow: hidden; padding: 0;
    position: relative; margin-left: 15px;
    transition: 0.3s;
  }
  .bookmarkBtn::before {
    content: ''; position: absolute; inset: -1px;
    border-radius: inherit; padding: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(198,242,33,0.2) 25%, rgba(255,255,255,0.9) 50%, rgba(198,242,33,0.2) 75%, transparent 100%);
    background-size: 200% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none; opacity: 0; z-index: 5; transition: opacity 0.3s;
  }
  .bookmarkBtn:hover::before { opacity: 1; animation: shinerySync 2s infinite ease-in-out; }
  @keyframes shinerySync {
    0% { background-position: 150% 0; }
    100% { background-position: -150% 0; }
  }
  .IconContainer {
    width: 36px; height: 36px;
    background: linear-gradient(to bottom, #d8ff60, #c6f221);
    border-radius: 50px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; z-index: 2; transition: 0.3s;
    flex-shrink: 0; margin-left: 6px; position: relative;
  }
  .bookmarkBtn:hover .IconContainer { width: calc(100% - 12px); border-radius: 40px; }
  .btn-icon-svg { width: 18px; height: 18px; color: #000; transition: 0.3s; }
  .bookmarkBtn:hover .btn-icon-svg { animation: arrowNudge 1s infinite ease-in-out; }
  @keyframes arrowNudge {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
  }
  .btn-text {
    color: white; z-index: 1; font-size: 15px; font-weight: 600;
    margin-left: 12px; margin-right: 15px; transition: 0.3s;
  }
  .bookmarkBtn:hover .btn-text { opacity: 0; transform: translateX(40px); }

  /* ── mobile brand in pill ── */
  .mobile-brand { display: none; }

  /* ── hamburger ── */
  .hamburger {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    width: 40px; height: 40px; cursor: pointer;
    background: none; border: none; padding: 4px; margin-left: 8px;
  }
  .hamburger span {
    display: block; width: 22px; height: 2px;
    background: #fff; border-radius: 2px; transition: all .3s ease;
  }

  @media (max-width: 768px) {
    .hamburger { display: flex; }
    .desktop-nav { display: none !important; }
    .desktop-cta { display: none !important; }
    .mobile-brand {
      display: flex; align-items: center; gap: 8px;
      margin-right: auto; padding-left: 4px;
    }
    .mobile-brand .mb-logo {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800; font-size: 1rem; color: #fff; letter-spacing: -.03em;
    }
    .mobile-brand .mb-dot { color: #c6f221; }
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   MOBILE OVERLAY STYLES
───────────────────────────────────────────────────────────────────────── */
const mobileOverlayStyles = `
  .mob-overlay-bg {
    position: fixed; inset: 0;
    background: rgba(3,21,18,0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 9998;
  }

  .mob-sheet {
    position: fixed;
    top: 16px; right: 16px;
    width: calc(100vw - 32px);
    max-width: 340px;
    background: rgba(5,28,24,0.98);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border: 1px solid rgba(198,242,33,0.15);
    border-radius: 28px;
    z-index: 9999;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04),
      0 32px 64px -12px rgba(0,0,0,0.7),
      0 0 40px -10px rgba(198,242,33,0.08);
  }

  .mob-sheet-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 20px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .mob-logo-area {
    display: flex; align-items: center; gap: 10px;
  }
  .mob-logo-area img { height: 32px; width: auto; }
  .mob-logo-area .ml-name {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800; font-size: 1rem; color: #fff; letter-spacing: -.02em;
  }
  .mob-logo-area .ml-sub {
    font-size: 0.55rem; color: #c6f221;
    letter-spacing: .14em; text-transform: uppercase; font-weight: 600;
  }
  .mob-close-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; line-height: 1;
    transition: all .2s ease;
  }
  .mob-close-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }

  .mob-nav-list {
    padding: 8px 12px;
    display: flex; flex-direction: column; gap: 2px;
  }

  .mob-nav-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 12px;
    border-radius: 16px;
    text-decoration: none;
    color: rgba(255,255,255,0.65);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem; font-weight: 600;
    letter-spacing: -.01em;
    transition: all .2s ease;
    position: relative;
    overflow: hidden;
  }
  .mob-nav-item:hover, .mob-nav-item:active {
    background: rgba(198,242,33,0.07);
    color: #fff;
  }
  .mob-nav-item:hover .mob-item-icon { background: rgba(198,242,33,0.2); }
  .mob-nav-item:hover .mob-item-arrow { opacity: 1; transform: translateX(0); color: #c6f221; }

  .mob-item-icon {
    width: 40px; height: 40px; border-radius: 12px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background .2s ease;
  }
  .mob-item-icon svg { width: 18px; height: 18px; color: rgba(255,255,255,0.7); }
  .mob-nav-item:hover .mob-item-icon svg { color: #c6f221; }

  .mob-item-label { flex: 1; }

  .mob-item-arrow {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.2);
    opacity: 0;
    transform: translateX(-6px);
    transition: all .2s ease;
    flex-shrink: 0;
  }

  .mob-divider {
    height: 1px;
    margin: 0 20px;
    background: rgba(255,255,255,0.06);
  }

  .mob-sheet-footer {
    padding: 16px 16px 20px;
  }

  .mob-cta-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; padding: 16px 20px;
    border-radius: 14px;
    background: #c6f221;
    color: #000;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.875rem; font-weight: 800;
    letter-spacing: .07em; text-transform: uppercase;
    text-decoration: none;
    transition: all .25s ease;
    border: none; cursor: pointer;
  }
  .mob-cta-btn:hover, .mob-cta-btn:active {
    transform: translateY(-1px);
    box-shadow: 0 12px 32px rgba(198,242,33,0.3);
  }
  .mob-cta-btn .cta-arrow {
    transition: transform .25s ease;
  }
  .mob-cta-btn:hover .cta-arrow { transform: translateX(4px); }

  .mob-trust {
    margin-top: 10px;
    text-align: center;
    font-size: 0.62rem;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    font-weight: 600;
  }
`;

/* ─────────────────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────
   FLOATING NAV
───────────────────────────────────────────────────────────────────────── */
const FloatingNav = ({ navItems }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visible, setVisible]           = useState(true);
  const [mobileOpen, setMobileOpen]     = useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < window.innerHeight * 0.85);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* lock body scroll when menu open */
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return createPortal(
    <>
      <style>{customStyles}</style>
      <style>{mobileOverlayStyles}</style>

      {/* ── Mobile sheet ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              className="mob-overlay-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
            />

            {/* sheet card */}
            <motion.div
              className="mob-sheet"
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            >
              {/* header */}
              <div className="mob-sheet-head">
                <div className="mob-logo-area">
                  <img src="/assets/vv-logo.png" alt="VV Traffic Data" />
                  <div>
                    <div className="ml-name">VV Traffic Data</div>
                    <div className="ml-sub">Technology</div>
                  </div>
                </div>
                <button className="mob-close-btn" onClick={closeMobile} aria-label="Fechar menu">
                  ✕
                </button>
              </div>

              {/* nav items */}
              <nav className="mob-nav-list" aria-label="Navegação mobile">
                {navItems.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    className="mob-nav-item"
                    onClick={closeMobile}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.25 }}
                  >
                    <span className="mob-item-icon">{item.icon}</span>
                    <span className="mob-item-label">{item.name}</span>
                    <span className="mob-item-arrow">→</span>
                  </motion.a>
                ))}
              </nav>

              <div className="mob-divider" />

              {/* CTA */}
              <div className="mob-sheet-footer">
                <motion.a
                  href="#agendar"
                  className="mob-cta-btn"
                  onClick={closeMobile}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.25 }}
                >
                  Agendar Reunião Diagnóstica
                  <span className="cta-arrow">→</span>
                </motion.a>
                <p className="mob-trust">30 min · sem compromisso · diagnóstico gratuito</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Floating pill ── */}
      <div
        style={{
          position: 'fixed', top: '16px', right: '16px',
          zIndex: 9997, pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ pointerEvents: visible ? 'auto' : 'none' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="glass-container"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '9999px',
              padding: '12px 12px 12px 24px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Mobile: brand label */}
            <span className="mobile-brand">
              <span className="mb-logo">VV Traffic<span className="mb-dot">.</span></span>
            </span>

            {/* Desktop nav items */}
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
                      <motion.span
                        layoutId="navUnderline"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        style={{
                          position: 'absolute', bottom: '-4px', left: 0, right: 0,
                          height: '3px',
                          background: 'linear-gradient(to right, transparent, #c6f221, transparent)',
                          transformOrigin: 'center',
                          boxShadow: '0 0 12px rgba(198,242,33,0.8)',
                        }}
                      />
                    )}
                  </div>
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a href="#agendar" className="desktop-cta" style={{ textDecoration: 'none' }}>
              <button className="bookmarkBtn" aria-label="Agendar reunião">
                <span className="IconContainer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-icon-svg">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </span>
                <p className="btn-text">Agendar</p>
              </button>
            </a>

            {/* Hamburger (mobile only) */}
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
          </motion.div>
        </motion.div>
      </div>
    </>,
    document.body
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   HEADER
───────────────────────────────────────────────────────────────────────── */
export default function Header() {
  const navItems = [
    { name: "Início",      link: "#top",          icon: <IconHome /> },
    { name: "Resultados",  link: "#numeros",       icon: <IconChart /> },
    { name: "Método",      link: "#metodo",        icon: <IconMethod /> },
    { name: "Equipa",      link: "#equipa",        icon: <IconTeam /> },
    { name: "Testemunhos", link: "#testemunhos",   icon: <IconQuote /> },
  ];

  return <FloatingNav navItems={navItems} />;
}
