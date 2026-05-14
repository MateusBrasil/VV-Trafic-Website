import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── keyframes ─── */
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;
const blink = keyframes`
  0%,100% { opacity:1; } 50% { opacity:.35; }
`;
const floatY = keyframes`
  0%,100% { transform: translateY(0px) rotate(-2deg); }
  50%      { transform: translateY(-10px) rotate(-2deg); }
`;

/* ─── section ─── */
const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 0 0;
`;

/* ────────────────────────────────────────
   BAND 1 — full-bleed interior
──────────────────────────────────────── */
const CinemaBand = styled.div`
  position: relative;
  width: 100%;
  height: 88vh;
  min-height: 560px;
  max-height: 860px;
  overflow: hidden;
`;

const CinemaImg = styled.img`
  width: 100%;
  height: 110%;          /* extra height for parallax travel */
  object-fit: cover;
  object-position: center 30%;
  display: block;
  will-change: transform;
`;

const CinemaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top,  rgba(3,21,18,1)   0%,  rgba(3,21,18,0.15) 50%, transparent 80%),
    linear-gradient(to right, rgba(3,21,18,0.6) 0%, transparent 60%);
`;

const CinemaContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 64px 72px;
  max-width: 1400px;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;

  @media (max-width: 768px) { padding: 0 28px 48px; }
`;

const Kicker = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  width: fit-content;
`;
const KDot = styled.span`
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--c-verde, #c6f221);
  animation: ${blink} 2.2s ease-in-out infinite;
`;
const KText = styled.span`
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: .16em; text-transform: uppercase;
  color: var(--c-verde, #c6f221);
`;

const CinemaHeading = styled.h2`
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -.04em;
  margin: 0 0 40px;
  max-width: 720px;

  em {
    font-style: normal;
    background: linear-gradient(90deg, #c6f221 0%, #e8ff80 50%, #c6f221 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

/* stats strip at bottom of image */
const StatsStrip = styled.div`
  display: flex;
  gap: 0;
  flex-wrap: wrap;
`;

const StatPill = styled.div`
  padding: 18px 36px 18px 0;
  margin-right: 36px;
  border-right: 1px solid rgba(255,255,255,0.1);

  &:last-child { border-right: none; margin-right: 0; }

  .val {
    font-size: 2.6rem;
    font-weight: 900;
    font-family: var(--font-display);
    color: #fff;
    line-height: 1;
    letter-spacing: -.04em;
    display: flex; align-items: baseline; gap: 3px;
  }
  .sup {
    font-size: 1.4rem;
    color: var(--c-verde, #c6f221);
    font-weight: 700;
  }
  .lbl {
    margin-top: 5px;
    font-size: 0.72rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    font-weight: 600;
  }

  @media (max-width: 600px) {
    padding: 12px 20px 12px 0; margin-right: 20px;
    .val { font-size: 1.8rem; }
  }
`;

/* live badge top-right */
const LiveBadge = styled.div`
  position: absolute;
  top: 32px; right: 40px;
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(198,242,33,0.3);
  font-size: 0.75rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--c-verde, #c6f221);

  span {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--c-verde, #c6f221);
    animation: ${blink} 1.5s ease-in-out infinite;
  }
`;

/* ────────────────────────────────────────
   BAND 2 — facade + copy
──────────────────────────────────────── */
const BottomBand = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

/* Left: facade image with floating card treatment */
const FacadeWrap = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 480px;
  background: #020f0d;
`;

const FacadeImg = styled.img`
  width: 100%;
  height: 110%;
  object-fit: cover;
  object-position: center;
  display: block;
  will-change: transform;
`;

const FacadeOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(3,21,18,0.55) 0%,
    rgba(3,21,18,0.1)  50%,
    rgba(3,21,18,0.45) 100%
  );
`;

/* floating card over facade */
const FloatCard = styled.div`
  position: absolute;
  bottom: 36px; right: -20px;
  width: 220px;
  border-radius: 18px;
  background: rgba(3,21,18,0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(198,242,33,0.18);
  padding: 20px 22px;
  animation: ${floatY} 5s ease-in-out infinite;
  box-shadow: 0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(198,242,33,0.06);

  @media (max-width: 900px) { display: none; }
`;

const FloatCardTop = styled.div`
  display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
  span { width:6px;height:6px;border-radius:50%;background:var(--c-verde,#c6f221);animation:${blink} 2s ease-in-out infinite; }
  p { margin:0; font-size:.65rem; color:rgba(255,255,255,.5); text-transform:uppercase; letter-spacing:.1em; font-weight:600; }
`;

const FloatMetric = styled.div`
  .n { font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -.04em; }
  .u { font-size: .95rem; color: var(--c-verde,#c6f221); font-weight:700; }
  .l { font-size: .68rem; color: rgba(255,255,255,.4); text-transform:uppercase; letter-spacing:.08em; margin-top:4px; }
`;

const FloatBar = styled.div`
  margin-top: 16px; height: 3px;
  background: rgba(255,255,255,.08); border-radius:2px; overflow:hidden;
  div { height:100%; width: ${p=>p.$pct}%; background: var(--c-verde,#c6f221); border-radius:2px; }
`;

/* Right: copy panel */
const CopyPanel = styled.div`
  background: linear-gradient(135deg, rgba(198,242,33,0.04) 0%, rgba(3,21,18,0) 60%);
  border-left: 1px solid rgba(255,255,255,0.05);
  padding: 72px 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;

  @media (max-width: 768px) { padding: 52px 28px; border-left: none; border-top: 1px solid rgba(255,255,255,0.05); }
`;

const CopyLabel = styled.p`
  margin: 0;
  font-size: .72rem; font-weight: 700;
  letter-spacing: .16em; text-transform: uppercase;
  color: var(--c-verde, #c6f221);
`;

const CopyHeading = styled.h3`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -.03em;
  margin: 0;
`;

const CopyBody = styled.p`
  margin: 0;
  color: rgba(255,255,255,.6);
  font-size: 1rem;
  line-height: 1.8;
`;

const FeatureList = styled.ul`
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 14px;
`;

const FeatureItem = styled.li`
  display: flex; align-items: flex-start; gap: 14px;
  font-size: .92rem; color: rgba(255,255,255,.75); line-height: 1.5;

  .icon {
    flex-shrink: 0; width: 32px; height: 32px;
    border-radius: 8px;
    background: rgba(198,242,33,0.1);
    border: 1px solid rgba(198,242,33,0.2);
    display: flex; align-items: center; justify-content: center;
    color: var(--c-verde, #c6f221); margin-top: 1px;
  }
  strong { color: #fff; display: block; font-weight: 700; font-size: .95rem; margin-bottom: 2px; }
`;

const CtaRow = styled.div`
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
`;

const BtnPrimary = styled.a`
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 32px; border-radius: 100px;
  background: var(--c-verde, #c6f221); color: #000;
  font-weight: 800; font-size: .875rem;
  letter-spacing: .04em; text-transform: uppercase;
  text-decoration: none;
  transition: transform .2s ease, box-shadow .2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(198,242,33,.35); }
`;

const BtnSecondary = styled.a`
  display: inline-flex; align-items: center; gap: 8px;
  font-size: .875rem; font-weight: 600; color: rgba(255,255,255,.6);
  text-decoration: none; letter-spacing: .02em;
  transition: color .2s ease;
  &:hover { color: #fff; }
`;

/* ─── counter hook ─── */
function useCounter(target, duration = 1800, delay = 0) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      setTimeout(() => {
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
    }, { threshold: .4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, delay]);
  return [val, ref];
}

/* ─── component ─── */
export default function Espaco() {
  const imgRef     = useRef(null);
  const facadeRef  = useRef(null);
  const headRef    = useRef(null);
  const statsRef   = useRef(null);
  const copyRef    = useRef(null);

  const [roas]   = useCounter(72,  1600, 300);
  const [emp]    = useCounter(128, 2000, 500);
  const [cont]   = useCounter(4,   1200, 200);
  const [h]      = useCounter(72,  1400, 400);

  // stat refs for IntersectionObserver
  const statEl   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // parallax — interior image
      gsap.to(imgRef.current, {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: imgRef.current.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
      // parallax — facade image
      gsap.to(facadeRef.current, {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: facadeRef.current.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
      // heading reveal
      gsap.from(headRef.current.children, {
        y: 50, opacity: 0, duration: 1, stagger: .15, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
      });
      // stats reveal
      gsap.from(statsRef.current.children, {
        y: 30, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 88%', once: true },
      });
      // copy panel
      gsap.from(copyRef.current.children, {
        x: 40, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out',
        scrollTrigger: { trigger: copyRef.current, start: 'top 80%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Section id="espaco">

      {/* ══ BAND 1 — CINEMA ══ */}
      <CinemaBand>
        <CinemaImg ref={imgRef} src="/espaco/espaco-02.png" alt="Interior VV Traffic Data" />
        <CinemaOverlay />

        <LiveBadge><span />Lisboa · Operacional 24/7</LiveBadge>

        <CinemaContent>
          <div ref={headRef}>
            <Kicker>
              <KDot /><KText>06 · O Nosso Espaço</KText>
            </Kicker>
            <CinemaHeading>
              Onde a <em>estratégia</em><br />ganha forma.
            </CinemaHeading>
          </div>

          <StatsStrip ref={statsRef}>
            <StatPill>
              <div className="val"><span ref={statEl}>{cont}</span><span className="sup">+</span></div>
              <div className="lbl">Continentes</div>
            </StatPill>
            <StatPill>
              <div className="val">{emp}<span className="sup">+</span></div>
              <div className="lbl">Empresas aceleradas</div>
            </StatPill>
            <StatPill>
              <div className="val">{h}<span className="sup">h</span></div>
              <div className="lbl">Primeiros resultados</div>
            </StatPill>
            <StatPill>
              <div className="val">7,2<span className="sup">x</span></div>
              <div className="lbl">ROAS médio</div>
            </StatPill>
          </StatsStrip>
        </CinemaContent>
      </CinemaBand>

      {/* ══ BAND 2 — FACADE + COPY ══ */}
      <BottomBand>

        {/* Facade image */}
        <FacadeWrap>
          <FacadeImg ref={facadeRef} src="/espaco/espaco-01.png" alt="Fachada VV Traffic Data" />
          <FacadeOverlay />

          {/* floating metric card */}
          <FloatCard>
            <FloatCardTop>
              <span /><p>Performance · Hoje</p>
            </FloatCardTop>
            <FloatMetric>
              <div className="n">7,2<span className="u">x</span></div>
              <div className="l">ROAS médio · 30 dias</div>
            </FloatMetric>
            <FloatBar $pct={82}><div /></FloatBar>
          </FloatCard>
        </FacadeWrap>

        {/* Copy panel */}
        <CopyPanel ref={copyRef}>
          <CopyLabel>VV Group HQ · Lisboa, Portugal</CopyLabel>

          <CopyHeading>
            Um espaço construído<br />para resultados reais.
          </CopyHeading>

          <CopyBody>
            Fundada em 2024, a VV Traffic Data opera a partir de Lisboa
            com uma equipa multidisciplinar que gere tráfego pago, conteúdo
            e estratégia de aquisição para empresas em 4 continentes.
          </CopyBody>

          <FeatureList>
            {[
              { icon: '📍', title: 'Presença Global', desc: 'Escritório em Lisboa, clientes em 4 continentes.' },
              { icon: '⚡', title: '72h para os primeiros resultados', desc: 'Onboarding rápido, impacto imediato.' },
              { icon: '🛡', title: 'Garantia em contrato', desc: '30 dias adicionais se não entregarmos o acordado.' },
            ].map(f => (
              <FeatureItem key={f.title}>
                <div className="icon">{f.icon}</div>
                <div><strong>{f.title}</strong>{f.desc}</div>
              </FeatureItem>
            ))}
          </FeatureList>

          <CtaRow>
            <BtnPrimary href="#agendar">
              Agendar reunião
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </BtnPrimary>
            <BtnSecondary href="#equipa">
              Conhecer a equipa →
            </BtnSecondary>
          </CtaRow>
        </CopyPanel>

      </BottomBand>

    </Section>
  );
}
