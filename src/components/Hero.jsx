import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { InfiniteSlider } from './ui/InfiniteSlider';
import { ProgressiveBlur } from './ui/ProgressiveBlur';

/* ── keyframes ── */
const pulseDot = keyframes`
  0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(198,242,33,0.7); }
  70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(198,242,33,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(198,242,33,0); }
`;

const rotateGrad = keyframes`
  100% { transform: rotate(360deg); }
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
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  @media (max-width: 768px) {
    gap: 32px;
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
  font-size: clamp(2rem, 4.5vw, 3.8rem);
  font-weight: 900;
  line-height: 1.07;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  color: #fff;
  word-break: break-word;
  overflow-wrap: break-word;
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
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 24px;

  @media (max-width: 992px) { justify-content: flex-start; }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;

    a {
      width: 100%;
      text-align: center;
      justify-content: center;
      padding: 15px 20px;
      font-size: 0.8rem;
    }
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
  box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(198,242,33,0.08);

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) { display: none; }
`;

const Chart = styled.div`
  margin: 24px 0;
  height: 116px;
  width: 100%;
  svg { width: 100%; height: 100%; }
`;

const CompanyBlock = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.07);
`;

const CompanyCounter = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;

  .number {
    font-size: clamp(2.2rem, 5vw, 3rem);
    font-family: var(--font-display);
    font-weight: 800;
    color: var(--c-verde);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  .suffix {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.55);
    font-weight: 500;
    line-height: 1.4;
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
    background: linear-gradient(90deg, var(--c-verde) 0%, rgba(198,242,33,0.35) 100%);
    border-radius: 2px;
    width: 0;
    transition: width 2s cubic-bezier(0.22,1,0.36,1);
  }
`;

/* ── mobile-only panel ── */
const MobilePanel = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 32px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(198,242,33,0.08);
    animation: ${fadeUp} 0.6s 0.2s ease both;
    width: 100%;
    box-sizing: border-box;

    img { width: 100%; height: auto; display: block; }
  }
`;

const MobilePanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);

  .tag {
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    font-weight: 700;
  }

  .live {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);

    &::before {
      content: '';
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--c-verde);
      flex-shrink: 0;
    }
  }
`;

const MobileRoas = styled.div`
  padding: 20px 20px 0;

  .label {
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    font-weight: 600;
    margin-bottom: 6px;
  }

  .value {
    font-size: 2.4rem;
    font-weight: 900;
    font-family: var(--font-display);
    color: #fff;
    line-height: 1;
    letter-spacing: -0.04em;
  }
`;

const MobileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 16px 12px 20px;
  margin-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.06);

  > div {
    padding: 0 8px;
    text-align: center;
    border-right: 1px solid rgba(255,255,255,0.06);

    &:last-child { border-right: none; }
  }

  .ms-val {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: var(--font-display);
    color: var(--c-verde);
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 6px;
  }

  .ms-lbl {
    font-size: 0.58rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    font-weight: 600;
    line-height: 1.4;
  }
`;

const MobileCompany = styled.div`
  padding: 16px 20px 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  gap: 14px;

  .num {
    font-size: 1.8rem;
    font-weight: 900;
    font-family: var(--font-display);
    color: var(--c-verde);
    line-height: 1;
    flex-shrink: 0;
  }

  .desc {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.4);
    line-height: 1.5;
    font-weight: 500;
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
    background: rgba(198,242,33,0.04);
    border: 1px solid rgba(198,242,33,0.1);
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

/* ── client logos ── */
const ClientsStrip = styled.div`
  margin-top: 56px;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 32px;
  overflow: hidden;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 32px;
    padding-top: 24px;
  }

  .strip-label {
    text-align: center;
    color: var(--c-text-muted);
    margin-bottom: 24px;
    font-size: 0.7rem;
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
  padding: 0 28px;

  @media (max-width: 768px) { padding: 0 20px; }

  img {
    height: 54px;
    width: auto;
    max-width: 150px;
    object-fit: contain;
    display: block;
    opacity: 0.82;
    transition: opacity 0.3s ease;
    user-select: none;
    pointer-events: none;
  }
  img:hover { opacity: 1; }
`;

const CLIENTS = [
  { src: "/clientes/oficina-sabores.png",      alt: "Oficina dos Sabores" },
  { src: "/clientes/ravox.png",                alt: "RAVOX" },
  { src: "/clientes/pt-moveis.png",            alt: "PT Móveis" },
  { src: "/clientes/amorikids-new.png",        alt: "Amorikids" },
  { src: "/clientes/vulcanici.png",            alt: "Vulcanici" },
  { src: "/clientes/barao-select.png",         alt: "Barão Select" },
  { src: "/clientes/amazon-sem-segredos.png",  alt: "Amazon Sem Segredos" },
  { src: "/clientes/marianna-new.png",         alt: "Marianna Guimarães" },
  { src: "/clientes/velara-home.png",          alt: "Velara Home" },
  { src: "/clientes/vv-studios.png",           alt: "VV Studios" },
  { src: "/clientes/retiro.png",               alt: "Retiro" },
  { src: "/clientes/sempre-consigo.png",       alt: "Sempre Consigo" },
  { src: "/clientes/velara-moda.png",          alt: "Velara Moda",         dark: true },
  { src: "/clientes/rpm-brand.png",            alt: "RPM Brand" },
  { src: "/clientes/caroline-rodrigues.png",   alt: "Caroline Rodrigues",  dark: true },
  { src: "/clientes/vv-coffee.png",            alt: "VV Coffee Lounge" },
];

/* ── candlestick chart data (deterministic seeded) ── */
function sRand(i, s) {
  const x = Math.sin(i * 17.3 + s * 31.7) * 10000;
  return x - Math.floor(x);
}

const CANDLES = (() => {
  const N = 44;
  const out = [];
  let prev = 84;
  for (let i = 0; i < N; i++) {
    const base = 6 + 78 * Math.exp(-2.7 * i / (N - 1));
    const vol  = 1.2 + (84 - base) * 0.055;
    const close = Math.max(3, Math.min(88, base + (sRand(i, 1) - 0.45) * vol * 2.2));
    const open  = prev;
    const up    = close <= open;
    const high  = Math.max(2, Math.min(open, close) - sRand(i, 2) * vol * 0.9);
    const low   = Math.min(92, Math.max(open, close) + sRand(i, 3) * vol * 0.9);
    out.push({ open, close, high, low, up });
    prev = close;
  }
  return out;
})();

function CandleChart() {
  const W = 300, H = 95;
  const N = CANDLES.length;
  const slot = W / N;
  const bodyW = Math.max(2.8, slot - 2.2);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <filter id="glow-up">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* grid */}
      {[20, 42, 64].map(y => (
        <line key={y} x1="0" y1={y} x2={W} y2={y}
          stroke="rgba(198,242,33,0.07)" strokeWidth="0.5" />
      ))}

      {/* candles */}
      {CANDLES.map(({ open, close, high, low, up }, i) => {
        const xMid  = i * slot + slot / 2;
        const xBody = i * slot + (slot - bodyW) / 2;
        const bodyY = Math.min(open, close);
        const bodyH = Math.max(0.7, Math.abs(open - close));
        const verde = '#c6f221';
        const muted = 'rgba(198,242,33,0.28)';
        return (
          <g key={i} filter={up ? 'url(#glow-up)' : undefined}>
            <line x1={xMid} y1={high} x2={xMid} y2={low}
              stroke={up ? verde : muted} strokeWidth="0.9" />
            <rect x={xBody} y={bodyY} width={bodyW} height={bodyH}
              fill={up ? verde : muted} rx="0.6" />
          </g>
        );
      })}
    </svg>
  );
}

const TARGET = 128;

export default function Hero() {
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
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime - 800;
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
          {/* ── LEFT: text + CTAs ── */}
          <LeftCol className="reveal">
            <Eyebrow>
              <span className="dot" />
              <span className="label">Portugal · €20.000+/mês</span>
            </Eyebrow>

            <Title>
              Descobre como abrir <span>múltiplos canais</span> de
              aquisição e trazer <span>novos clientes</span> diariamente
              para o teu negócio.
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

            <Guarantee className="t-body-small">
              <span aria-hidden="true">🛡</span>
              Garantia em contrato · 30 dias adicionais se não entregarmos o acordado
            </Guarantee>
          </LeftCol>

          {/* ── RIGHT: full panel — desktop only ── */}
          <VisualPanel className="reveal">
            <img src="/assets/panel-roas.png" alt="Painel ROAS · VV Traffic Data · 7,2x" />
          </VisualPanel>
        </Grid>

        {/* ── MOBILE PANEL ── */}
        <MobilePanel>
          <img src="/assets/panel-roas.png" alt="Painel ROAS · VV Traffic Data · 7,2x" />
        </MobilePanel>

        <TrustBar>
          <span className="icon">🏆</span>
          <span className="text">
            <strong>1.ª empresa na União Europeia</strong> com garantia de entrega em contrato — 30 dias adicionais se não cumprirmos.
          </span>
        </TrustBar>

        {/* ── CLIENT LOGOS ── */}
        <ClientsStrip className="reveal">
          <p className="strip-label">Já estruturámos canais de aquisição para</p>
          <SliderWrap>
            <InfiniteSlider gap={20} speed={38} speedOnHover={85} reverse={false}>
              {CLIENTS.map((c) => (
                <ClientItem key={c.src}>
                  <img
                    src={c.src} alt={c.alt}
                    draggable={false} loading="lazy"
                    style={c.dark ? { filter: 'invert(1) brightness(0.88)' } : undefined}
                  />
                </ClientItem>
              ))}
            </InfiniteSlider>
            <ProgressiveBlur
              direction="left"
              blurIntensity={0.9}
              style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 80, pointerEvents: 'none' }}
            />
            <ProgressiveBlur
              direction="right"
              blurIntensity={0.9}
              style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 80, pointerEvents: 'none' }}
            />
          </SliderWrap>
        </ClientsStrip>
      </div>
    </HeroSection>
  );
}
