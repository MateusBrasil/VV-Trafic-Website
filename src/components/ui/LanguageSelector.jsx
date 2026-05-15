import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { getNonce } from '../../utils/nonce';

/* ── SVG flag icons ── */
const FlagPT = () => (
  <svg width="22" height="15" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg"
    className="flag-icon">
    <rect width="22" height="15" fill="#D80000"/>
    <rect width="9" height="15" fill="#006600"/>
    <circle cx="9" cy="7.5" r="3.6" fill="none" stroke="#FFD700" strokeWidth="1.4"/>
    <ellipse cx="9" cy="7.5" rx="2" ry="2.3" fill="#fff"/>
    <rect x="7.6" y="6.2" width="1.2" height="1.2" rx="0.3" fill="#003087"/>
    <rect x="10.2" y="6.2" width="1.2" height="1.2" rx="0.3" fill="#003087"/>
    <rect x="7.6" y="8.6" width="1.2" height="1.2" rx="0.3" fill="#003087"/>
    <rect x="10.2" y="8.6" width="1.2" height="1.2" rx="0.3" fill="#003087"/>
    <rect x="8.9" y="7.4" width="1.2" height="1.2" rx="0.3" fill="#003087"/>
  </svg>
);

const FlagGB = () => (
  <svg width="22" height="15" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg"
    className="flag-icon">
    <rect width="22" height="15" fill="#012169"/>
    <line x1="0" y1="0" x2="22" y2="15" stroke="white" strokeWidth="3.4"/>
    <line x1="22" y1="0" x2="0" y2="15" stroke="white" strokeWidth="3.4"/>
    <line x1="0" y1="0" x2="22" y2="15" stroke="#C8102E" strokeWidth="1.8"/>
    <line x1="22" y1="0" x2="0" y2="15" stroke="#C8102E" strokeWidth="1.8"/>
    <rect x="9" y="0" width="4" height="15" fill="white"/>
    <rect x="0" y="5.5" width="22" height="4" fill="white"/>
    <rect x="10" y="0" width="2" height="15" fill="#C8102E"/>
    <rect x="0" y="6.5" width="22" height="2" fill="#C8102E"/>
  </svg>
);

const FLAGS = { 'pt-PT': <FlagPT />, 'en': <FlagGB /> };

const LANGUAGES = [
  { code: 'pt-PT', label: 'Português', short: 'PT' },
  { code: 'en',    label: 'English',   short: 'EN' },
];

const langStyles = `
  .flag-icon { border-radius: 3px; flex-shrink: 0; display: block; box-shadow: 0 0 0 1px rgba(255,255,255,0.12); }
  .lang-wrap { position: relative; display: inline-flex; flex-shrink: 0; }
  .lang-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 7px 13px; border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.8);
    font-size: 0.78rem; font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: 0.06em; cursor: pointer;
    transition: all 0.2s ease; white-space: nowrap;
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    margin-left: 8px;
  }
  .lang-btn:hover {
    background: rgba(198,242,33,0.1) !important;
    border-color: rgba(198,242,33,0.3) !important;
    color: #fff !important;
  }
  .lang-chevron { transition: transform 0.2s ease; opacity: 0.55; }
  .lang-btn[data-open="true"] .lang-chevron { transform: rotate(180deg); }
  .lang-dropdown {
    position: absolute; top: calc(100% + 8px); left: 50%;
    transform: translateX(-50%); min-width: 160px;
    border-radius: 16px; overflow: hidden;
    background: rgba(5,28,24,0.97);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(198,242,33,0.15);
    box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
    z-index: 99999;
    animation: langDropIn 0.18s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .lang-item {
    display: flex; align-items: center; gap: 10px; width: 100%;
    padding: 12px 14px; background: none; border: none; cursor: pointer;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.83rem;
    font-weight: 500; text-align: left; transition: background 0.15s ease;
    color: rgba(255,255,255,0.7);
  }
  .lang-item[aria-selected="true"] { color: #c6f221; font-weight: 700; }
  .lang-item:hover { background: rgba(198,242,33,0.07) !important; color: #fff !important; }
  .lang-label { flex: 1; }
  @keyframes langDropIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(0.96); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  }
`;

export default function LanguageSelector({ lang, setLang }) {
  const nonce = getNonce();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];

  return (
    <>
      <style nonce={nonce}>{langStyles}</style>

      <div ref={ref} className="lang-wrap">
        <button
          className="lang-btn"
          data-open={open ? "true" : "false"}
          onClick={() => setOpen(o => !o)}
          aria-label={`${current.short} – ${current.label}`}
          aria-expanded={open}
        >
          {FLAGS[current.code]}
          <span>{current.short}</span>
          <ChevronDown size={12} className="lang-chevron" />
        </button>

        {open && (
          <div className="lang-dropdown" role="listbox" aria-label="Selecionar idioma">
            {LANGUAGES.map((l) => {
              const isSelected = l.code === lang;
              return (
                <button
                  key={l.code}
                  className="lang-item"
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  role="option"
                  aria-selected={isSelected}
                >
                  {FLAGS[l.code]}
                  <span className="lang-label">{l.label}</span>
                  {isSelected && <Check size={14} color="#c6f221" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
