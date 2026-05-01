import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { LuLightbulb } from "react-icons/lu";
import { siteConfig } from "../siteConfig";
import "./styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // ── Entrance animation ──
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".landing-intro__label", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });
      gsap.fromTo(".landing-intro h1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 });
      gsap.fromTo(".landing-divider", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 0.8, ease: "power2.out", delay: 0.7 });
      gsap.fromTo(
        [".landing-info__role", ".landing-info-h2", ".landing-info__sub"],
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.9 }
      );
      gsap.fromTo(".landing-scroll-hint", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.6 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // ── Mouse parallax + glow follower ──
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const glow = glowRef.current;
    const intro = introRef.current;
    const info = infoRef.current;

    // Smooth setters via GSAP for 60fps performance
    const setGlowX = gsap.quickSetter(glow, "x", "px");
    const setGlowY = gsap.quickSetter(glow, "y", "px");
    const setIntroX = gsap.quickSetter(intro, "x", "px");
    const setIntroY = gsap.quickSetter(intro, "y", "px");
    const setInfoX = gsap.quickSetter(info, "x", "px");
    const setInfoY = gsap.quickSetter(info, "y", "px");

    let raf: number;
    let mx = 0, my = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Normalized -0.5 to 0.5
      const nx = (mx / w) - 0.5;
      const ny = (my / h) - 0.5;

      // Glow follows mouse at moderate speed
      setGlowX(mx - w / 2);
      setGlowY(my - h / 2);

      // Text moves in opposite direction (parallax) — name text moves more
      setIntroX(nx * -18);
      setIntroY(ny * -12);
      setInfoX(nx * -10);
      setInfoY(ny * -8);

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      // Reset positions
      [glow, intro, info].forEach(el => el && gsap.set(el, { x: 0, y: 0 }));
    };
  }, []);

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container" ref={heroRef}>

        {/* Glow that follows mouse */}
        <div className="landing-glow" ref={glowRef} aria-hidden="true" />
        <div className="landing-glow landing-glow--secondary" aria-hidden="true" />

        {/* Hero grid */}
        <div className="landing-hero-grid">
          <div className="landing-intro" ref={introRef}>
            <p className="landing-intro__label reveal">Hello! I&apos;m</p>
            <h1 className="text-gradient reveal">
              TANAY
              <br />
              BOKARIA
            </h1>
          </div>

          <div className="landing-divider" aria-hidden="true" />

          <div className="landing-info" ref={infoRef}>
            <p className="landing-info__role reveal">
              DEVELOPER&nbsp;·&nbsp;PROBLEM SOLVER&nbsp;·&nbsp;BUILDER
            </p>
            <h2 className="landing-info-h2 reveal">
              Cybersecurity
              <br />
              Student &amp;
              <br />
              Builder
            </h2>
            <p className="landing-info__sub reveal">
              B.Tech Cybersecurity&nbsp;@&nbsp;SAKEC
            </p>
            <div className="landing-socials reveal">
              {siteConfig.social.map((link) => {
                const Icon = 
                  link.name === "GitHub" ? FaGithub : 
                  link.name === "LinkedIn" ? FaLinkedinIn : 
                  LuLightbulb;
                
                if (link.type === "external") {
                  return (
                    <a 
                      key={link.name}
                      href={link.href} 
                      target="_blank" 
                      rel="noreferrer"
                      className="landing-social-link"
                      aria-label={`Visit my ${link.name}`}
                    >
                      <Icon size={16} /> {link.name}
                    </a>
                  );
                }
                
                return (
                  <button
                    key={link.name}
                    className="landing-social-link"
                    onClick={() => navigate(link.href)}
                    aria-label={`Navigate to ${link.name}`}
                  >
                    <Icon size={16} /> {link.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>


        {/* Scroll indicator */}
        <div className="landing-scroll-hint">
          <span>Scroll</span>
          <div className="landing-scroll-line" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
