import { useState, useEffect, useRef } from "react";
import { LuX, LuExternalLink } from "react-icons/lu";
import gsap from "gsap";
import { useSection } from "../context/SectionContext";
import "./styles/Certificates.css";

const certificates = [
  {
    id: 1,
    title: "Ethical Hacking Course",
    issuer: "Eduskills Academy",
    date: "2025",
    type: "Certification",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eduskills%20completion%20certificate%20.jpg-eiAYGUwnHLKiyXNoUGAjsG3xGmpRZv.jpeg",
    accent: "#5eead4",
  },
  {
    id: 2,
    title: "Ethical Hacking Internship",
    issuer: "EduSkills Academy & AICTE",
    date: "2025",
    type: "Internship",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eduskills%20completion%20certificate%20.jpg-eiAYGUwnHLKiyXNoUGAjsG3xGmpRZv.jpeg",
    accent: "#a78bfa",
  },
];

const Certificates = () => {
  const { isCertificatesExpanded: isOpen, setCertificatesExpanded: setIsOpen } = useSection();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(".cert-overlay", 
        { opacity: 0, backdropFilter: "blur(0px)" }, 
        { opacity: 1, backdropFilter: "blur(20px)", duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(".cert-tile", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "unset";
      setSelectedId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedCert = certificates.find(c => c.id === selectedId);

  return (
    <div className="cert-overlay" onClick={() => setIsOpen(false)}>
      <div className="cert-container glass" onClick={(e) => e.stopPropagation()} ref={containerRef}>
        <div className="cert-header">
          <div className="reveal">
            <h2 className="text-gradient">Professional <span>Credentials</span></h2>
            <p>A collection of industry-recognized certifications and internships.</p>
          </div>
          <button className="cert-close" onClick={() => setIsOpen(false)}>
            <LuX size={24} />
          </button>
        </div>

        <div className="cert-grid">
          {certificates.map((cert) => (
            <div 
              key={cert.id} 
              className="cert-tile glass"
              onClick={() => setSelectedId(cert.id)}
              style={{ "--cert-accent": cert.accent } as any}
            >
              <div className="cert-tile-img">
                <img src={cert.image} alt={cert.title} />
                <div className="cert-tile-overlay">
                  <span>View Full ↗</span>
                </div>
              </div>
              <div className="cert-tile-content">
                <span className="cert-type" style={{ color: cert.accent }}>{cert.type}</span>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCert && (
        <div className="cert-modal-overlay" onClick={() => setSelectedId(null)}>
          <div className="cert-modal glass" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelectedId(null)}>
              <LuX size={24} />
            </button>
            <div className="cert-modal-img">
              <img src={selectedCert.image} alt={selectedCert.title} />
            </div>
            <div className="cert-modal-info">
              <h3>{selectedCert.title}</h3>
              <p>{selectedCert.issuer} · {selectedCert.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;

