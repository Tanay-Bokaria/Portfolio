import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuLock } from "react-icons/lu";
import "./styles/ConfidentialModal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
};

const ConfidentialModal = ({ isOpen, onClose, projectName }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="confidential-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="confidential-modal-wrapper">
            <motion.div
              className="confidential-modal glass"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button className="confidential-close" onClick={onClose}>
                <LuX size={20} />
              </button>

              <div className="confidential-icon-box">
                <LuLock size={32} />
              </div>

              <h2 className="confidential-title">🔒 Confidential Project</h2>
              <p className="confidential-subtitle">{projectName}</p>
              
              <div className="confidential-divider"></div>

              <div className="confidential-content">
                <p>
                  This project was developed as part of a <strong>Center of Excellence (COE) program</strong> under my college.
                </p>
                <p>
                  Due to permission restrictions, I am currently unable to publicly share its details.
                </p>
                <p className="confidential-footer-text">
                  The full project will be revealed once I receive official approval.
                </p>
              </div>

              <button className="confidential-ok-btn" onClick={onClose}>
                Understood
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfidentialModal;
