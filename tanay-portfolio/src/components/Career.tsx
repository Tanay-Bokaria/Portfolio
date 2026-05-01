import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";

gsap.registerPlugin(ScrollTrigger);

const careerData = [
  {
    title: "Growth Marketing Intern",
    institution: "Mojingo Private Limited",
    year: "2025",
    description: "Spearheading content creation and growth campaigns to redefine social connection through moods."
  },
  {
    title: "B.Tech Cybersecurity",
    institution: "SAKEC, Mumbai",
    year: "2024 - 2028",
    description: "Maintaining a strong CGPA of 8.83 while consistently advancing academic and technical skills."
  }
];

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line fill animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // Checkpoint pulse animations
      const checkpoints = gsap.utils.toArray(".timeline-checkpoint");
      checkpoints.forEach((checkpoint: any) => {
        gsap.to(checkpoint, {
          boxShadow: "0 0 20px 4px var(--accent)",
          backgroundColor: "var(--accent)",
          scale: 1.2,
          scrollTrigger: {
            trigger: checkpoint,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Item reveals
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item: any) => {
        gsap.fromTo(item,
          { opacity: 0, x: (index) => index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="career-section" id="education-experience" ref={containerRef}>
      <div className="section-container">
        <div className="timeline-header reveal">
          <h2 className="text-gradient">Education <span>&</span> Experience</h2>
          <p>The journey of growth, learning, and professional evolution.</p>
        </div>

        <div className="timeline-wrapper" ref={triggerRef}>
          <div className="timeline-track">
            <div className="timeline-glow-line" ref={lineRef} />
          </div>

          {careerData.map((item, index) => (
            <div className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`} key={index}>
              <div className="timeline-content glass">
                <span className="timeline-year">{item.year}</span>
                <h4 className="timeline-title">{item.title}</h4>
                <h5 className="timeline-institution">{item.institution}</h5>
                <p className="timeline-desc">{item.description}</p>
              </div>
              <div className="timeline-checkpoint" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;

