import { lazy, Suspense, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";

import WhatIDo from "./WhatIDo";
import Work from "./Work";
import ParticlesBackground from "./ParticlesBackground";
import setSplitText from "./utils/splitText";
import Lenis from "lenis";
import { initScrollReveals } from "./utils/GsapScroll";
import gsap from "gsap";
import { useLoading } from "../context/LoadingProvider";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  // ── Lenis smooth scroll ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
    });

    let rAF: number;
    function raf(time: number) {
      lenis.raf(time);
      rAF = requestAnimationFrame(raf);
    }
    rAF = requestAnimationFrame(raf);

    // Initial hash scroll
    const hash = window.location.hash;
    if (hash) {
      // Delay slightly to ensure content is rendered
      setTimeout(() => {
        lenis.scrollTo(hash, { duration: 1.5 });
      }, 500);
    }

    // Listen for hash changes if on the same page
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash) lenis.scrollTo(newHash);
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      cancelAnimationFrame(rAF);
      window.removeEventListener('hashchange', handleHashChange);
      lenis.destroy();
    };
  }, []);

  // ── Loading Progress Simulation ──
  const { setLoading } = useLoading();
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setLoading(Math.floor(progress));
    }, 150);
    return () => clearInterval(interval);
  }, [setLoading]);

  // ── SplitText & Global Reveals ──
  useEffect(() => {
    let lastWidth = window.innerWidth;
    
    const ctx = gsap.context(() => {
      setSplitText();
      initScrollReveals();
    });

    let timeoutId: number;
    const resizeHandler = () => {
      // ONLY re-init if width changed (prevents mobile address bar scroll lag)
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        ctx.add(() => {
          setSplitText();
          initScrollReveals();
        });
      }, 400);
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(timeoutId);
    };
  }, []);


  return (
    <div className="container-main">
      <ParticlesBackground />
      <Cursor />
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="page-content">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Suspense fallback={<div style={{ height: 700 }} />}>
              <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainContainer;
