import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.footer`
  padding: 40px 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  background: var(--c-bg-surface);
  
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    
    img {
      width: 24px;
      height: 24px;
      opacity: 0.8;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrap>
      <div className="container row">
        <div className="brand">
          <img src="/assets/vv-logo.png" alt="VV Logo" />
          <span className="t-caption">VV Traffic Data · VV Group © 2026</span>
        </div>
        <div className="t-caption muted">
          Portugal · 4 continentes · estrategistas em simultâneo na tua conta
        </div>
      </div>
    </FooterWrap>
  );
};

export default Footer;
