import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'pt-PT', label: 'Português', short: 'PT', flag: '🇵🇹' },
  { code: 'en',    label: 'English',   short: 'EN', flag: '🇬🇧' },
];

const btnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '7px 13px',
  borderRadius: '100px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: 'rgba(255,255,255,0.75)',
  fontSize: '0.8rem',
  fontWeight: 600,
  fontFamily: "'Space Grotesk', sans-serif",
  letterSpacing: '0.04em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  marginLeft: '8px',
};

const dropdownStyle = {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: '148px',
  borderRadius: '16px',
  overflow: 'hidden',
  background: 'rgba(5,28,24,0.97)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(198,242,33,0.15)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
  zIndex: 99999,
  animation: 'langDropIn 0.18s cubic-bezier(0.34,1.56,0.64,1) both',
};

const itemBase = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  padding: '11px 14px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '0.825rem',
  fontWeight: 500,
  textAlign: 'left',
  transition: 'background 0.15s ease',
};

export default function LanguageSelector({ lang, setLang }) {
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
      <style>{`
        @keyframes langDropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px) scale(0.96); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1); }
        }
        .lang-btn:hover {
          background: rgba(198,242,33,0.1) !important;
          border-color: rgba(198,242,33,0.3) !important;
          color: #fff !important;
        }
        .lang-item:hover { background: rgba(198,242,33,0.07) !important; color: #fff !important; }
      `}</style>

      <div ref={ref} style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
        <button
          className="lang-btn"
          style={btnStyle}
          onClick={() => setOpen(o => !o)}
          aria-label={`Idioma: ${current.label}`}
          aria-expanded={open}
        >
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>{current.flag}</span>
          <span>{current.short}</span>
          <ChevronDown
            size={13}
            style={{
              transition: 'transform 0.2s ease',
              transform: open ? 'rotate(180deg)' : 'none',
              opacity: 0.6,
            }}
          />
        </button>

        {open && (
          <div style={dropdownStyle} role="listbox" aria-label="Selecionar idioma">
            {LANGUAGES.map((l) => {
              const isSelected = l.code === lang;
              return (
                <button
                  key={l.code}
                  className="lang-item"
                  style={{
                    ...itemBase,
                    color: isSelected ? '#c6f221' : 'rgba(255,255,255,0.65)',
                    fontWeight: isSelected ? 700 : 500,
                  }}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{l.flag}</span>
                  <span style={{ flex: 1 }}>{l.label}</span>
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
