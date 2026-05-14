import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  z-index: 100;
  transition: all 0.3s ease;
  background: ${(props) => (props.scrolled ? 'rgba(3, 21, 21, 0.8)' : 'transparent')};
  backdrop-filter: ${(props) => (props.scrolled ? 'blur(16px)' : 'none')};
  border-bottom: ${(props) => (props.scrolled ? '1px solid rgba(198, 242, 33, 0.1)' : '1px solid transparent')};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-display);
  text-decoration: none;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 64px;
  width: auto;
`;

const Divider = styled.div`
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.12);
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.15;

  .name {
    font-weight: 800;
    font-size: 1.4rem;
    color: #fff;
    letter-spacing: -0.02em;
  }
  .sub {
    font-weight: 500;
    font-size: 0.7rem;
    color: var(--c-verde);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: 1px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--c-text-muted);
    transition: color 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &:hover {
      color: #fff;
    }
  }

  .btn-sm {
    padding: 10px 24px;
    font-size: 0.875rem;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderWrapper scrolled={scrolled}>
      <Inner>
        <Brand href="#top">
          <LogoWrap>
            <Logo src="/assets/vv-logo.png" alt="VV Traffic Data" />
          </LogoWrap>
          <Divider />
          <BrandText>
            <span className="name">VV Traffic Data</span>
            <span className="sub">Technology</span>
          </BrandText>
        </Brand>
        <Nav>
          <a href="#numeros">Resultados</a>
          <a href="#comparativo">Comparativo</a>
          <a href="#metodo">Método ESCALA</a>
          <a href="#equipa">Equipa</a>
          <a href="#agendar" className="btn btn-primary btn-sm">
            Agendar
          </a>
        </Nav>
      </Inner>
    </HeaderWrapper>
  );
};

export default Header;
