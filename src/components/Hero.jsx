import React from 'react';
import styled, { keyframes } from 'styled-components';
import ZeroButton from './ZeroButton';
import { useLang } from '../context/LanguageContext';
import { T } from '../i18n/translations';

/* ── keyframes ── */
const pulseDot = keyframes`
  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46,134,193,0.7); }
  70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(46,134,193,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(46,134,193,0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── section — block layout so .container is never stretched by flex ── */
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: var(--nav-height);
  padding-bottom: 80px;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: auto;
    padding-top: calc(var(--nav-height) + 24px);
    padding-bottom: 56px;
    justify-content: flex-start;
  }
`;

/* ── two-column grid ── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 48px;
  align-items: center;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  @media (max-width: 768px) {
    gap: 28px;
  }
`;

/* ── left column ── */
const LeftCol = styled.div`
  min-width: 0;
  width: 100%;
`;

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;

  @media (max-width: 768px) { margin-bottom: 18px; }

  .dot {
    width: 8px; height: 8px;
    flex-shrink: 0;
    background: var(--c-verde);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--c-verde);
    animation: ${pulseDot} 2s infinite;
  }

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--c-text-muted);
  }
`;

const Title = styled.h1`
  font-size: clamp(1.7rem, 2.4vw, 2.6rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  color: #fff;
  max-width: 100%;

  span { color: var(--c-verde); }

  @media (max-width: 768px) {
    font-size: clamp(1.75rem, 7.5vw, 2.6rem);
    margin-bottom: 18px;
    line-height: 1.1;
  }
`;

const Lede = styled.p`
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.85);
  margin-bottom: 10px;
  word-break: break-word;

  @media (max-width: 768px) { font-size: 0.95rem; margin-bottom: 8px; }
`;

const Sub = styled.p`
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--c-text-muted);
  margin-bottom: 36px;
  word-break: break-word;

  @media (max-width: 768px) { font-size: 0.88rem; margin-bottom: 24px; }
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: nowrap;
  margin-bottom: 24px;

  @media (max-width: 992px) { justify-content: flex-start; }
  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: nowrap;
  }
`;

/* ── Secondary Button ── */
const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 64px;
  padding: 10px 24px 10px 28px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.75);
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;

  .arrow {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.5);
    transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;

    svg { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  }

  &:hover {
    border-color: rgba(46, 134, 193, 0.3);
    background: rgba(46, 134, 193, 0.05);
    color: #fff;

    .arrow {
      border-color: rgba(46, 134, 193, 0.4);
      background: rgba(46, 134, 193, 0.1);
      color: var(--c-verde);
      svg { transform: translateX(3px); }
    }
  }

  @media (max-width: 768px) {
    flex: 1;
    height: 56px;
    padding: 8px 16px 8px 20px;
    font-size: 0.68rem;
    justify-content: center;
    .arrow { width: 26px; height: 26px; }
  }
`;

const Guarantee = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--c-text-muted);
  font-size: 0.8rem;
  line-height: 1.4;
  word-break: break-word;
`;

/* ── right panel — desktop only ── */
const VisualPanel = styled.div`
  width: 100%;
  min-width: 0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(46,134,193,0.08);

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) { display: none; }
`;

/* ── mobile-only panel ── */
const MobilePanel = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 32px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(46,134,193,0.08);
    animation: ${fadeUp} 0.6s 0.2s ease both;
    width: 100%;
    box-sizing: border-box;

    img { width: 100%; height: auto; display: block; }
  }
`;

/* ── trust bar ── */
const TrustBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-top: 12px;
    padding: 12px 16px;
    border-radius: 14px;
    background: rgba(46,134,193,0.04);
    border: 1px solid rgba(46,134,193,0.1);
    animation: ${fadeUp} 0.6s 0.35s ease both;
    width: 100%;
    box-sizing: border-box;
  }

  .icon { font-size: 0.9rem; flex-shrink: 0; padding-top: 1px; }

  .text {
    font-size: 0.75rem;
    line-height: 1.55;
    color: rgba(255,255,255,0.45);
    font-weight: 500;
    word-break: break-word;
  }

  strong { color: var(--c-verde); font-weight: 700; }
`;


export default function Hero() {
  const { lang } = useLang();
  const isEn = lang === 'en';
  const isAr = lang === 'ar';
  const t = T[lang].hero;
  const panelWebp = isAr ? "/assets/panel-roas-ar.webp" : isEn ? "/assets/panel-roas-en.webp" : "/assets/panel-roas.webp";
  const panelPng  = isAr ? "/assets/panel-roas-ar.webp" : isEn ? "/assets/panel-roas-en.png"  : "/assets/panel-roas.png";
  return (
    <HeroSection className="section" id="top">
      <div className="container">
        <Grid>
          {/* ── LEFT: text + CTAs ── */}
          <LeftCol className="reveal">
            <Eyebrow>
              <span className="dot" />
              <span className="label">{t.eyebrow}</span>
            </Eyebrow>

            <Title>
              {t.titlePre}<span>{t.titleGreen1}</span>{t.titleMid}<span>{t.titleGreen2}</span>{t.titlePost}
            </Title>

            <Lede>{t.lede}</Lede>
            <Sub>{t.sub}</Sub>

            <CtaRow>
              <ZeroButton href="#agendar" label={t.ctaPrimary} />
              <SecondaryBtn href="#metodo">
                {t.ctaSecondary}
                <span className="arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </span>
              </SecondaryBtn>
            </CtaRow>

            <Guarantee className="t-body-small">
              <span aria-hidden="true">🛡</span>
              {t.guarantee}
            </Guarantee>
          </LeftCol>

          {/* ── RIGHT: full panel — desktop only ── */}
          <VisualPanel className="reveal">
            <picture>
              <source srcSet={panelWebp} type="image/webp" />
              <img src={panelPng} alt="ROAS Panel · VV Group · 7.2x" width="1280" height="720" fetchpriority="high" />
            </picture>
          </VisualPanel>
        </Grid>

        {/* ── MOBILE PANEL ── */}
        <MobilePanel>
          <picture>
            <source srcSet={panelWebp} type="image/webp" />
            <img src={panelPng} alt="ROAS Panel · VV Group · 7.2x" width="1280" height="720" fetchpriority="high" />
          </picture>
        </MobilePanel>

        <TrustBar>
          <span className="icon">🏆</span>
          <span className="text">
            <strong>{t.trustStrong}</strong>{t.trustRest}
          </span>
        </TrustBar>
      </div>
    </HeroSection>
  );
}
