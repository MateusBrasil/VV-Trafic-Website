import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ZeroButton from './ZeroButton';
import { useLang } from '../context/LanguageContext';
import { T } from '../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

/* ─── keyframes ─── */
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;
const blink = keyframes`
  0%,100% { opacity:1; } 50% { opacity:.25; }
`;
const fadeUp = keyframes`
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0); }
`;
const scanline = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;
const pulseRing = keyframes`
  0%   { transform:scale(1);   opacity:.6; }
  100% { transform:scale(1.9); opacity:0; }
`;
const rotateBorder = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

/* ─── counter hook ─── */
function useCounter(target, duration = 1800) {
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
  overflow: hidden;

  /* subtle noise texture */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }
`;

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) { padding: 0 24px; }
`;

/* ── top row ── */
const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 52px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Label = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--c-verde, #2E86C1);
  display: flex;
  align-items: center;
  gap: 10px;
  &::before { content:''; width:24px; height:1px; background:currentColor; }
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
  span { width:6px; height:6px; border-radius:50%; background:var(--c-verde,#2E86C1); animation:${blink} 2s ease-in-out infinite; }
`;

/* ── heading ── */
const TitleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: end;
  margin-bottom: 52px;
  @media (max-width: 768px) { grid-template-columns:1fr; gap:20px; }
`;

const Heading = styled.h2`
  font-size: clamp(2.8rem, 4.5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -.04em;
  margin: 0;
  em {
    font-style: normal;
    background: linear-gradient(90deg, #2E86C1 0%, #5DADE2 50%, #2E86C1 100%);
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

/* ── main grid ── */
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* ── video card ── */
const VideoCard = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 4 / 5;
  cursor: pointer;

  video, img.bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 1s cubic-bezier(.25,.46,.45,.94);
  }
  &:hover video, &:hover img.bg { transform: scale(1.03); }

  @media (max-width: 900px) { aspect-ratio: 5 / 4; }
`;

/* scanline effect on video */
const Scanline = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
  opacity: 0.04;
  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 200px;
    background: linear-gradient(transparent, rgba(46,134,193,0.4), transparent);
    animation: ${scanline} 6s linear infinite;
  }
`;

/* vignette */
const Vignette = styled.div`
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%),
    linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 40%, transparent 65%);
  pointer-events: none;
  z-index: 3;
`;

/* top-left live badge */
const LiveBadge = styled.div`
  position: absolute;
  top: 18px; left: 18px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 100px;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(46,134,193,0.25);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--c-verde, #2E86C1);

  .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--c-verde, #2E86C1);
    position: relative;
    flex-shrink: 0;
    &::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: rgba(46,134,193,0.4);
      animation: ${pulseRing} 1.8s ease-out infinite;
    }
  }
`;

/* sound toggle button */
const SoundBtn = styled.button`
  position: absolute;
  top: 18px; right: 18px;
  z-index: 5;
  width: 42px; height: 42px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s ease;
  &:hover {
    background: rgba(46,134,193,0.15);
    border-color: rgba(46,134,193,0.4);
    color: var(--c-verde,#2E86C1);
    transform: scale(1.1);
  }
  svg { display:block; flex-shrink:0; }
`;

/* bottom bar inside video */
const VideoFooter = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 5;
  padding: 20px 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
`;

const Tag = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: 100px;
  background: rgba(0,0,0,.5); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.12);
  font-size: .68rem; font-weight: 600;
  color: rgba(255,255,255,.8); letter-spacing:.06em; white-space:nowrap;
`;

/* ── photo card ── */
const PhotoCard = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  flex: 1;
  min-height: 220px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    object-position: center 30%;
    transition: transform 1s cubic-bezier(.25,.46,.45,.94);
  }
  &:hover img { transform: scale(1.06); }
`;

const PhotoOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.6) 0%, rgba(0,0,0,.05) 50%, transparent 75%);
  pointer-events: none;
  z-index: 2;
`;

const PhotoLabel = styled.div`
  position: absolute;
  bottom: 16px; left: 16px; right: 16px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* ── stats card ── */
const StatsCard = styled.div`
  border-radius: 20px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  padding: 28px 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,134,193,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Stat = styled.div`
  .val {
    font-size: 2rem;
    font-weight: 900;
    font-family: var(--font-display);
    color: #fff;
    line-height: 1;
    letter-spacing: -.04em;
    display: flex;
    align-items: baseline;
    gap: 2px;
  }
  .sup { font-size: .9rem; color: var(--c-verde,#2E86C1); font-weight:700; }
  .lbl {
    margin-top: 5px;
    font-size: 0.62rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    font-weight: 600;
  }
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
  background: linear-gradient(135deg, rgba(46,134,193,0.04) 0%, transparent 60%);
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,134,193,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

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
  color: var(--c-verde, #2E86C1);
  line-height: 1;
  letter-spacing: -.05em;
  flex-shrink: 0;

  span {
    font-size: 1.5rem;
    color: var(--c-verde, #2E86C1);
  }
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

/* ─── SVG icons ─── */
const IconVolume = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);

const IconMute = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
);

/* ─── component ─── */
export default function Espaco() {
  const { lang } = useLang();
  const te = T[lang].espaco;
  const sectionRef = useRef(null);

  const [cont, contRef] = useCounter(4);
  const [emp,  empRef]  = useCounter(128);
  const [h,    hRef]    = useCounter(72);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

        <TopRow data-reveal>
          <Label>{te.topLabel}</Label>
          <LocationPill><span />{te.location}</LocationPill>
        </TopRow>

        <TitleRow data-reveal>
          <Heading>{te.headingPre}<em>{te.headingEm}</em><br />{te.headingPost}</Heading>
          <Desc>{te.desc}</Desc>
        </TitleRow>

        <MainGrid data-reveal>

          {/* ── VV GROUP HQ BUILDING — left tall ── */}
          <VideoCard>
            <img
              className="bg"
              src="/assets/predio-vv.webp"
              alt="VV Group HQ"
              loading="lazy"
              decoding="async"
              width="1280"
              height="1023"
            />

            <Vignette />

            {/* live badge */}
            <LiveBadge>
              <div className="dot" />
              {te.liveBadge}
            </LiveBadge>

            {/* bottom info */}
            <VideoFooter>
              <Tag>{te.videoTag1}</Tag>
              <Tag>{te.videoTag2}</Tag>
            </VideoFooter>
          </VideoCard>

          {/* ── RIGHT COLUMN ── */}
          <RightCol>

            {/* photo */}
            <PhotoCard>
              <picture>
                <source srcSet="/espaco/espaco-nova.webp" type="image/webp" />
                <img src="/espaco/espaco-nova.jpg" alt={te.imgAlt} loading="lazy" decoding="async" width="800" height="600" />
              </picture>
              <PhotoOverlay />
              <PhotoLabel>
                <Tag>{te.photoTag1}</Tag>
                <Tag>{te.photoTag2}</Tag>
              </PhotoLabel>
            </PhotoCard>

            {/* stats */}
            <StatsCard>
              <Stat>
                <div className="val" ref={contRef}>{cont}<span className="sup">+</span></div>
                <div className="lbl">{te.stat1Lbl}</div>
              </Stat>
              <Stat>
                <div className="val" ref={empRef}>{emp}<span className="sup">+</span></div>
                <div className="lbl">{te.stat2Lbl}</div>
              </Stat>
              <Stat>
                <div className="val" ref={hRef}>{h}<span className="sup">h</span></div>
                <div className="lbl">{te.stat3Lbl}</div>
              </Stat>
              <Stat>
                <div className="val">7,2<span className="sup">×</span></div>
                <div className="lbl">{te.stat4Lbl}</div>
              </Stat>
            </StatsCard>

          </RightCol>

        </MainGrid>

        {/* bottom strip */}
        <BottomStrip data-reveal>
          <StripLeft>
            <StripNum>128<span>+</span></StripNum>
            <StripDivider />
            <StripText>
              <p className="title">{te.stripTitle}</p>
              <p className="sub">{te.stripSub}</p>
            </StripText>
          </StripLeft>
          <ZeroButton href="#agendar" label={te.cta} />
        </BottomStrip>

      </Wrap>
    </Section>
  );
}
