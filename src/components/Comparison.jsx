import React from 'react';
import styled from 'styled-components';
import { X, Check } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { T } from '../i18n/translations';

const CmpWrap = styled.div`
  margin-top: 60px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
`;

const CmpHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(0,0,0,0.3);

  > div {
    padding: 20px 18px;
    font-family: var(--font-display);
    font-size: clamp(0.95rem, 3vw, 1.25rem);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .pill {
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .head-label { }

  @media (max-width: 600px) {
    > div {
      padding: 14px 12px;
      font-size: 0.82rem;
      gap: 8px;
      justify-content: center;
    }
    .pill {
      padding: 5px 12px;
      font-size: 0.7rem;
      letter-spacing: 0.06em;
      white-space: nowrap;
    }
    .head-label { display: none; }
  }
`;

const CmpRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid rgba(255,255,255,0.05);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.02);
  }

  > div {
    padding: 16px 18px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    line-height: 1.5;
    font-size: 0.9rem;
  }

  .neg { color: var(--c-error); flex-shrink: 0; margin-top: 2px; }
  .pos { color: var(--c-verde); flex-shrink: 0; margin-top: 2px; }

  @media (max-width: 600px) {
    > div {
      padding: 12px 10px;
      gap: 8px;
      font-size: 0.78rem;
    }
    .neg, .pos {
      width: 16px !important;
      height: 16px !important;
      flex-shrink: 0;
    }
  }
`;

const Highlight = styled.div`
  margin-top: 40px;
  padding: 32px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 24px;
  background: linear-gradient(90deg, rgba(198,242,33,0.1) 0%, transparent 100%);
  border-left: 4px solid var(--c-verde);

  .icon {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    color: var(--c-verde);
    opacity: 0.5;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    padding: 20px 16px;
    gap: 16px;
    .icon { font-size: 1.4rem; }
  }
`;

const Comparison = () => {
  const { lang } = useLang();
  const t = T[lang].comparison;
  return (
    <section className="section" id="comparativo">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 760 }}>
          <h2 className="t-section-heading">
            VV Traffic Data <span className="muted">{t.headingMuted}</span> <br/>
            <span className="verde">{t.headingGreen}</span>
          </h2>
        </div>

        <CmpWrap className="glass reveal">
          <CmpHead>
            <div>
              <span className="pill" style={{ background: "rgba(255,74,74,0.1)", color: "var(--c-error)" }}>{t.pillLeft}</span>
              <span className="head-label">{t.labelLeft}</span>
            </div>
            <div style={{ background: "rgba(198,242,33,0.05)" }}>
              <span className="pill" style={{ background: "rgba(198,242,33,0.15)", color: "var(--c-verde)" }}>{t.pillRight}</span>
              <span className="head-label">{t.labelRight}</span>
            </div>
          </CmpHead>

          {t.rows.map(([a, b], i) => (
            <CmpRow key={i}>
              <div>
                <X className="neg" size={20} />
                <span className="muted">{a}</span>
              </div>
              <div style={{ background: "rgba(198,242,33,0.02)" }}>
                <Check className="pos" size={20} />
                <span style={{ fontWeight: 500 }}>{b}</span>
              </div>
            </CmpRow>
          ))}
        </CmpWrap>

        <Highlight className="reveal">
          <div className="icon" aria-hidden="true">UE</div>
          <p className="t-subheading" style={{ margin: 0, fontWeight: 600 }}>
            {t.highlightPre}<span className="verde">{t.highlightGreen}</span>{t.highlightPost}
          </p>
        </Highlight>
      </div>
    </section>
  );
};

export default Comparison;
