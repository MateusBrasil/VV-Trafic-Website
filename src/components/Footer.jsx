import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useLang } from '../context/LanguageContext';
import { T } from '../i18n/translations';

/* ── global animations (exact from prompt) ── */
const FooterAnims = createGlobalStyle`
  @keyframes rotate-gradient {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes borderBeamRotation {
    0%   { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes shinery {
    0%,100% { left: -20%; opacity: 0; }
    20%     { opacity: 1; }
    48%     { left: 140%; opacity: 1; }
    51%     { opacity: 0; }
  }
`;

/* ── outer wrapper ── */
const FooterOuter = styled.footer`
  max-width: 1400px;
  margin: 40px auto 48px;
  padding: 0 16px;
  width: 100%;
  font-family: 'Space Grotesk', sans-serif;
`;

/* ── glass card ── */
const Card = styled.div`
  position: relative;
  overflow: hidden;
  background: rgba(3,21,18,0.88);
  border: 1px solid rgba(198,242,33,0.1);
  border-radius: 40px;
  backdrop-filter: blur(24px);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 1px 1px -0.5px rgba(0,0,0,0.3),
    0 12px 40px -12px rgba(0,0,0,0.6),
    0 0 60px -20px rgba(198,242,33,0.06);
`;

const CardInner = styled.div`
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 100%);
`;

const CardContent = styled.div`
  position: relative;
  padding: 40px;

  @media (max-width: 768px) { padding: 28px 20px; }
  @media (max-width: 480px) { padding: 24px 16px; }
`;

/* ── grid ── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; gap: 28px; }
  @media (max-width: 600px)  { grid-template-columns: 1fr; gap: 24px; }
`;

/* ── brand column ── */
const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;

  img { height: 64px; width: auto; border-radius: 10px; }

  .name {
    font-weight: 800;
    font-size: 1.1rem;
    color: #fff;
    letter-spacing: -.02em;
  }
  .sub {
    font-size: 0.65rem;
    color: var(--c-verde, #c6f221);
    letter-spacing: .14em;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const BrandDesc = styled.p`
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.4);
  margin: 0;
`;

const BrandEmail = styled.div`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.35);
`;

/* ── AURA BUTTON (exact from prompt) ── */
const AuraBtn = styled.a`
  --speed: 4s;
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 200px;
  max-width: max-content;
  height: 52px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 100px;
  background: #fff;
  text-decoration: none;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-mask-image: -webkit-radial-gradient(white, black);

  &:hover {
    --speed: 2.2s;
    transform: scale(1.03);
    box-shadow: 0 10px 30px -5px rgba(255,255,255,0.15);
  }

  /* shimmer onda */
  .shimmer-onda {
    content: '';
    background: linear-gradient(10deg, rgba(255,255,255,0.8) 12.81%, rgba(255,255,255,0) 66.66%);
    mix-blend-mode: overlay;
    width: 90px;
    height: 150%;
    position: absolute;
    top: -25%;
    transform: translateX(-50%) skew(-25deg);
    pointer-events: none;
    animation: shinery 6s infinite ease-in-out;
    z-index: 4;
  }

  /* fundo branco hover */
  .fundo-white-hover {
    position: absolute;
    left: 5px;
    width: 0%;
    height: calc(100% - 10px);
    background: #f8f9fa;
    border-radius: 100px;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 6;
    opacity: 0;
  }
  &:hover .fundo-white-hover { width: calc(100% - 10px); opacity: 1; }

  /* ícone móvel */
  .wrapper-icones {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 34px; height: 34px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-radius: 50%;
    z-index: 20;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }
  &:hover .wrapper-icones { left: calc(100% - 44px); }

  .dot { width: 6px; height: 6px; background: #fff; border-radius: 50%; }
  .arrow { display: none; color: #fff; }
  &:hover .dot   { display: none; }
  &:hover .arrow { display: block; }

  /* textos */
  .texto-principal {
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 1;
    transform: translateX(12px);
    z-index: 10;
    color: #0f172a;
    white-space: nowrap;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: -.01em;
  }
  &:hover .texto-principal { opacity: 0; transform: translateX(-40px); }

  .texto-hover {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%) translateX(25px);
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    color: #0f172a;
    font-weight: 600;
    font-size: 0.875rem;
    z-index: 10;
    white-space: nowrap;
  }
  &:hover .texto-hover { opacity: 1; transform: translate(-50%, -50%) translateX(-12px); }

  /* shimmer container */
  .shimmer-container {
    position: absolute; inset: -200%;
    width: 400%; height: 400%;
    animation: rotate-gradient var(--speed) linear infinite;
  }
  .shimmer-gradient {
    position: absolute; inset: 0;
    background: conic-gradient(from 225deg, transparent 0%, rgba(0,0,0,0.05) 10%, transparent 20%);
  }

  /* bottom glow */
  .bottom-glow {
    position: absolute; bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 80%; height: 40%;
    background: radial-gradient(circle at bottom, rgba(255,255,255,0.8) 0%, transparent 70%);
    z-index: 2; pointer-events: none; opacity: 0.5;
  }

  /* inner bg */
  .inner-bg {
    position: absolute;
    inset: 1.5px;
    background: linear-gradient(to bottom, #fff, #fcfcfc, #f0f0f0);
    border-radius: 100px;
    z-index: 1;
  }
`;

/* ── nav columns ── */
const NavCol = styled.div``;

const ColTitle = styled.h3`
  font-size: 0.7rem;
  letter-spacing: .15em;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 0 16px;
`;

const NavList = styled.ul`
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 10px;
`;

const NavLink = styled.a`
  font-size: 0.875rem;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover { color: #fff; }
`;

/* ── bottom bar ── */
const BottomBar = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.07);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 600px) { flex-direction: column; align-items: flex-start; }
`;

const BottomNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
`;

const BottomLink = styled.a`
  font-size: 0.68rem;
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  transition: color .2s ease;
  &:hover { color: rgba(255,255,255,0.7); }
`;

const Separator = styled.span`
  font-size: 0.68rem;
  color: rgba(255,255,255,0.15);
`;

const Copyright = styled.div`
  font-size: 0.68rem;
  color: rgba(255,255,255,0.25);
`;

const AuraBgLayer = styled.div`
  position: absolute; inset: 0; z-index: 0;
  overflow: hidden; pointer-events: none;
  opacity: 0.4;
`;

const AuraBorderLayer = styled.div`
  position: absolute; inset: 0; z-index: 0;
  pointer-events: none; opacity: 0.2;
`;

const AuraBorderBeam = styled.div`
  position: absolute;
  width: 150%; height: 150%;
  background: linear-gradient(90deg,transparent,#000,transparent);
  animation: borderBeamRotation var(--speed) infinite linear;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
`;

const AuraTextWrap = styled.div`
  position: relative;
  z-index: 10;
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  padding: 0 40px;
`;

/* ── component ── */
export default function Footer() {
  const { lang } = useLang();
  const t = T[lang].footer;
  return (
    <>
      <FooterAnims />
      <FooterOuter>
        <Card>
          <CardInner />
          <CardContent>
            <Grid>

              {/* Brand */}
              <BrandCol>
                <LogoWrap as="a" href="#top">
                  <img src="/assets/vv-logo.png" alt="VV Traffic Data" width="64" height="64" />
                  <div>
                    <div className="name">VV Traffic Data</div>
                    <div className="sub">Technology</div>
                  </div>
                </LogoWrap>

                <BrandDesc>{t.brandDesc}</BrandDesc>

                {/* AURA BUTTON */}
                <AuraBtn href="#agendar" aria-label={t.ctaBtn}>
                  <AuraBgLayer>
                    <div className="shimmer-container"><div className="shimmer-gradient" /></div>
                  </AuraBgLayer>
                  <div className="shimmer-onda" />
                  <AuraBorderLayer>
                    <AuraBorderBeam />
                  </AuraBorderLayer>
                  <div className="inner-bg" />
                  <div className="bottom-glow" />
                  <div className="fundo-white-hover" />
                  <div className="wrapper-icones">
                    <div className="dot" />
                    <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <AuraTextWrap>
                    <span className="texto-principal">{t.ctaBtn}</span>
                    <span className="texto-hover" aria-hidden="true">{t.ctaHover}</span>
                  </AuraTextWrap>
                </AuraBtn>

                <BrandEmail>contato@vvtrafficdata.com</BrandEmail>
              </BrandCol>

              {/* Col 1 */}
              <NavCol>
                <ColTitle>{t.col1Title}</ColTitle>
                <NavList>
                  {t.col1Links.map(({ label, href }) => (
                    <li key={label}><NavLink href={href}>{label}</NavLink></li>
                  ))}
                </NavList>
              </NavCol>

              {/* Col 2 */}
              <NavCol>
                <ColTitle>{t.col2Title}</ColTitle>
                <NavList>
                  {t.col2Links.map(({ label, href }) => (
                    <li key={label}><NavLink href={href}>{label}</NavLink></li>
                  ))}
                </NavList>
              </NavCol>

              {/* Col 3 */}
              <NavCol>
                <ColTitle>{t.col3Title}</ColTitle>
                <NavList>
                  {t.col3Links.map(({ label, href }) => (
                    <li key={label}><NavLink href={href}>{label}</NavLink></li>
                  ))}
                </NavList>
              </NavCol>

            </Grid>

            {/* Bottom bar */}
            <BottomBar>
              <BottomNav>
                {t.legalLinks.map((label, i) => (
                  <React.Fragment key={label}>
                    {i > 0 && <Separator>|</Separator>}
                    <BottomLink href="#">{label}</BottomLink>
                  </React.Fragment>
                ))}
              </BottomNav>
              <Copyright>{t.copyright}</Copyright>
            </BottomBar>

          </CardContent>
        </Card>
      </FooterOuter>
    </>
  );
}
