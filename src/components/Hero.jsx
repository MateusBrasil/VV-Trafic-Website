import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { InfiniteSlider } from './ui/InfiniteSlider';
import { ProgressiveBlur } from './ui/ProgressiveBlur';

/* ── animations ── */
const pulse = keyframes`
  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(198,242,33,0.7); }
  70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(198,242,33,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(198,242,33,0); }
`;

const rotateGrad = keyframes`
  100% { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── section ── */
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--nav-height);
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: auto;
    padding-top: calc(var(--nav-height) + 32px);
    padding-bottom: 64px;
    align-items: flex-start;
  }
`;

/* ── two-column grid ── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  > * { min-width: 0; }

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  @media (max-width: 768px) {
    text-align: left;
    gap: 0;
  }
`;

/* ── left column pieces ── */
const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;

  .dot {
    width: 8px; height: 8px;
    background: var(--c-verde);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--c-verde);
    animation: ${pulse} 2s infinite;
    flex-shrink: 0;
  }
`;

const Title = styled.h1`
  margin-bottom: 24px;
  background: linear-gradient(to right, #fff 40%, rgba(255,255,255,0.65) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  word-break: break-word;
  overflow-wrap: break-word;

  span {
    -webkit-text-fill-color: var(--c-verde);
    background: none;
    text-shadow: 0 0 28px rgba(198,242,33,0.25);
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 9vw, 3rem);
    margin-bottom: 20px;
    line-height: 1.08;
  }
`;

const Lede = styled.p`
  margin-bottom: 10px;
  color: rgba(255,255,255,0.9);
  font-size: 1.05rem;
  line-height: 1.65;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Sub = styled.p`
  margin-bottom: 36px;
  color: var(--c-text-muted);
  line-height: 1.65;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 28px;
  }
`;

const CtaRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;

  @media (max-width: 992px) {
    justify-content: center;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    justify-content: flex-start;

    a {
      text-align: center;
      justify-content: center;
      width: 100%;
      padding: 15px 24px;
    }
  }
`;

const Guarantee = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--c-text-muted);
  font-size: 0.82rem;

  @media (max-width: 992px) {
    justify-content: center;
  }
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

/* ── desktop right panel ── */
const VisualPanel = styled.div`
  padding: 32px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  width: 100%;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(198,242,33,0.08) 50%, transparent 100%);
    animation: ${rotateGrad} 10s linear infinite;
    z-index: -1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Chart = styled.div`
  margin: 24px 0;
  height: 120px;
  width: 100%;

  svg { width: 100%; height: 100%; overflow: visible; }

  path.line {
    fill: none;
    stroke: var(--c-verde);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 4px 8px rgba(198,242,33,0.4));
  }
`;

const CompanyBlock = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.07);
`;

const CompanyLabel = styled.div`
  font-size: 0.8rem;
  color: var(--c-text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const CompanyCounter = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;

  .number {
    font-size: clamp(2rem, 5vw, 3rem);
    font-family: var(--font-display);
    font-weight: 800;
    color: var(--c-verde);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  .suffix {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
    line-height: 1.3;
    max-width: 160px;
  }
`;

const CompanyBar = styled.div`
  margin-top: 14px;
  height: 4px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  overflow: hidden;

  .fill {
    height: 100%;
    background: linear-gradient(90deg, var(--c-verde) 0%, rgba(198,242,33,0.4) 100%);
    border-radius: 2px;
    width: 0;
    transition: width 2s cubic-bezier(0.22,1,0.36,1);
  }
`;

/* ── mobile-only stats strip ── */
const MobileStats = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 40px;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(5,38,38,0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    animation: ${fadeInUp} 0.7s 0.3s ease both;
  }
`;

const MobileStat = styled.div`
  padding: 22px 8px;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.07);
  position: relative;

  &:last-child { border-right: none; }

  .ms-val {
    font-size: 1.75rem;
    font-weight: 800;
    font-family: var(--font-display);
    color: var(--c-verde);
    line-height: 1;
    margin-bottom: 7px;
    letter-spacing: -0.03em;
  }

  .ms-lbl {
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    font-weight: 600;
    line-height: 1.4;
  }
`;

/* ── trust row below stats (mobile) ── */
const MobileTrust = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding: 14px 18px;
    border-radius: 14px;
    background: rgba(198,242,33,0.05);
    border: 1px solid rgba(198,242,33,0.12);
    animation: ${fadeInUp} 0.7s 0.5s ease both;
  }

  .icon { font-size: 1rem; flex-shrink: 0; }

  .text {
    font-size: 0.75rem;
    line-height: 1.5;
    color: rgba(255,255,255,0.5);
    font-weight: 500;
  }

  .highlight {
    color: var(--c-verde);
    font-weight: 700;
  }
`;

/* ── client logos strip ── */
const ClientsStrip = styled.div`
  margin-top: 56px;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 32px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-top: 36px;
    padding-top: 24px;
  }

  .label {
    text-align: center;
    color: var(--c-text-muted);
    margin-bottom: 28px;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
`;

const SliderWrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ClientItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 24px;

  img {
    height: 40px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    display: block;
    filter: grayscale(1) brightness(1.3);
    opacity: 0.55;
    transition: opacity 0.3s ease, filter 0.3s ease;
    user-select: none;
    pointer-events: none;
  }

  &:hover img {
    filter: grayscale(0) brightness(1);
    opacity: 1;
  }
`;

const CLIENTS = [
  { src: "/clientes/amorikids.png",      alt: "Amorikids" },
  { src: "/clientes/amzss.png",          alt: "AMZSS" },
  { src: "/clientes/dra-mariana.png",    alt: "Dra. Mariana" },
  { src: "/clientes/siamma.png",         alt: "Siamma" },
  { src: "/clientes/velara.png",         alt: "Velara" },
  { src: "/clientes/logo-principal.png", alt: "Cliente" },
  { src: "/clientes/logo-perfil.png",    alt: "Cliente" },
  { src: "/clientes/client-01.png",      alt: "Cliente" },
  { src: "/clientes/client-03.png",      alt: "Cliente" },
  { src: "/clientes/client-04.png",      alt: "Cliente" },
  { src: "/clientes/client-05.png",      alt: "Cliente" },
  { src: "/clientes/client-06.png",      alt: "Cliente" },
  { src: "/clientes/client-wa1.png",     alt: "Cliente" },
  { src: "/clientes/client-wa2.png",     alt: "Cliente" },
  { src: "/clientes/client-wa3.png",     alt: "Cliente" },
];

const TARGET = 128;

const Hero = () => {
  const lineRef    = useRef(null);
  const barFillRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, ease: 'power2.out', delay: 0.5 }
      );
    }

    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start - 800;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * TARGET));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    setTimeout(() => {
      if (barFillRef.current) barFillRef.current.style.width = '100%';
    }, 900);
  }, []);

  return (
    <HeroSection className="section" id="top">
      <div className="container">
        <Grid>
          {/* ── LEFT COLUMN ── */}
          <div className="reveal">
            <Eyebrow>
              <span className="dot" />
              <span className="t-caption muted">Portugal · €20.000+/mês</span>
            </Eyebrow>

            <Title className="t-display-large">
              Descobre como abrir <span>múltiplos canais</span> de aquisição
              e trazer <span>novos clientes</span> diariamente para o teu negócio.
            </Title>

            <Lede>
              Para empresários e decisores em Portugal que faturam €20.000+/mês.
            </Lede>
            <Sub>
              Com o Método ESCALA. Com garantia em contrato. Primeiros resultados em 72 horas.
            </Sub>

            <CtaRow>
              <a className="btn btn-primary" href="#agendar">
                AGENDAR DIAGNÓSTICO <span>→</span>
              </a>
              <a className="btn btn-secondary" href="#metodo">Ver o Método</a>
            </CtaRow>

            <Guarantee>
              <span aria-hidden="true">🛡</span>
              Garantia em contrato · 30 dias adicionais se não entregarmos o acordado
            </Guarantee>
          </div>

          {/* ── RIGHT PANEL (desktop only) ── */}
          <VisualPanel className="glass reveal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="t-caption muted">PAINEL · TEMPO REAL</span>
              <span className="badge" style={{ marginBottom: 0 }}>● AO VIVO</span>
            </div>

            <div style={{ marginTop: 24 }}>
              <div className="t-caption muted">ROAS médio · últimos 30 dias</div>
              <div className="t-display-large" style={{ fontSize: '3rem', color: '#fff' }}>7,2x</div>
            </div>

            <Chart>
              <svg viewBox="0 0 320 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(198,242,33,0.4)" />
                    <stop offset="100%" stopColor="rgba(198,242,33,0)" />
                  </linearGradient>
                </defs>
                <path d="M0,62 L30,58 L60,50 L90,52 L120,40 L150,42 L180,28 L210,30 L240,18 L270,14 L300,8 L320,4 L320,80 L0,80 Z" fill="url(#chart-grad)" />
                <path ref={lineRef} className="line" d="M0,62 L30,58 L60,50 L90,52 L120,40 L150,42 L180,28 L210,30 L240,18 L270,14 L300,8 L320,4" />
              </svg>
            </Chart>

            <CompanyBlock>
              <CompanyLabel>Empresas aceleradas com o nosso método</CompanyLabel>
              <CompanyCounter>
                <span className="number">{count}</span>
                <span className="suffix">empresas a&nbsp;crescer com o Método ESCALA</span>
              </CompanyCounter>
              <CompanyBar>
                <div ref={barFillRef} className="fill" />
              </CompanyBar>
            </CompanyBlock>
          </VisualPanel>
        </Grid>

        {/* ── MOBILE STATS (replaces VisualPanel on phone) ── */}
        <MobileStats>
          <MobileStat>
            <div className="ms-val">7,2×</div>
            <div className="ms-lbl">ROAS<br />médio</div>
          </MobileStat>
          <MobileStat>
            <div className="ms-val">128+</div>
            <div className="ms-lbl">Empresas<br />aceleradas</div>
          </MobileStat>
          <MobileStat>
            <div className="ms-val">72h</div>
            <div className="ms-lbl">1.º<br />resultado</div>
          </MobileStat>
        </MobileStats>

        <MobileTrust>
          <span className="icon">🏆</span>
          <span className="text">
            <span className="highlight">1.ª empresa na UE</span> com garantia de entrega em contrato
          </span>
        </MobileTrust>

        {/* ── CLIENT LOGO STRIP ── */}
        <ClientsStrip className="reveal">
          <p className="label">Já estruturámos canais de aquisição para</p>
          <SliderWrap>
            <InfiniteSlider gap={20} speed={38} speedOnHover={85} reverse={false}>
              {CLIENTS.map((c) => (
                <ClientItem key={c.src}>
                  <img src={c.src} alt={c.alt} draggable={false} loading="lazy" />
                </ClientItem>
              ))}
            </InfiniteSlider>
            <ProgressiveBlur
              direction="left"
              blurIntensity={0.9}
              style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 100, pointerEvents: 'none' }}
            />
            <ProgressiveBlur
              direction="right"
              blurIntensity={0.9}
              style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 100, pointerEvents: 'none' }}
            />
          </SliderWrap>
        </ClientsStrip>
      </div>
    </HeroSection>
  );
};

export default Hero;
