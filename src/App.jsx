import React, { useEffect, useRef, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { LanguageProvider } from './context/LanguageContext';

// Critical path — loaded immediately
import Header from './components/Header';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';

// Below-the-fold — lazy loaded
const Numbers      = lazy(() => import('./components/Numbers'));
const Comparison   = lazy(() => import('./components/Comparison'));
const Escala       = lazy(() => import('./components/Escala'));
const Team         = lazy(() => import('./components/Team'));
// Espaco section temporarily hidden — old VV Traffic studio video; awaiting
// Saudi Arabia building photo replacement for the UAE-targeted build.
// const Espaco       = lazy(() => import('./components/Espaco'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FinalCta     = lazy(() => import('./components/FinalCta'));
const Footer       = lazy(() => import('./components/Footer'));

import './index.css';

const AppWrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    let gsapCtx;

    // Load GSAP after critical render — keeps it off the blocking JS path
    Promise.all([
      import('gsap').then(m => m.default),
      import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]) => {
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx = gsap.context(() => {
        gsap.utils.toArray('.reveal').forEach((elem) => {
          // Only animate elements that are below the fold.
          // Above-fold elements stay visible (no opacity:0) so LCP fires correctly.
          if (elem.getBoundingClientRect().top >= window.innerHeight * 0.95) {
            gsap.set(elem, { y: 30, opacity: 0 });
            gsap.to(elem, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: elem,
                start: 'top 88%',
                once: true,
              },
            });
          }
        });

        ScrollTrigger.refresh();
      }, containerRef);
    });

    return () => gsapCtx?.revert();
  }, []);

  return (
    <LanguageProvider>
      <Header />
      <AppWrap ref={containerRef}>
      <main>
        <Hero />
        <ClientLogos />
        {/* Each section in its own Suspense so they load/render independently
            — no single blanket placeholder that hides everything at once */}
        <Suspense fallback={null}><Numbers /></Suspense>
        <Suspense fallback={null}><Comparison /></Suspense>
        <Suspense fallback={null}><Escala /></Suspense>
        <Suspense fallback={null}><Team /></Suspense>
        {/* <Suspense fallback={null}><Espaco /></Suspense> */}
        <Suspense fallback={null}><Testimonials /></Suspense>
        <Suspense fallback={null}><FinalCta /></Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </AppWrap>
    </LanguageProvider>
  );
}

export default App;
