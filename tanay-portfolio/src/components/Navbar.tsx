import { useNavigate, useLocation } from "react-router-dom";
import "./styles/Navbar.css";
import { siteConfig } from "../siteConfig";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <nav className="apple-nav">
      <div className="apple-nav-left">
        <a
          href="/"
          className="apple-logo"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          data-cursor="disable"
        >
          {siteConfig.initials}
        </a>
      </div>

      <div className="apple-nav-center apple-nav-links">
        <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>About</a>
        <a href="#work" onClick={(e) => handleNavClick(e, "#work")}>Work</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a>
        <span className="apple-nav-divider"></span>
        <a href={`mailto:${siteConfig.email}`} className="apple-nav-email">
          {siteConfig.email}
        </a>
      </div>

      <div className="apple-nav-right">
        <a
          href="https://drive.google.com/drive/folders/1oDFr3RXI8IIDU9OPlkwRBk-i8bzDK_xw?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="apple-resume-btn"
          data-cursor="disable"
        >
          RESUME
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
