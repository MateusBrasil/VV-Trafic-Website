import React from 'react';
import styled from 'styled-components';
import { useLang } from '../context/LanguageContext';
import { T } from '../i18n/translations';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin: 60px 0;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.article`
  padding: 40px 32px;
  border-radius: 24px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  
  &:hover {
    background: rgba(198,242,33,0.05);
    border-color: rgba(198,242,33,0.2);
    transform: translateY(-5px);
    
    .letter {
      color: var(--c-verde);
      transform: scale(1.1);
    }
  }

  .index {
    position: absolute;
    top: 32px; right: 32px;
    font-size: 0.875rem;
    color: var(--c-text-muted);
    opacity: 0.5;
  }

  .letter {
    font-family: var(--font-display);
    font-size: clamp(3rem, 5vw, 5rem);
    font-weight: 700;
    line-height: 1;
    color: rgba(255,255,255,0.1);
    margin-bottom: 24px;
    display: block;
    transition: all 0.4s ease;
  }

  .title {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    margin-bottom: 16px;
  }

  .body {
    color: var(--c-text-muted);
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const GuaranteeBox = styled.div`
  padding: clamp(24px, 4vw, 48px);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 40px;
  
  .points {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    width: 100%;
  }

  .point {
    flex: 1;
    min-width: 200px;
    
    b {
      display: block;
      font-size: 1.125rem;
      margin-bottom: 8px;
      color: #fff;
    }
    span {
      color: var(--c-text-muted);
      font-size: 0.875rem;
    }
  }
`;

const EscalaComponent = () => {
  const { lang } = useLang();
  const t = T[lang].escala;
  return (
    <section className="section" id="metodo">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <h2 className="t-section-heading">
            {t.headingPre}<span className="verde">{t.headingGreen}</span>
          </h2>
          <p className="t-body-large muted" style={{ marginTop: 16 }}>
            {t.subtitle}
          </p>
        </div>

        <Grid>
          {t.steps.map(([letter, title, body], i) => (
            <StepCard className="reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="index t-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="letter">{letter}</span>
              <h3 className="title">{title}</h3>
              <p className="body">{body}</p>
            </StepCard>
          ))}
        </Grid>

      </div>
    </section>
  );
};

export default EscalaComponent;
