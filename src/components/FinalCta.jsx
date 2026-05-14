import React from 'react';
import styled from 'styled-components';
import { Smartphone } from 'lucide-react';

const CtaSection = styled.section`
  padding: 160px 0;
  position: relative;
  text-align: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(198,242,33,0.15) 0%, transparent 70%);
    z-index: -1;
  }
`;

const Card = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 64px 40px;
  border-radius: 32px;
  background: rgba(4, 34, 34, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(198, 242, 33, 0.2);
  box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 0 40px rgba(198,242,33,0.05);
`;

const Urgency = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(255,255,255,0.05);
  font-size: 0.875rem;
  margin-bottom: 32px;
  
  .dot {
    width: 8px; height: 8px;
    background: var(--c-error);
    border-radius: 50%;
    animation: pulseRed 2s infinite;
  }

  @keyframes pulseRed {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 74, 74, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(255, 74, 74, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 74, 74, 0); }
  }
`;

const FinalCta = () => {
  return (
    <CtaSection className="section" id="agendar">
      <div className="container">
        <Card className="reveal">
          <Urgency>
            <span className="dot"></span>
            3 vagas disponíveis · Portugal · maio 2026
          </Urgency>
          
          <h2 className="t-display-large" style={{ marginBottom: 24 }}>
            O teu negócio está pronto para <span className="verde">escalar?</span>
          </h2>
          
          <p className="t-body-large muted" style={{ marginBottom: 16 }}>
            Antes de avançar, precisamos perceber se a tua empresa tem a estrutura necessária
            para aplicar o Método ESCALA com eficácia.
          </p>
          <p className="t-body muted" style={{ marginBottom: 48 }}>
            A reunião diagnóstica é uma avaliação mútua de 30 minutos com um estrategista
            da VV. Se houver alinhamento — apresentamos proposta. Se não houver — vais embora
            com um diagnóstico claro do teu canal de aquisição.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <a className="btn btn-primary" href="#" style={{ padding: "24px 48px", fontSize: "1.125rem" }}>
              <Smartphone size={24} />
              AGENDAR NO WHATSAPP
              <span>→</span>
            </a>
            <span className="t-caption muted">
              30 minutos com estrategista · avaliação mútua · sem compromisso
            </span>
          </div>
        </Card>
      </div>
    </CtaSection>
  );
};

export default FinalCta;
