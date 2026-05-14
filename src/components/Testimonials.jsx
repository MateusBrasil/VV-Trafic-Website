import React from 'react';
import styled from 'styled-components';

const TESTI = [
  {
    name: "Cliente · Nome",
    role: "CEO",
    company: "Empresa XPTO",
    initials: "CN",
    quote: "A VV Traffic estruturou o nosso canal e em menos de 1 mês triplicámos os nossos leads qualificados. Resultados absolutamente fora do normal.",
  },
  {
    name: "Cliente · Nome",
    role: "Diretor Comercial",
    company: "Empresa Y",
    initials: "CN",
    quote: "Estávamos céticos com a garantia, mas entregaram tudo e mais alguma coisa. Transparência nos dados e leads todos os dias.",
  },
  {
    name: "Cliente · Nome",
    role: "Fundador",
    company: "Empresa Z",
    initials: "CN",
    quote: "A melhor decisão que tomámos este ano. O Método ESCALA funciona e agora conseguimos prever as nossas vendas com precisão.",
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const TestiCard = styled.article`
  padding: 40px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(198,242,33,0.03);
    border-color: rgba(198,242,33,0.2);
    transform: translateY(-5px);
  }

  .stars {
    color: var(--c-verde);
    letter-spacing: 0.2em;
  }

  .quote {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #fff;
    flex: 1;
    font-style: italic;
  }

  .person {
    display: flex;
    align-items: center;
    gap: 16px;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 24px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--c-verde);
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-weight: 700;
  }

  .info {
    .name { font-weight: 600; color: #fff; }
    .role { font-size: 0.875rem; color: var(--c-text-muted); }
  }
`;

const Testimonials = () => {
  return (
    <section className="section" id="testemunhos">
      <div className="container">
        <div className="reveal" style={{ maxWidth: 720, marginBottom: 60 }}>
          <span className="badge">06 · Testemunhos</span>
          <h2 className="t-section-heading" style={{ marginTop: 16 }}>
            O que os nossos <span className="verde">clientes dizem.</span>
          </h2>
        </div>
        
        <Grid>
          {TESTI.map((t, i) => (
            <TestiCard className="reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="stars">★★★★★</div>
              <p className="quote">"{t.quote}"</p>
              <div className="person">
                <span className="avatar">{t.initials}</span>
                <div className="info">
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role} · {t.company}</div>
                </div>
              </div>
            </TestiCard>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Testimonials;
