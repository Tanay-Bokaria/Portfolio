import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuChevronRight, LuLock } from "react-icons/lu";
import "./styles/Work.css";
import { projects, Project } from "../data/projects";
import ConfidentialModal from "./ConfidentialModal";

const Work = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isConfidModalOpen, setIsConfidModalOpen] = useState(false);
  const [selectedConfidProject, setSelectedConfidProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    if (project.isConfidential) {
      setSelectedConfidProject(project);
      setIsConfidModalOpen(true);
    } else {
      navigate(`/project/${project.id}`);
    }
  };

  return (
    <section className="work-section" id="work">
      <div className="section-container">
        <div className="work-header">
          <h2 className="text-gradient">Selected <span>Work</span></h2>
          <p>A curated deck of digital solutions, focused on security and performance.</p>
        </div>

        <div className="deck-container">
          {projects.map((project, index) => {
            const total = projects.length;
            const middle = (total - 1) / 2;
            const offset = index - middle;
            
            // Base Static Fan Positions
            const baseX = offset * 140; // Horizontal spread
            const baseY = Math.abs(offset) * 25; // Vertical arc
            const baseRotate = offset * 6; // Rotation arc

            // Determine if hovered or neighbor
            const isHovered = hoveredIndex === index;
            
            let neighborOffsetX = 0;
            if (hoveredIndex !== null && !isHovered) {
              // Push left neighbors left, right neighbors right.
              if (index < hoveredIndex) neighborOffsetX = -60;
              if (index > hoveredIndex) neighborOffsetX = 60;
            }

            return (
              <motion.div
                key={project.id}
                className={`project-card glass ${project.isConfidential ? 'is-confidential' : ''}`}
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{
                  x: baseX,
                  y: baseY,
                  rotate: baseRotate,
                  scale: 1,
                  zIndex: index, // Natural DOM flow
                  opacity: 1,
                  filter: "blur(0px) brightness(1)"
                }}
                animate={{
                  x: isHovered ? baseX : baseX + neighborOffsetX,
                  y: isHovered ? baseY - 80 : baseY, // Move aggressively up to completely clear deck
                  rotate: isHovered ? 0 : baseRotate, // Straighten active card
                  scale: isHovered ? 1.05 : hoveredIndex !== null ? 0.95 : 1,
                  zIndex: isHovered ? 50 : index, // Instant snap to front layer
                  opacity: hoveredIndex !== null && !isHovered ? 0.4 : 1,
                  filter: hoveredIndex !== null && !isHovered ? "blur(4px) brightness(0.6)" : "blur(0px) brightness(1)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  mass: 0.8
                }}
                style={{
                  borderColor: isHovered ? project.accent : `${project.accent}33`,
                  cursor: 'pointer',
                  position: 'absolute'
                }}
              >
                <div className="card-inner">
                  <div className="card-top">
                    <span className="card-category" style={{ color: project.accent }}>
                      {project.category}
                    </span>
                    {project.isConfidential && (
                      <div className="confidential-badge" style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}40` }}>
                        <LuLock size={10} />
                        <span>CONFIG RESTR.</span>
                      </div>
                    )}
                    <div className="card-glow" style={{ background: project.accent }} />
                  </div>
                  
                  {project.isConfidential && isHovered && (
                    <motion.div 
                      className="confidential-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span>CONFIDENTIAL</span>
                    </motion.div>
                  )}

                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-tools">{project.tools}</p>
                  
                  <div className="card-footer">
                    <motion.span 
                      className="view-project"
                      animate={{ opacity: isHovered ? 1 : 0.5 }}
                    >
                      View Project
                    </motion.span>
                    <motion.div 
                      className="pdp-back-icon"
                      animate={{ 
                        x: isHovered ? 5 : 0, 
                        opacity: isHovered ? 1 : 0.6,
                        backgroundColor: isHovered ? project.accent : "rgba(255,255,255,0.05)",
                        color: isHovered ? "#000" : project.accent
                      }}
                      style={{ 
                        width: 28, height: 28, borderRadius: '50%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${isHovered ? 'transparent' : project.accent + '33'}`
                      }}
                    >
                      <LuChevronRight size={14} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ConfidentialModal 
        isOpen={isConfidModalOpen}
        onClose={() => setIsConfidModalOpen(false)}
        projectName={selectedConfidProject?.title || ""}
      />
    </section>
  );
};

export default Work;
