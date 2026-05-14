import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { InfiniteSlider } from './ui/InfiniteSlider';
import { ProgressiveBlur } from './ui/ProgressiveBlur';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: var(--nav-height);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  
  .dot {
    width: 8px;
    height: 8px;
    background: var(--c-verde);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--c-verde);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(198, 242, 33, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(198, 242, 33, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(198, 242, 33, 0); }
  }
`;

const Title = styled.h1`
  margin-bottom: 24px;
  background: linear-gradient(to right, #fff, #a0a0a0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  span {
    -webkit-text-fill-color: var(--c-verde);
    text-shadow: 0 0 20px rgba(198, 242, 33, 0.3);
  }
`;

const Lede = styled.p`
  margin-bottom: 12px;
  color: #fff;
`;

const Sub = styled.p`
  margin-bottom: 40px;
  color: var(--c-text-muted);
`;

const CtaRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const Guarantee = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--c-text-muted);
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const VisualPanel = styled.div`
  padding: 32px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(198, 242, 33, 0.1) 50%, transparent 100%);
    animation: rotate 10s linear infinite;
    z-index: -1;
  }
  
  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }
`;

const Chart = styled.div`
  margin: 24px 0;
  height: 120px;
  width: 100%;
  
  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  
  path.line {
    fill: none;
    stroke: var(--c-verde);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 4px 8px rgba(198, 242, 33, 0.4));
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

  .number {
    font-size: 3rem;
    font-family: var(--font-display);
    font-weight: 800;
    color: var(--c-verde);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .suffix {
    font-size: 0.95rem;
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
    transition: width 2s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

const ClientsStrip = styled.div`
  margin-top: 80px;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 40px;

  .label {
    text-align: center;
    color: var(--c-text-muted);
    margin-bottom: 28px;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
`;

const SliderWrap = styled.div`
  position: relative;
  width: 100%;
`;

const ClientItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 28px;

  img {
    height: 48px;
    width: auto;
    max-width: 160px;
    object-fit: contain;
    display: block;
    filter: grayscale(1) brightness(1.4);
    opacity: 0.65;
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
  const lineRef   = useRef(null);
  const barFillRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Chart line animation
    gsap.fromTo(lineRef.current,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.out", delay: 0.5 }
    );

    // Counter: 0 → 128 over ~2s
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start - 800; // start after 0.8s delay
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * TARGET));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Bar fill
    setTimeout(() => {
      if (barFillRef.current) barFillRef.current.style.width = '100%';
    }, 900);
  }, []);

  return (
    <HeroSection className="section" id="top">
      <div className="container">
        <Grid>
          <div className="reveal">
            <Eyebrow>
              <span className="dot"></span>
              <span className="t-label muted t-caption">Portugal · €20.000+/mês</span>
            </Eyebrow>

            <Title className="t-display-large">
              Descobre como abrir <span>múltiplos canais</span> de aquisição
              e trazer <span>novos clientes</span> diariamente para o teu negócio.
            </Title>

            <Lede className="t-body-large">
              Para empresários e decisores em Portugal que faturam €20.000+/mês.
            </Lede>
            <Sub className="t-body">
              Com o Método ESCALA. Com garantia em contrato. Primeiros resultados em 72 horas.
            </Sub>

            <CtaRow>
              <a className="btn btn-primary" href="#agendar">
                AGENDAR REUNIÃO DIAGNÓSTICA <span>→</span>
              </a>
              <a className="btn btn-secondary" href="#metodo">Ver o Método</a>
            </CtaRow>

            <Guarantee className="t-body-small">
              <span aria-hidden="true">🛡</span>
              Garantia em contrato · 30 dias adicionais se não entregarmos o acordado
            </Guarantee>
          </div>

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
                    <stop offset="0%" stopColor="rgba(198,242,33,0.4)"/>
                    <stop offset="100%" stopColor="rgba(198,242,33,0)"/>
                  </linearGradient>
                </defs>
                <path d="M0,62 L30,58 L60,50 L90,52 L120,40 L150,42 L180,28 L210,30 L240,18 L270,14 L300,8 L320,4 L320,80 L0,80 Z" fill="url(#chart-grad)"/>
                <path ref={lineRef} className="line" d="M0,62 L30,58 L60,50 L90,52 L120,40 L150,42 L180,28 L210,30 L240,18 L270,14 L300,8 L320,4"/>
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

        <ClientsStrip className="reveal">
          <p className="label">Já estruturámos canais de aquisição para</p>
          <SliderWrap>
            <InfiniteSlider gap={24} speed={40} speedOnHover={90} reverse={false}>
              {CLIENTS.map((c) => (
                <ClientItem key={c.src}>
                  <img src={c.src} alt={c.alt} draggable={false} />
                </ClientItem>
              ))}
            </InfiniteSlider>
            <ProgressiveBlur
              direction="left"
              blurIntensity={0.9}
              style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 140, pointerEvents: 'none' }}
            />
            <ProgressiveBlur
              direction="right"
              blurIntensity={0.9}
              style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 140, pointerEvents: 'none' }}
            />
          </SliderWrap>
        </ClientsStrip>
      </div>
    </HeroSection>
  );
};

export default Hero;
