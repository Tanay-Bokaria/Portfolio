import React, { useEffect } from 'react';
import { LuAward, LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ParticlesBackground from "../components/ParticlesBackground";

const certificates = [
  {
    id: 1,
    title: "Ethical Hacking Course",
    issuer: "Eduskills Academy",
    date: "2025",
    type: "Certification",
    description: "Certified course in Ethical Hacking, covering key cybersecurity principles, network reconnaissance, and vulnerability assessment.",
    skills: ["Nmap", "Burp Suite", "Metasploit", "Vulnerability Research"],
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eduskills%20completion%20certificate%20.jpg-eiAYGUwnHLKiyXNoUGAjsG3xGmpRZv.jpeg",
  },
  {
    id: 2,
    title: "Ethical Hacking Virtual Internship",
    issuer: "EduSkills Academy & AICTE",
    date: "2025",
    type: "Internship",
    description: "Completed a 10-week virtual internship focused on hands-on ethical hacking tasks and security audits.",
    skills: ["Penetration Testing", "Network Security", "Report Writing"],
    url: "#",
  },
];

const CertificationsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-main" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ParticlesBackground />
      <Navbar />
      
      <div className="content-width-wrapper" style={{ 
        width: '100%', 
        maxWidth: '1000px', 
        margin: '100px auto 40px', 
        padding: '0 20px', 
        boxSizing: 'border-box',
        zIndex: 10
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'none', 
            border: 'none', 
            color: 'var(--accentColor)', 
            cursor: 'pointer',
            fontSize: '14px',
            marginBottom: '32px',
            fontWeight: 500
          }}
        >
          <LuArrowLeft size={18} /> BACK TO HOME
        </button>

        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <LuAward size={32} color="var(--accentColor)" />
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', margin: 0, color: '#fff' }}>Certifications</h1>
          </div>
          <p style={{ color: '#adacac', fontSize: '16px', maxWidth: '600px', lineHeight: 1.6 }}>
            Specialized training, technical milestones, and academic achievements in information security and software engineering.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px',
          width: '100%'
        }}>
          {certificates.map((cert) => (
            <div 
              key={cert.id} 
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "24px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ 
                  padding: '4px 12px', 
                  borderRadius: '100px', 
                  background: 'rgba(94, 234, 212, 0.1)', 
                  color: 'var(--accentColor)', 
                  fontSize: '11px', 
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {cert.type}
                </span>
                <span style={{ fontSize: '13px', color: '#666' }}>{cert.date}</span>
              </div>

              <h3 style={{ fontSize: '20px', color: '#fff', margin: '0 0 8px 0', fontWeight: 500 }}>{cert.title}</h3>
              <p style={{ fontSize: '14px', color: '#888', margin: '0 0 16px 0' }}>{cert.issuer}</p>
              
              <p style={{ fontSize: '14px', color: '#adacac', lineHeight: 1.5, margin: '16px 0', flexGrow: 1 }}>
                {cert.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '16px 0' }}>
                {cert.skills.map((skill, index) => (
                  <span key={index} style={{ 
                    fontSize: '11px', 
                    color: '#999', 
                    background: 'rgba(255,255,255,0.03)', 
                    padding: '4px 10px', 
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>

              <a 
                href={cert.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  marginTop: '16px',
                  color: 'var(--accentColor)', 
                  fontSize: '14px', 
                  fontWeight: 500, 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                VIEW CREDENTIAL <span>&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsPage;
