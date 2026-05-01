import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuExternalLink, LuGithub, LuZap, LuShield, LuCode, LuChevronRight } from "react-icons/lu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import ParticlesBackground from "../components/ParticlesBackground";
import { projects, getProject, statusConfig } from "../data/projects";
import "./ProjectDetailPage.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const project = getProject(Number(id));

  useEffect(() => {
    if (project?.isConfidential) {
      navigate("/#work");
    }
    window.scrollTo(0, 0);
  }, [id, project, navigate]);

  // GSAP entrance animations
  useEffect(() => {
    if (!project || !pageRef.current) return;
    const ctx = gsap.context(() => {
      const ease = "power3.out";

      // Timeline for left column — staggered entrance
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(".pdp-back",      { opacity: 0, x: -12 }, { opacity: 0.5, x: 0, duration: 0.5, ease })
        .fromTo(".pdp-meta-row",  { opacity: 0, y: 16  }, { opacity: 1,   y: 0, duration: 0.5, ease }, "-=0.2")
        .fromTo(".pdp-title",     { opacity: 0, y: 28  }, { opacity: 1,   y: 0, duration: 0.7, ease: "back.out(1.2)" }, "-=0.25")
        .fromTo(".pdp-tags",      { opacity: 0, y: 14  }, { opacity: 1,   y: 0, duration: 0.5, ease }, "-=0.3")
        // Right sidebar slides in from right
        .fromTo(".pdp-sidebar",   { opacity: 0, x: 24  }, { opacity: 1,   x: 0, duration: 0.7, ease }, "-=0.45");

      // ScrollTrigger reveals for lower sections
      gsap.utils.toArray<HTMLElement>(".pdp-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            duration: 0.65,
            ease,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Stagger reveal of feature cards
      ScrollTrigger.create({
        trigger: ".pdp-features-grid",
        start: "top 88%",
        onEnter: () => {
          gsap.fromTo(
            ".pdp-feature-card",
            { opacity: 0, y: 20, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease, stagger: 0.07 }
          );
        },
      });

      // Tag pills pop in with stagger
      ScrollTrigger.create({
        trigger: ".pdp-tags",
        start: "top 95%",
        onEnter: () => {
          gsap.fromTo(
            ".pdp-tag",
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)", stagger: 0.04 }
          );
        },
      });
    }, pageRef);
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="pdp-not-found">
        <p>Project not found.</p>
        <button onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    );
  }

  const statusCfg = statusConfig[project.status];
  
  // adjacent public projects for "next" teaser
  const publicProjects = projects.filter(p => !p.isConfidential);
  const currentIdx = publicProjects.findIndex((p) => p.id === project.id);
  const nextProject = publicProjects[(currentIdx + 1) % publicProjects.length];

  return (
    <div className="pdp-root" ref={pageRef}>
      <ParticlesBackground />
      <Navbar />

      {/* Accent top line */}
      <div className="pdp-accent-line" style={{ background: project.accent }} />

      <main className="pdp-main">
        {/* ── Back ── */}
        <button className="pdp-back" onClick={() => navigate("/#work")} style={{ color: project.accent }}>
          <div className="pdp-back-icon">
            <LuArrowLeft size={16} />
          </div>
          <span>Back to Work</span>
        </button>

        {/* ── Two-column grid ── */}
        <div className="pdp-grid">
          {/* ───────── LEFT: Content ───────── */}
          <div className="pdp-hero-left">
            {/* Category + Status */}
            <div className="pdp-meta-row">
              <span className="pdp-category" style={{ color: project.accent }}>
                {project.category}
              </span>
              <span className="pdp-status-pill" style={{ background: `${statusCfg.color}18`, color: statusCfg.color, border: `1px solid ${statusCfg.color}40` }}>
                <span className="pdp-status-dot" style={{ background: statusCfg.color }} />
                {statusCfg.label}
              </span>
            </div>

            {/* Title */}
            <div className="pdp-title-wrapper">
              {project.logo && (
                <div className="pdp-project-logo-circle" style={{ borderColor: `${project.accent}30` }}>
                  <img src={project.logo} alt="Project Logo" />
                </div>
              )}
              <h1 className="pdp-title">{project.title}</h1>
            </div>

            {/* Tech pills */}
            <div className="pdp-tags">
              {project.tagList.map((tag) => (
                <span key={tag} className="pdp-tag">{tag}</span>
              ))}
            </div>

            {/* Overview */}
            <section className="pdp-section pdp-reveal">
              <div className="pdp-section-label">
                <LuCode size={14} />
                <span>Project Overview</span>
              </div>
              <p className="pdp-overview-text">{project.fullDesc}</p>
            </section>

            {/* Impact callout */}
            <div className="pdp-impact-box pdp-reveal" style={{ borderColor: `${project.accent}30`, background: `${project.accent}08` }}>
              <LuZap size={18} style={{ color: project.accent, flexShrink: 0 }} />
              <p>{project.impact}</p>
            </div>

            {/* Key Features */}
            <section className="pdp-section pdp-reveal">
              <div className="pdp-section-label">
                <LuShield size={14} />
                <span>Key Features</span>
              </div>
              <div className="pdp-features-grid">
                {project.features.map((f, i) => (
                  <div key={i} className="pdp-feature-card" style={{ borderColor: `${project.accent}18` }}>
                    <span className="pdp-feature-dot" style={{ background: project.accent }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges */}
            <section className="pdp-section pdp-reveal">
              <div className="pdp-section-label">
                <LuZap size={14} />
                <span>Challenges &amp; Learnings</span>
              </div>
              <ul className="pdp-challenges">
                {project.challenges.map((c, i) => (
                  <li key={i}>
                    <span style={{ color: project.accent }}>→</span> {c}
                  </li>
                ))}
              </ul>
            </section>

            {/* Brand Identity / Screenshots Gallery */}
            {(project.logo || (project.screenshots && project.screenshots.length > 0)) && (
              <section className="pdp-section pdp-reveal">
                <div className="pdp-section-label">
                  <LuCode size={14} />
                  <span>Visual Identity</span>
                </div>
                <div className="pdp-brand-gallery">
                  {project.screenshots?.map((img, i) => (
                    <div key={i} className="pdp-brand-item" style={{ borderColor: `${project.accent}15` }}>
                      <img src={img} alt={`Brand variant ${i}`} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Resume line */}
            <div className="pdp-resume-box pdp-reveal">
              <span className="pdp-resume-label">Resume-ready line</span>
              <p className="pdp-resume-text">{project.resumeLine}</p>
            </div>
          </div>

          {/* ───────── RIGHT: Sidebar ───────── */}
          <div className="pdp-sidebar">
            {/* Project image card */}
            <div
              className="pdp-image-card"
              style={{ borderColor: `${project.accent}20`, boxShadow: `0 40px 80px -20px ${project.accent}18` }}
            >
              <div className="pdp-image-card__inner">
                <img src={project.image} alt={project.title} className="pdp-project-img" />
                <div className="pdp-image-overlay" style={{ background: `linear-gradient(to top, ${project.accent}30 0%, transparent 60%)` }} />
              </div>
            </div>

            {/* CTAs */}
            <div className="pdp-cta-group">
              {project.liveUrl && project.liveUrl !== "#" ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pdp-cta-primary" style={{ background: project.accent }}>
                  <LuExternalLink size={18} />
                  <span>LIVE DEMO</span>
                </a>
              ) : (
                <button className="pdp-cta-primary pdp-cta-disabled" style={{ background: `${project.accent}60`, cursor: "not-allowed" }}>
                  <LuExternalLink size={18} />
                  <span>IN PROGRESS</span>
                </button>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="pdp-cta-secondary">
                  <LuGithub size={18} />
                  <span>VIEW SOURCE</span>
                </a>
              )}
            </div>

            {/* Quick stats */}
            <div className="pdp-quick-stats">
              <div className="pdp-stat">
                <span className="pdp-stat-label">Category</span>
                <span className="pdp-stat-value">{project.category}</span>
              </div>
              <div className="pdp-stat">
                <span className="pdp-stat-label">Stack</span>
                <span className="pdp-stat-value">{project.tools}</span>
              </div>
              <div className="pdp-stat">
                <span className="pdp-stat-label">Status</span>
                <span className="pdp-stat-value" style={{ color: statusCfg.color }}>{statusCfg.label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Next Project teaser ── */}
        <div className="pdp-next" onClick={() => navigate(`/project/${nextProject.id}`)}>
          <span className="pdp-next-label">Next Project</span>
          <div className="pdp-next-inner">
            <div>
              <p className="pdp-next-category">{nextProject.category}</p>
              <h3 className="pdp-next-title">{nextProject.title}</h3>
            </div>
            <LuChevronRight size={28} style={{ color: nextProject.accent }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
