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
  0%,100% { opacity:1; } 50% { opacity:.3; }
`;

/* ─── counter hook (fixed) ─── */
function useCounter(target, duration = 1600) {
  const [val, setVal]   = useState(0);
  const elRef           = useRef(null);
  const triggered       = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || triggered.current) return;
      triggered.current = true;
      obs.disconnect();
      const start = performance.now();
      const tick  = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
        else setVal(target);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return [val, elRef];
}

/* ─── styled ─── */
const Section = styled.section`
  padding: 120px 0 140px;
  position: relative;
`;

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) { padding: 0 24px; }
`;

/* ── top label row ── */
const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 56px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Label = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--c-verde, #c6f221);
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 24px; height: 1px;
    background: var(--c-verde, #c6f221);
  }
`;

const LocationPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  letter-spacing: .04em;

  span {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--c-verde, #c6f221);
    animation: ${blink} 2s ease-in-out infinite;
  }
`;

/* ── main title ── */
const TitleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: end;
  margin-bottom: 52px;

  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 20px; }
`;

const Heading = styled.h2`
  font-size: clamp(2.8rem, 4.5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -.04em;
  margin: 0;

  em {
    font-style: normal;
    background: linear-gradient(90deg, #c6f221 0%, #d8ff60 50%, #c6f221 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 5s linear infinite;
  }
`;

const Desc = styled.p`
  margin: 0;
  color: rgba(255,255,255,0.5);
  font-size: 1rem;
  line-height: 1.8;
  align-self: end;
`;

/* ── photo grid ── */
const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  grid-template-rows: 1fr auto;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* shared card */
const ImgCard = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255,255,255,0.03);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .9s cubic-bezier(.25,.46,.45,.94);
  }
  &:hover img { transform: scale(1.05); }
`;

/* interior — tall, spans both rows */
const InteriorCard = styled(ImgCard)`
  grid-column: 1;
  grid-row: 1 / 3;
  aspect-ratio: 4 / 5;

  @media (max-width: 900px) {
    grid-column: 1; grid-row: auto;
    aspect-ratio: 16 / 10;
  }
`;

/* facade — top right */
const FacadeCard = styled(ImgCard)`
  grid-column: 2;
  grid-row: 1;
  aspect-ratio: 4 / 3;

  @media (max-width: 900px) { grid-column: 1; grid-row: auto; }
`;

/* stats card — bottom right */
const StatsCard = styled.div`
  grid-column: 2;
  grid-row: 2;
  border-radius: 20px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 20px;

  @media (max-width: 900px) { grid-column: 1; grid-row: auto; }
`;

const Stat = styled.div`
  .val {
    font-size: 2.2rem;
    font-weight: 900;
    font-family: var(--font-display);
    color: #fff;
    line-height: 1;
    letter-spacing: -.04em;
    display: flex;
    align-items: baseline;
    gap: 2px;
  }
  .sup {
    font-size: 1rem;
    color: var(--c-verde, #c6f221);
    font-weight: 700;
  }
  .lbl {
    margin-top: 6px;
    font-size: 0.68rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    font-weight: 600;
  }
`;

/* image overlays */
const Overlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.55) 0%, rgba(0,0,0,.05) 40%, transparent 65%);
  pointer-events: none;
`;

const ImgLabel = styled.div`
  position: absolute;
  bottom: 18px; left: 18px; right: 18px;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
`;

const Tag = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: 100px;
  background: rgba(0,0,0,.45); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.1);
  font-size: .68rem; font-weight: 600;
  color: rgba(255,255,255,.8); letter-spacing:.06em; white-space:nowrap;
`;

const TagGreen = styled(Tag)`
  border-color: rgba(198,242,33,.3);
  color: var(--c-verde, #c6f221);
  span { width:5px;height:5px;border-radius:50%;background:currentColor;animation:${blink} 1.8s ease-in-out infinite; }
`;

/* ── bottom strip ── */
const BottomStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 36px 40px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(135deg, rgba(198,242,33,0.03) 0%, transparent 70%);
  flex-wrap: wrap;

  @media (max-width: 768px) { padding: 28px 24px; }
`;

const StripLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const StripNum = styled.div`
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 900;
  font-family: var(--font-display);
  color: var(--c-verde, #c6f221);
  line-height: 1;
  letter-spacing: -.05em;
  flex-shrink: 0;
`;

const StripDivider = styled.div`
  width: 1px; height: 56px;
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
`;

const StripText = styled.div`
  p { margin: 0; }
  .title { font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .sub   { font-size: .875rem; color: rgba(255,255,255,.45); line-height:1.5; max-width:340px; }
`;

const Btn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 32px;
  border-radius: 100px;
  background: var(--c-verde, #c6f221);
  color: #000;
  font-weight: 800;
  font-size: .82rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: transform .2s ease, box-shadow .2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(198,242,33,.3);
  }
`;

/* ─── component ─── */
export default function Espaco() {
  const sectionRef = useRef(null);

  const [cont, contRef] = useCounter(4);
  const [emp,  empRef]  = useCounter(128);
  const [h,    hRef]    = useCounter(72);
  const [roas, roasRef] = useCounter(72); // display as 7,2x separately

  useEffect(() => {
    const ctx = gsap.context(() => {
      // stagger children of section
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="espaco">
      <Wrap>

        {/* label + pill */}
        <TopRow data-reveal>
          <Label>06 · O Nosso Espaço</Label>
          <LocationPill><span />Guimarães, Portugal · VV Group HQ</LocationPill>
        </TopRow>

        {/* heading + desc */}
        <TitleRow data-reveal>
          <Heading>
            Onde a <em>estratégia</em><br />ganha forma.
          </Heading>
          <Desc>
            A VV Traffic Data opera a partir de Guimarães com uma equipa
            multidisciplinar dedicada a escalar empresas em 4 continentes.
            Um espaço criado para pensar, criar e entregar resultados reais.
          </Desc>
        </TitleRow>

        {/* photos + stats */}
        <PhotoGrid data-reveal>

          {/* interior — left tall card */}
          <InteriorCard>
            <img src="/espaco/espaco-02.png" alt="Interior VV Traffic Data" loading="lazy" />
            <Overlay />
            <ImgLabel>
              <TagGreen><span />Operacional 24/7</TagGreen>
              <Tag>Interior · Guimarães</Tag>
            </ImgLabel>
          </InteriorCard>

          {/* facade — top right */}
          <FacadeCard>
            <img src="/espaco/espaco-01.png" alt="Fachada VV Traffic Data" loading="lazy" />
            <Overlay />
            <ImgLabel>
              <Tag>VV Studio · VV Traffic Data</Tag>
            </ImgLabel>
          </FacadeCard>

          {/* stats — bottom right */}
          <StatsCard>
            <Stat>
              <div className="val" ref={contRef}>{cont}<span className="sup">+</span></div>
              <div className="lbl">Continentes</div>
            </Stat>
            <Stat>
              <div className="val" ref={empRef}>{emp}<span className="sup">+</span></div>
              <div className="lbl">Empresas aceleradas</div>
            </Stat>
            <Stat>
              <div className="val" ref={hRef}>{h}<span className="sup">h</span></div>
              <div className="lbl">Primeiros resultados</div>
            </Stat>
            <Stat>
              <div className="val" ref={roasRef}>7,2<span className="sup">x</span></div>
              <div className="lbl">ROAS médio</div>
            </Stat>
          </StatsCard>

        </PhotoGrid>

        {/* bottom strip */}
        <BottomStrip data-reveal>
          <StripLeft>
            <StripNum>128<span style={{fontSize:'1.5rem',color:'var(--c-verde,#c6f221)'}}>+</span></StripNum>
            <StripDivider />
            <StripText>
              <p className="title">Empresas aceleradas com o Método ESCALA</p>
              <p className="sub">
                Garantia em contrato · Primeiros resultados em 72 horas ·
                Presente em 4 continentes.
              </p>
            </StripText>
          </StripLeft>
          <Btn href="#agendar">
            Agendar reunião
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Btn>
        </BottomStrip>

      </Wrap>
    </Section>
  );
}
