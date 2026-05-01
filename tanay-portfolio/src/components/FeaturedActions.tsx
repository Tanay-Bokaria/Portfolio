import React from 'react';
import { LuAward, LuGlobe } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const FeaturedActions: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  return (
    <div className="section-container" style={{ padding: isMobile ? "20px 0" : "40px 0", maxWidth: "1000px", margin: "0 auto", boxSizing: 'border-box' }}>
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row", 
        gap: isMobile ? "16px" : "20px",
        padding: isMobile ? "0" : "0 20px",
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Certifications Button */}
        <button 
          onClick={() => navigate('/certifications')}
          style={{
            flex: 1,
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: isMobile ? "24px" : "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 24px -1px rgba(0, 0, 0, 0.2)",
            width: '100%'
          }}
          onMouseEnter={(e) => {
            if (window.innerWidth >= 768) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(94, 234, 212, 0.3)";
              e.currentTarget.style.boxShadow = "0 12px 40px -5px rgba(94, 234, 212, 0.15)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.boxShadow = "0 4px 24px -1px rgba(0, 0, 0, 0.2)";
          }}
        >
          <div style={{ 
            background: "rgba(94, 234, 212, 0.1)", 
            padding: "14px", 
            borderRadius: "14px", 
            color: "var(--accentColor)",
            marginBottom: "20px"
          }}>
            <LuAward size={28} />
          </div>
          <h3 style={{ fontSize: isMobile ? "20px" : "24px", color: "#fff", margin: "0 0 8px 0", fontWeight: 500 }}>Certifications</h3>
          <p style={{ color: "#adacac", fontSize: "14px", margin: 0, fontWeight: 300, lineHeight: 1.5 }}>
            View my specialized training and technical milestones.
          </p>
          <div style={{ 
            marginTop: "20px", 
            fontSize: "13px", 
            fontWeight: 500, 
            color: "var(--accentColor)", 
            display: "flex", 
            alignItems: "center", 
            gap: "6px" 
          }}>
            EXPLORE NOW <span style={{ transition: "transform 0.3s ease" }}>&rarr;</span>
          </div>
        </button>

        {/* Beyond Code Button */}
        <button 
          onClick={() => navigate('/beyond-code')}
          style={{
            flex: 1,
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: isMobile ? "24px" : "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 24px -1px rgba(0, 0, 0, 0.2)",
            width: '100%'
          }}
          onMouseEnter={(e) => {
            if (window.innerWidth >= 768) {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(94, 234, 212, 0.3)";
              e.currentTarget.style.boxShadow = "0 12px 40px -5px rgba(94, 234, 212, 0.15)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.boxShadow = "0 4px 24px -1px rgba(0, 0, 0, 0.2)";
          }}
        >
          <div style={{ 
            background: "rgba(94, 234, 212, 0.1)", 
            padding: "14px", 
            borderRadius: "14px", 
            color: "var(--accentColor)",
            marginBottom: "20px"
          }}>
            <LuGlobe size={28} />
          </div>
          <h3 style={{ fontSize: isMobile ? "20px" : "24px", color: "#fff", margin: "0 0 8px 0", fontWeight: 500 }}>Beyond Code</h3>
          <p style={{ color: "#adacac", fontSize: "14px", margin: 0, fontWeight: 300, lineHeight: 1.5 }}>
            Explore my blogs, research papers, and tech events.
          </p>
          <div style={{ 
            marginTop: "20px", 
            fontSize: "13px", 
            fontWeight: 500, 
            color: "var(--accentColor)", 
            display: "flex", 
            alignItems: "center", 
            gap: "6px" 
          }}>
            VIEW ARTICLES <span style={{ transition: "transform 0.3s ease" }}>&rarr;</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FeaturedActions;
