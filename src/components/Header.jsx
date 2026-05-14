import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const customStyles = `
  .glass-container {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow:
      0 10px 25px -5px rgba(0, 0, 0, 0.3),
      0 8px 10px -6px rgba(0, 0, 0, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
  }

  .optn:hover .elementor-icon-list-text {
    color: white !important;
    transition: 0.5s;
  }

  .optn .elementor-icon-list-items {
    transition: 0.5s;
    padding: 0px !important;
    padding-left: 25px !important;
    padding-right: 25px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .optn:hover .elementor-icon-list-items {
    transition: 0.5s;
    padding: 12px !important;
    padding-left: 25px !important;
    padding-right: 25px !important;
  }

  .optn .elementor-icon-list-icon {
    opacity: 0;
    width: 0px;
    transition: 0.8s;
    transform: scale(0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .optn:hover .elementor-icon-list-icon {
    opacity: 1;
    width: 32px;
    transition: 0.8s;
    transform: scale(1.1);
    margin-right: 12px;
  }

  .bookmarkBtn {
    width: auto;
    min-width: 140px;
    height: 48px;
    border-radius: 50px;
    border: 1px solid rgba(198, 242, 33, 0.5);
    background-color: rgb(15, 15, 15);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    padding: 0;
    position: relative;
    margin-left: 15px;
  }

  .bookmarkBtn::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(198, 242, 33, 0.2) 25%,
      rgba(255, 255, 255, 0.9) 50%,
      rgba(198, 242, 33, 0.2) 75%,
      transparent 100%);
    background-size: 200% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    z-index: 5;
    transition: opacity 0.3s;
  }

  .bookmarkBtn:hover::before {
    opacity: 1;
    animation: shinerySync 2s infinite ease-in-out;
  }

  .IconContainer {
    width: 36px;
    height: 36px;
    background: linear-gradient(to bottom, #d8ff60, #c6f221);
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 2;
    transition-duration: 0.3s;
    flex-shrink: 0;
    margin-left: 6px;
    position: relative;
  }

  .bookmarkBtn:hover .IconContainer {
    width: calc(100% - 12px);
    border-radius: 40px;
  }

  @keyframes shinerySync {
    0% { background-position: 150% 0; }
    100% { background-position: -150% 0; }
  }

  .btn-icon-svg {
    width: 18px;
    height: 18px;
    color: #000;
    transition: 0.3s;
  }

  .bookmarkBtn:hover .btn-icon-svg {
    animation: arrowNudge 1s infinite ease-in-out;
  }

  @keyframes arrowNudge {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
  }

  .btn-text {
    color: white;
    z-index: 1;
    transition-duration: 0.3s;
    font-size: 15px;
    font-weight: 600;
    margin-left: 12px;
    margin-right: 15px;
  }

  .bookmarkBtn:hover .btn-text {
    opacity: 0;
    transform: translateX(40px);
  }
`;

/* ── icons ── */
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'white'}}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'white'}}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);
const IconMethod = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'white'}}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const IconTeam = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'white'}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const IconQuote = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'white'}}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2.5 1 5 2.5 5 1.5 0 2.5 1 2.5 2v1H3z"/><path d="M13 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-2c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2.5 1 5 2.5 5 1.5 0 2.5 1 2.5 2v1h-7z"/></svg>
);

/* ── FloatingNav ── */
const FloatingNav = ({ navItems, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visible, setVisible] = useState(true);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return createPortal(
    <>
      <style>{customStyles}</style>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 9999,
          pointerEvents: 'none',
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
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`glass-container${className ? ' ' + className : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '24px',
              paddingRight: '12px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
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
                  <span className="elementor-icon-list-icon">
                    {navItem.icon}
                  </span>
                  <span
                    className="elementor-icon-list-text"
                    style={{
                      color: 'rgba(163,163,163,1)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      letterSpacing: '0.025em',
                    }}
                  >
                    {navItem.name}
                  </span>

                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="navUnderline"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
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

            <a href="#agendar" style={{ textDecoration: 'none' }}>
              <button className="bookmarkBtn">
                <span className="IconContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="btn-icon-svg"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <p className="btn-text">Agendar</p>
              </button>
            </a>
          </motion.div>
          </motion.div>
      </div>
    </>,
    document.body
  );
};

/* ── Header ── */
export default function Header() {
  const navItems = [
    { name: "Início",     link: "#top",         icon: <IconHome /> },
    { name: "Resultados", link: "#numeros",      icon: <IconChart /> },
    { name: "Método",     link: "#metodo",       icon: <IconMethod /> },
    { name: "Equipa",     link: "#equipa",       icon: <IconTeam /> },
    { name: "Testemunhos",link: "#testemunhos",  icon: <IconQuote /> },
  ];

  return <FloatingNav navItems={navItems} />;
}
