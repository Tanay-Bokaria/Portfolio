import React, { useEffect, useState } from 'react';
import { LuLightbulb, LuArrowLeft, LuBook, LuCalendarDays, LuVideo } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ParticlesBackground from "../components/ParticlesBackground";

const blogs = [
  {
    title: "The Role of Ethical Hackers in Protecting Modern Digital Infrastructure",
    description: "A detailed exploration of how ethical hackers protect modern digital systems such as banking, healthcare, and cloud infrastructure. The article explains real-world applications, tools, and the growing importance of cybersecurity.",
    href: "https://medium.com/@tanaybokaria18/the-role-of-ethical-hackers-in-protecting-modern-digital-infrastructure-326a1e935719",
  },
  {
    title: "Computer Networks and CCNA Concepts",
    description: "A clear primer on networking fundamentals and CCNA-aligned concepts—covering layers, addressing, routing, and practical insights.",
    href: "https://medium.com/@tanaybokaria18/computer-networks-and-ccna-concepts-3d8b1dbedada",
  },
  {
    title: "Understanding the OSI Model",
    description: "A personal narrative detailing my journey of understanding the OSI model for CCNA certification, breaking down each of the 7 layers.",
    href: "https://medium.com/@tanaybokaria18/understanding-the-osi-model-my-self-learning-journey-in-computer-networks-3217983688f4",
  },
  {
    title: "Combinatorics in Cryptography",
    description: "Exploring how combinatorics forms the mathematical foundation of modern cryptography, from key generation to encryption.",
    href: "https://medium.com/@tanaybokaria18/combinatorics-in-cryptography-and-cybersecurity-6122088948c0",
  },
];

const research = [
  {
    title: "Network Security Fundamentals",
    description: "A video explanation of Network Security Fundamentals and defensive strategies.",
    href: "https://youtu.be/HZsI7hztzJk?si=GJLDiRtNo-xUzUgC",
  },
];

const events = [
  {
    title: "Haxnation Mumbai: June Meetup",
    description: "Attended a cloud security meetup focused on Microsoft Azure Security, covering offensive techniques like OIDC abuse.",
    date: "June 28, 2025"
  },
];

const slaVideos = [
  {
    title: "SLA Video Submissions",
    description: "A collection of all Self-Learning Assessment (SLA) videos across different subjects. Each video is organized and uploaded to a shared drive for easy access and reference. Videos are named subject-wise (e.g., Ethical Hacking, DBMS, etc.) for easy navigation.",
    href: "https://drive.google.com/drive/folders/1nesvuBrTGwbtbEuOaI01uU0VetWjlqGr?usp=sharing",
    tag: "Academic Projects"
  }
];

const BeyondCodePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'blogs' | 'research' | 'events' | 'sla'>('blogs');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderContent = () => {
    const data = 
      activeTab === 'blogs' ? blogs : 
      activeTab === 'research' ? research : 
      activeTab === 'events' ? events : 
      slaVideos;

    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '20px',
        width: '100%'
      }}>
        {data.map((item, idx) => (
          <div key={idx} className="beyond-card" style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "20px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s ease",
            position: "relative"
          }}>
            {item.tag && (
              <span style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                fontSize: "10px",
                background: "rgba(94, 234, 212, 0.1)",
                color: "var(--accentColor)",
                padding: "4px 8px",
                borderRadius: "100px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                {item.tag}
              </span>
            )}
            <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '12px', lineHeight: 1.4, paddingRight: item.tag ? '80px' : '0' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: '#adacac', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>{item.description}</p>
            {'href' in item ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accentColor)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {activeTab === 'sla' ? 'OPEN DRIVE' : 'EXPLORE NOW'} &rarr;
              </a>
            ) : (
              <span style={{ fontSize: '12px', color: '#666' }}>{item.date}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

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
          aria-label="Go back to home page"
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
            fontWeight: 500,
            fontFamily: 'inherit',
            padding: 0
          }}
        >
          <LuArrowLeft size={18} /> BACK TO HOME
        </button>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <LuLightbulb size={32} color="var(--accentColor)" />
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', margin: 0, color: '#fff' }}>Beyond Code</h1>
          </div>
          <p style={{ color: '#adacac', fontSize: '16px', maxWidth: '600px', lineHeight: 1.6 }}>
            My insights from technical writing, research explorations, and community contributions in the tech ecosystem.
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '32px', 
          flexWrap: 'wrap',
          padding: '4px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '100px',
          width: 'fit-content'
        }}>
          {[
            { id: 'blogs', label: 'Blogs', icon: <LuBook size={16} /> },
            { id: 'research', label: 'Research', icon: <LuLightbulb size={16} /> },
            { id: 'events', label: 'Events', icon: <LuCalendarDays size={16} /> },
            { id: 'sla', label: 'SLA Videos', icon: <LuVideo size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              aria-label={`Show ${tab.label}`}
              aria-pressed={activeTab === tab.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: activeTab === tab.id ? 'rgba(94, 234, 212, 0.1)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accentColor)' : '#777',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 600 : 400,
                fontFamily: 'inherit'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default BeyondCodePage;
