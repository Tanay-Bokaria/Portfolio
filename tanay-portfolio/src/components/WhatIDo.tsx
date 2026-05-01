import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/WhatIDo.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "cyber",
    title: "Cybersecurity",
    subtitle: "Security & Problem Solving",
    description: "Exploring the world of cybersecurity and robust system design. Passionate about ethical hacking and protecting digital ecosystems.",
    icon: "🛡️",
    tags: ["Network Security", "Ethical Hacking", "Cryptography", "Linux"]
  },
  {
    id: "prog",
    title: "Programming",
    subtitle: "Build, Break & Rebuild",
    description: "Engineering clean, scalable applications with a focus on performance and user experience using modern tech stacks.",
    icon: "💻",
    tags: ["Java", "React", "TypeScript", "Antigravity", "Cursor"]
  },
  {
    id: "design",
    title: "Digital Design",
    subtitle: "Aesthetics & Experience",
    description: "Creating visually stunning and intuitive interfaces that leave a lasting impression on users.",
    icon: "🎨",
    tags: ["UI/UX", "Branding", "Motion Design", "Visual Arts"]
  }
];

const WhatIDo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="whatIDO" id="what-i-do" ref={sectionRef}>
      <div className="section-container">
        <div className="what-header reveal">
          <h2 className="text-gradient">What <span>I Do</span></h2>
          <p>Fusing technical expertise with creative vision to build the future.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card glass"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-subtitle">{service.subtitle}</p>
              <p className="service-description">{service.description}</p>
              <div className="service-tags">
                {service.tags.map(tag => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;

