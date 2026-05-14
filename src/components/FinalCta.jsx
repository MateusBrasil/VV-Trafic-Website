import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradShift = keyframes`
  0%,100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
`;

/* ── section ── */
const Section = styled.section`
  padding: 160px 0 180px;
  position: relative;
  background: #fff;
  @media (max-width: 768px) { padding: 80px 0 100px; }
`;

const Wrap = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
  @media (max-width: 768px) { padding: 0 24px; }
`;

/* ── top rule ── */
const Rule = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, transparent);
  margin-bottom: 80px;
`;

/* ── layout ── */
const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
  @media (max-width: 480px) { gap: 28px; }
`;

/* ── left ── */
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Overline = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--c-verde, #c6f221);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 20px;
    height: 1px;
    background: currentColor;
  }
`;

const Heading = styled.h2`
  font-size: clamp(1.9rem, 6vw, 3.4rem);
  font-weight: 900;
  line-height: 1.07;
  letter-spacing: -.04em;
  margin: 0 0 24px;
  color: #0a1a0a;

  em {
    font-style: normal;
    background: linear-gradient(90deg, #c6f221, #d8ff60, #c6f221);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${gradShift} 5s ease infinite;
  }
`;

const Body = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(0,0,0,0.5);
  margin: 0 0 44px;
  max-width: 440px;
`;

const WaBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 17px 34px;
  border-radius: 100px;
  background: var(--c-verde, #c6f221);
  color: #000;
  font-weight: 800;
  font-size: 0.825rem;
  letter-spacing: .07em;
  text-transform: uppercase;
  text-decoration: none;
  width: fit-content;
  transition: transform .22s ease, box-shadow .22s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(198,242,33,0.25);
  }
`;

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Micro = styled.p`
  margin-top: 14px;
  font-size: 0.65rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
  font-weight: 600;
`;

/* ── right: metrics panel ── */
const Panel = styled.div`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 24px;
  overflow: hidden;
  background: #f7f9f4;
`;

const PanelHeader = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PanelLabel = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
`;

const LiveDot = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);

  &::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--c-verde, #c6f221);
  }
`;

const PanelBody = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const MainStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatNum = styled.div`
  font-size: clamp(2.8rem, 5vw, 4rem);
  font-weight: 900;
  font-family: var(--font-display);
  color: var(--c-verde, #c6f221);
  line-height: 1;
  letter-spacing: -.05em;

  sup {
    font-size: 1.6rem;
    font-weight: 700;
    vertical-align: super;
    opacity: .7;
  }
`;

const StatDesc = styled.div`
  font-size: 0.72rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
  font-weight: 600;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.07);
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Metric = styled.div`
  padding: 0 20px;
  border-right: 1px solid rgba(0,0,0,0.07);

  &:first-child { padding-left: 0; }
  &:last-child  { padding-right: 0; border-right: none; }
`;

const MetricNum = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  font-family: var(--font-display);
  color: #0a1a0a;
  letter-spacing: -.03em;
  line-height: 1;
  margin-bottom: 5px;

  span { font-size: 1rem; color: #5a8a00; font-weight: 700; }
`;

const MetricLbl = styled.div`
  font-size: 0.6rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.35);
  font-weight: 600;
`;

const Quote = styled.div`
  padding: 20px 0 0;
  border-top: 1px solid rgba(0,0,0,0.07);
`;

const QuoteText = styled.p`
  font-size: 0.825rem;
  line-height: 1.65;
  color: rgba(0,0,0,0.5);
  font-style: italic;
  margin: 0 0 8px;
`;

const QuoteAuthor = styled.p`
  font-size: 0.65rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(0,0,0,0.3);
  font-weight: 600;
  margin: 0;
`;

export default function FinalCta() {
  return (
    <Section id="agendar">
      <Wrap>
        <Rule />

        <Layout className="reveal">
          {/* LEFT */}
          <Left>
            <Overline>Diagnóstico Gratuito</Overline>

            <Heading>
              O teu negócio está<br />
              pronto para <em>escalar?</em>
            </Heading>

            <Body>
              Uma conversa de 30 minutos com um estrategista da VV.
              Se houver alinhamento, apresentamos proposta.
              Se não houver — sais com um diagnóstico claro do teu canal de aquisição.
            </Body>

            <WaBtn href="https://wa.link/i13y51" target="_blank" rel="noopener noreferrer">
              <WaIcon />
              Agendar no WhatsApp
            </WaBtn>

            <Micro>30 min · avaliação mútua · sem compromisso</Micro>
          </Left>

          {/* RIGHT */}
          <Panel>
            <img
              src="/assets/panel-roas-2.png"
              alt="Painel de resultados VV Traffic Data"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '24px' }}
            />
          </Panel>
        </Layout>
      </Wrap>
    </Section>
  );
}
