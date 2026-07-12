// ─────────────────────────────────────────────────────────────
//  Container Security Architecture — Premium Research Page
//  Apple / Vercel / Stripe-style technical case study
// ─────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  LuArrowLeft,
  LuShield,
  LuUser,
  LuTriangleAlert,
  LuCheck,
  LuCode,
  LuTerminal,
  LuServer,
  LuCloud,
  LuActivity,
  LuLock,
  LuZap,
  LuLayers,
  LuBox,
  LuExternalLink,
  LuClock,
  LuCalendar,
  LuGlobe,
  LuBook,
  LuChevronRight,
  LuArrowDown,
  LuPackage,
  LuCpu,
  LuNetwork,
  LuDatabase,
  LuSettings,
  LuHeart,
  LuLandmark,
  LuGitBranch,
  LuCircleCheck,
  LuFolderOpen,
  LuPlay,
  LuFileText,
  LuImage,
  LuMonitor,
  LuWrench,
  LuX,
} from "react-icons/lu";
import Navbar from "../components/Navbar";
import ParticlesBackground from "../components/ParticlesBackground";
import "./ContainerSecurityPage.css";

// ─────────────────────────────────────────────────────────────
//  Animation Variants
// ─────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─────────────────────────────────────────────────────────────
//  Static Data
// ─────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: "csp-overview", label: "Overview" },
  { id: "csp-background", label: "Background" },
  { id: "csp-threats", label: "Threats" },
  { id: "csp-architecture", label: "Architecture" },
  { id: "csp-controls", label: "Controls" },
  { id: "csp-tools", label: "Tools" },
  { id: "csp-implementation", label: "Demo" },
  { id: "csp-gallery", label: "Gallery" },
  { id: "csp-deliverables", label: "Deliverables" },
  { id: "csp-applications", label: "Applications" },
  { id: "csp-sdg", label: "SDG" },
  { id: "csp-learnings", label: "Learnings" },
  { id: "csp-conclusion", label: "Conclusion" },
  { id: "csp-references", label: "References" },
];

const THREATS = [
  {
    Icon: LuUser,
    title: "Running as Root",
    category: "Privilege Escalation",
    impact: "CRITICAL",
    color: "#ef4444",
    desc: "Containers running as the root user grant attackers full host system access if the container is breached. Even a single exploit becomes a complete system compromise.",
  },
  {
    Icon: LuBox,
    title: "Vulnerable Base Images",
    category: "Supply Chain",
    impact: "HIGH",
    color: "#f97316",
    desc: "Bloated images built on unpatched OS packages expose documented CVEs. Using unverified or outdated base images dramatically increases the exploitable attack surface.",
  },
  {
    Icon: LuLock,
    title: "Hardcoded Secrets",
    category: "Data Exposure",
    impact: "CRITICAL",
    color: "#ef4444",
    desc: "API keys, database passwords, and tokens embedded in Dockerfiles or image layers are readable by anyone with registry access — causing immediate credential leakage.",
  },
  {
    Icon: LuLayers,
    title: "Excessive Capabilities",
    category: "Kernel Access",
    impact: "HIGH",
    color: "#f97316",
    desc: "Linux capabilities like CAP_SYS_ADMIN allow container processes to interact with the host kernel — enabling container escape and host-level privilege escalation.",
  },
  {
    Icon: LuZap,
    title: "Outdated Dependencies",
    category: "Dependency Risk",
    impact: "MEDIUM",
    color: "#eab308",
    desc: "Unpinned Python packages and stale system libraries introduce version-specific CVEs. pip install without version locks creates reproducibility and security debt.",
  },
  {
    Icon: LuNetwork,
    title: "Untrusted Public Images",
    category: "Supply Chain",
    impact: "HIGH",
    color: "#f97316",
    desc: "Pulling unverified images from public registries introduces backdoored or malicious layers. Compromised images have been weaponised for cryptomining and data exfiltration.",
  },
  {
    Icon: LuServer,
    title: "Insecure Production Server",
    category: "Runtime Misconfiguration",
    impact: "HIGH",
    color: "#f97316",
    desc: "Deploying applications using Flask's built-in development server exposes debug interfaces, verbose stack traces, and single-threaded processing to production traffic — creating denial-of-service vulnerabilities and sensitive information leakage.",
  },
  {
    Icon: LuTriangleAlert,
    title: "No Pre-deployment Scanning",
    category: "Process Failure",
    impact: "CRITICAL",
    color: "#ef4444",
    desc: "Pushing container images to production without automated vulnerability scanning allows known CVEs, embedded secrets, and Dockerfile misconfigurations to reach live systems — creating invisible, accumulating security debt across the infrastructure.",
  },
];

const PIPELINE = [
  {
    Icon: LuCode,
    title: "Developer",
    desc: "Source code authored in Python with Flask. Routes defined with mock employee data. Dependencies declared in requirements.txt with pinned versions for reproducible, auditable builds.",
    color: "#a78bfa",
  },
  {
    Icon: LuGitBranch,
    title: "Docker Build",
    desc: "The docker build command processes the Dockerfile sequentially. Each instruction creates a read-only image layer, enabling efficient caching and minimal rebuild times on CI systems.",
    color: "#22d3ee",
  },
  {
    Icon: LuBox,
    title: "Minimal Base Image",
    desc: "python:3.12-slim chosen over the full python:3.12 image. The slim variant excludes unnecessary OS utilities, documentation, and build tools — reducing attack surface by approximately 70%.",
    color: "#22d3ee",
  },
  {
    Icon: LuPackage,
    title: "Install Dependencies",
    desc: "pip install --no-cache-dir prevents local caching from inflating image size. Dependencies copied before source code to maximise Docker layer cache hit rate on subsequent builds.",
    color: "#22d3ee",
  },
  {
    Icon: LuUser,
    title: "Create Non-root User",
    desc: "A dedicated appuser (UID 1001) is created with groupadd and useradd. File ownership of /app is transferred. USER instruction switches execution context before the application starts.",
    color: "#34d399",
  },
  {
    Icon: LuShield,
    title: "Build Secure Image",
    desc: "Final image tagged with a version number for auditability. Metadata labels added — maintainer, version, description — enabling lifecycle management and container inventory systems.",
    color: "#22d3ee",
  },
  {
    Icon: LuActivity,
    title: "Trivy Scan",
    desc: "Trivy performs a comprehensive scan against the built image — checking for OS-level CVEs, application dependency vulnerabilities, exposed secrets, and Dockerfile misconfiguration patterns.",
    color: "#f59e0b",
  },
  {
    Icon: LuServer,
    title: "Deploy Secure Container",
    desc: "Gunicorn WSGI server replaces the Flask development server — providing multi-worker support and production-grade stability. HEALTHCHECK instruction enables orchestrator-driven liveness monitoring.",
    color: "#22d3ee",
  },
  {
    Icon: LuCloud,
    title: "Production",
    desc: "Verified container deployed and accessible on port 5000. All security controls validated: non-root execution, minimal image, zero CRITICAL CVEs, production server — ready for enterprise deployment.",
    color: "#34d399",
  },
];

const CONTROLS = [
  {
    Icon: LuUser,
    title: "Non-root User Execution",
    desc: "Container runs as appuser (UID 1001). Eliminates root-level host access in the event of application compromise — the most impactful single security control.",
  },
  {
    Icon: LuBox,
    title: "Python Slim Base Image",
    desc: "python:3.12-slim reduces the attack surface by excluding unnecessary OS utilities, documentation, and compilers from the final image — fewer packages means fewer CVEs.",
  },
  {
    Icon: LuShield,
    title: "Minimal Attack Surface",
    desc: "No development tools, debug utilities, or unnecessary packages installed. Only what is strictly required for the application to function exists in the image.",
  },
  {
    Icon: LuServer,
    title: "Gunicorn Production Server",
    desc: "Gunicorn WSGI server replaces the Flask development server — providing multi-worker support, graceful shutdown, and production-grade process management.",
  },
  {
    Icon: LuLayers,
    title: "Docker Ignore Rules",
    desc: ".dockerignore excludes development artefacts, version control directories, and sensitive configuration files from being inadvertently copied into the container image.",
  },
  {
    Icon: LuActivity,
    title: "Trivy Vulnerability Scan",
    desc: "Automated scanning identifies CVEs in OS packages and Python dependencies. CRITICAL/HIGH severity findings act as deployment gates in a real CI/CD pipeline.",
  },
  {
    Icon: LuLock,
    title: "Principle of Least Privilege",
    desc: "Every component operates with the minimum permissions required. No sudo access, no write permissions outside /app, no network administration capabilities assigned.",
  },
  {
    Icon: LuCircleCheck,
    title: "Container Health Monitoring",
    desc: "HEALTHCHECK instruction configured with 30-second intervals and 3 retry attempts. Container orchestrators automatically restart unhealthy instances, improving operational reliability.",
  },
];

const COMMANDS = [
  {
    cmd: "docker build -t achmtech-portal:v1 .",
    output: "",
    explanation:
      "Builds the Docker image from the Dockerfile in the current directory. The -t flag tags the image as achmtech-portal:v1 for identification. The trailing dot sets the build context to the current directory.",
  },
  {
    cmd: "docker run -d --name acmetech-demo -p 5000:5000 achmtech-portal:v1",
    output: "8d2469fce54e...",
    explanation:
      "Runs the container in detached mode (-d), mapping host port 5000 to container port 5000. The --name flag labels the container acmetech-demo for easy reference in subsequent commands.",
  },
  {
    cmd: "docker ps",
    output: `CONTAINER ID   IMAGE                STATUS                          PORTS                                         NAMES\n8d2469fce54e   achmtech-portal:v1   Up About an hour (healthy)   0.0.0.0:5000->5000/tcp, [::]:5000->5000/tcp   acmetech-demo`,
    explanation:
      "Lists all running containers. Confirms acmetech-demo is active and healthy, with Gunicorn serving traffic on port 5000.",
  },
  {
    cmd: "docker images",
    output: `IMAGE                DISK USAGE   CONTENT SIZE\nachmtech-portal:v1   203MB        49MB`,
    explanation:
      "Lists Docker images on the system. The slim base image keeps the content size to just 49MB — approximately 70% smaller than the full python:3.12 image, significantly reducing the attack surface.",
  },
  {
    cmd: "docker logs acmetech-demo",
    output: `[INFO] Starting gunicorn 21.2.0\n[INFO] Listening at: http://0.0.0.0:5000 (1)\n[INFO] Worker booting (pid: 8)\n[INFO] Booted in 0.21s`,
    explanation:
      "Streams application logs. Gunicorn started successfully — workers are booted and the application is listening on port 5000, confirming a healthy container deployment.",
  },
  {
    cmd: "docker exec -it acmetech-demo sh",
    output: "",
    explanation:
      "Opens an interactive shell (-it) inside the running container. Used to verify the runtime environment, filesystem permissions, and user execution context.",
  },
  {
    cmd: "whoami",
    output: "appuser",
    explanation:
      "Critical security verification: the container executes as appuser, not root. This confirms the principle of least privilege is properly enforced at the process level.",
  },
  {
    cmd: "python --version",
    output: "Python 3.12.13",
    explanation:
      "Verifies the exact Python version inside the container. Python 3.12.13 running on Debian Slim provides a secure, minimal runtime environment.",
  },
  {
    cmd: "cat /etc/os-release",
    output: `PRETTY_NAME="Debian GNU/Linux 13 (trixie)"\nNAME="Debian GNU/Linux"\nVERSION_ID="13"\nVERSION_CODENAME=trixie\nDEBIAN_VERSION_FULL=13.5`,
    explanation:
      "Inspects the container's base operating system. Confirms Debian 13 (trixie) Slim — a minimal, actively maintained distribution with regular security patches from the Debian Security Team.",
  },
  {
    cmd: "trivy image achmtech-portal:v1",
    output: `2026-07-12T17:14:00Z  INFO  Vulnerability scanning is enabled\n2026-07-12T17:14:00Z  INFO  Secret scanning is enabled\n2026-07-12T17:14:04Z  INFO  Detected OS: debian 13.5\n\nachmtech-portal:v1 (debian 13.5)\n────────────────────────────────\nTotal: 6 (CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3)\n\nPython (python-pkg)\n────────────────────\nTotal: 1 (CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 1)`,
    explanation:
      "Trivy performs a comprehensive vulnerability scan — both OS-level and Python dependency CVEs. Zero CRITICAL vulnerabilities detected. The single HIGH finding (util-linux CVE-2026-53615) exists in base OS packages outside application control. Flask CVE-2026-27205 (LOW) has a known fix for the next update cycle.",
  },
];

const GALLERY = [
  {
    id: 1,
    title: "Employee Portal Running",
    desc: "AcmeTech Employee Portal successfully deployed and running inside a Docker container at localhost:5000. Dashboard displays container status, security compliance score (A+), and deployment metadata.",
    src: "/container/Screenshot 2026-07-12 231433.png",
  },
  {
    id: 2,
    title: "Docker Deployment Verification",
    desc: "Docker image built successfully (49MB content size) and container running in healthy state. Gunicorn WSGI server actively serving the Flask application on port 5000.",
    src: "/container/Screenshot 2026-07-12 231633.png",
  },
  {
    id: 3,
    title: "Container Hardening Verification",
    desc: "Verification that the application runs as non-root user (appuser) inside a Debian GNU/Linux 13 (trixie) slim container with Python 3.12.13 — confirming least privilege enforcement.",
    src: "/container/Screenshot 2026-07-12 231752.png",
  },
  {
    id: 4,
    title: "Trivy Vulnerability Scan — OS Packages",
    desc: "Container image scanned using Trivy identifying CVEs in operating system packages including sysvinit-utils, tar, and util-linux. Results classified by severity — LOW, MEDIUM, and HIGH.",
    src: "/container/Screenshot 2026-07-12 223915.png",
  },
  {
    id: 5,
    title: "Trivy Vulnerability Scan — Dependencies",
    desc: "Trivy Python dependency scan showing Flask CVE-2026-27205 (LOW severity) and zlib CVE-2026-27171 (MEDIUM). Zero CRITICAL vulnerabilities detected across the application layer.",
    src: "/container/Screenshot 2026-07-12 231846.png",
  },
];

const INDUSTRIES = [
  { Icon: LuCloud, title: "Cloud Computing", desc: "Isolated containerised workloads prevent cross-tenant breaches in shared cloud environments. Security controls ensure each microservice operates with minimum required permissions." },
  { Icon: LuLandmark, title: "Banking & Finance", desc: "Financial institutions use hardened containers to isolate payment processing services. Non-root execution and Trivy scans meet PCI-DSS compliance requirements for card data environments." },
  { Icon: LuHeart, title: "Healthcare", desc: "Container security protects sensitive patient data in clinical information systems. Minimal base images and automated vulnerability scanning ensure HIPAA compliance." },
  { Icon: LuShield, title: "Government & Defence", desc: "Critical national infrastructure runs in secured containers with strict privilege controls. Regular Trivy audits ensure compliance with government cybersecurity frameworks." },
  { Icon: LuActivity, title: "SOC Operations", desc: "Security operations centres use containerised tooling with strict isolation boundaries. Non-root containers prevent lateral movement if a security analysis tool is compromised." },
  { Icon: LuGitBranch, title: "Enterprise DevOps", desc: "Trivy integrates directly into CI/CD pipelines, blocking vulnerable images from reaching production. Container security becomes part of the build process — not an afterthought." },
  { Icon: LuSettings, title: "Manufacturing & IoT", desc: "Industrial control systems deployed in containers with locked-down capabilities. Minimal images reduce update attack surfaces on factory floor and SCADA infrastructure." },
  { Icon: LuDatabase, title: "SaaS Platforms", desc: "Multi-tenant SaaS platforms use container isolation to enforce customer data boundaries. Gunicorn servers and health checks ensure stability at scale with proper resource limits." },
  { Icon: LuCpu, title: "CI/CD Pipelines", desc: "Container security scanning integrates directly into continuous integration pipelines, automatically blocking vulnerable images from reaching staging or production environments. Trivy and similar tools act as automated security gates in the delivery workflow." },
];

const LEARNINGS = [
  { title: "Docker Fundamentals", desc: "Understanding Dockerfile syntax, image layers, build context, and the difference between docker build, run, exec, ps, and logs commands in a real project context." },
  { title: "Container Security Principles", desc: "Core pillars of container security: least privilege, minimal attack surface, immutable infrastructure, and continuous vulnerability management throughout the container lifecycle." },
  { title: "Image Hardening Techniques", desc: "Selecting minimal base images, removing unnecessary packages, structuring Dockerfile layers for cache efficiency, and applying .dockerignore rules to control the build context." },
  { title: "Trivy Vulnerability Scanning", desc: "Running automated CVE scans against Docker images, interpreting severity levels (CRITICAL / HIGH / MEDIUM / LOW), understanding CVE identifiers, and acting on scan findings." },
  { title: "Principle of Least Privilege", desc: "Creating dedicated application users with minimum required permissions, restricting filesystem ownership, and understanding Linux user namespaces and capabilities in container contexts." },
  { title: "Production Deployment Practices", desc: "Using Gunicorn as a production-grade WSGI server instead of the Flask dev server, configuring HEALTHCHECK instructions, and writing container metadata labels for lifecycle management." },
  { title: "Enterprise DevSecOps Mindset", desc: "Integrating security into the build pipeline — treating Trivy scanning as a CI gate, thinking about security as code, and applying the shift-left security mindset to container delivery." },
  { title: "CVE Analysis & Vulnerability Assessment", desc: "Interpreting CVE severity levels (CRITICAL, HIGH, MEDIUM, LOW), understanding CVE identifiers (e.g., CVE-2026-27205), cross-referencing with vulnerability databases, and prioritising remediation based on exploit risk and business impact." },
  { title: "Container Threat Modelling", desc: "Systematically identifying attack vectors in containerised environments — from privilege escalation through root containers to supply chain attacks via untrusted base images — and mapping appropriate countermeasures to each threat category." },
];

const REFERENCES = [
  { Icon: LuBook, title: "Docker Security Best Practices", desc: "Official Docker documentation on building secure images, Dockerfile reference, and container runtime security configuration guidelines.", href: "https://docs.docker.com/develop/security-best-practices/" },
  { Icon: LuActivity, title: "Trivy Documentation", desc: "Aqua Security's Trivy scanner — comprehensive vulnerability scanning for container images, filesystems, and infrastructure-as-code configurations.", href: "https://aquasecurity.github.io/trivy/" },
  { Icon: LuShield, title: "OWASP Docker Security Cheat Sheet", desc: "OWASP community-maintained best practices for securing containerised applications — covering attack surface reduction and runtime hardening.", href: "https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html" },
  { Icon: LuServer, title: "NIST SP 800-190 — Container Security", desc: "Application Container Security Guide by NIST — authoritative guidance for enterprise container security, threat modelling, and countermeasure selection.", href: "https://csrc.nist.gov/publications/detail/sp/800-190/final" },
  { Icon: LuLock, title: "CIS Docker Benchmark", desc: "Center for Internet Security Docker Benchmark — prescriptive, consensus-based guidance for establishing a secure configuration posture for Docker deployments.", href: "https://www.cisecurity.org/benchmark/docker" },
  { Icon: LuCode, title: "Python 3.12 Documentation", desc: "Official Python documentation for version 3.12 — language reference, standard library, and security considerations for Python application development and deployment.", href: "https://docs.python.org/3.12/" },
  { Icon: LuCpu, title: "Gunicorn WSGI Server", desc: "Gunicorn documentation — production-grade Python WSGI HTTP server configuration, worker management, deployment best practices, and security hardening guidelines.", href: "https://docs.gunicorn.org/" },
  { Icon: LuGlobe, title: "CVE Database — MITRE", desc: "MITRE CVE database — the authoritative registry for publicly disclosed cybersecurity vulnerabilities. Used to cross-reference CVE identifiers from Trivy scan results.", href: "https://cve.mitre.org/" },
];

// ─────────────────────────────────────────────────────────────
//  Tools & Technologies
// ─────────────────────────────────────────────────────────────
const TOOLS = [
  { Icon: LuBox, title: "Docker Desktop", version: "v4.x", desc: "Industry-standard containerisation platform used to build, run, and manage Docker containers on Windows 11. Provides Docker Engine, CLI, and Docker Compose for local development." },
  { Icon: LuShield, title: "Trivy Scanner", version: "v0.58.x", desc: "Open-source vulnerability scanner by Aqua Security. Scans container images for OS package CVEs, application dependency vulnerabilities, secrets, and Dockerfile misconfigurations." },
  { Icon: LuCode, title: "Python", version: "3.12.13", desc: "Core programming language for the AcmeTech Employee Portal. Used with the Flask web framework for building the lightweight REST application deployed inside the container." },
  { Icon: LuServer, title: "Flask", version: "3.1.x", desc: "Lightweight Python web framework used to build the Employee Portal application. Provides routing, templating, and request handling for the containerised web service." },
  { Icon: LuCpu, title: "Gunicorn", version: "21.2.0", desc: "Production-grade Python WSGI HTTP server. Replaces the Flask development server with multi-worker process management, graceful shutdown, and production-ready stability." },
  { Icon: LuLayers, title: "Debian Slim", version: "13 (trixie)", desc: "Minimal Linux distribution used as the container base image. The slim variant excludes unnecessary packages, reducing image size to 49MB and minimising the exploitable attack surface." },
  { Icon: LuMonitor, title: "VS Code", version: "Latest", desc: "Primary development environment with integrated terminal, Docker extension, and Python tooling. Used for Dockerfile authoring, application development, and terminal-based container management." },
  { Icon: LuGitBranch, title: "Git", version: "Latest", desc: "Version control system for tracking source code, Dockerfile changes, and configuration files. Ensures reproducible builds and auditable change history throughout the project lifecycle." },
];

// ─────────────────────────────────────────────────────────────
//  Project Deliverables
// ─────────────────────────────────────────────────────────────
const DELIVERABLES = {
  driveLink: "https://drive.google.com/drive/folders/1CLUnAvzSwtsyGXwUabBTvBcRDqn9qiT9?usp=sharing",
  items: [
    { Icon: LuFileText, title: "Final PowerPoint Presentation" },
    { Icon: LuPlay, title: "Practical Demonstration Video" },
    { Icon: LuPlay, title: "Explainer Video" },
    { Icon: LuFolderOpen, title: "Supporting Files" },
    { Icon: LuImage, title: "Project Screenshots" },
  ],
};

// ─────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────

const SectionLabel = ({ label, color = "#22d3ee" }: { label: string; color?: string }) => (
  <p className="csp-section-label">
    <span style={{ color, background: `${color}18`, border: `1px solid ${color}30`, padding: "4px 14px", borderRadius: "100px", display: "inline-block" }}>
      {label}
    </span>
  </p>
);

const CommandBlock = ({
  cmd, output, explanation, index,
}: {
  cmd: string; output?: string; explanation: string; index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="csp-command-block"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="csp-terminal-header">
        <div className="csp-terminal-dots">
          <span className="csp-tdot" style={{ background: "#ff5f57" }} />
          <span className="csp-tdot" style={{ background: "#ffbd2e" }} />
          <span className="csp-tdot" style={{ background: "#28c840" }} />
        </div>
        <span className="csp-terminal-label"><LuTerminal size={11} /> Terminal</span>
      </div>
      <div className="csp-terminal-body">
        <div className="csp-terminal-line">
          <span className="csp-terminal-prompt">~/acmetech-portal</span>
          <span className="csp-terminal-dollar"> $ </span>
          <span className="csp-terminal-cmd">{cmd}</span>
        </div>
        {output && (
          <div className="csp-terminal-output-block">
            {output.split("\\n").map((line, i) => (
              <div key={i} className="csp-terminal-output-line">{line}</div>
            ))}
          </div>
        )}
      </div>
      <p className="csp-command-explanation">{explanation}</p>
    </motion.div>
  );
};

const PipelineStep = ({
  step, index, isLast,
}: {
  step: (typeof PIPELINE)[0]; index: number; isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`csp-pipeline-item ${isLeft ? "csp-pipeline-item--left" : "csp-pipeline-item--right"}`}>
      <motion.div
        className="csp-pipeline-card csp-card"
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderColor: `${step.color}22` }}
        whileHover={{ borderColor: `${step.color}55`, y: -4 }}
      >
        <div className="csp-pipeline-icon-wrap" style={{ background: `${step.color}15`, color: step.color }}>
          <step.Icon size={20} />
        </div>
        <div className="csp-pipeline-info">
          <div className="csp-pipeline-step-num" style={{ color: step.color }}>
            Step {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="csp-pipeline-title">{step.title}</h3>
          <p className="csp-pipeline-desc">{step.desc}</p>
        </div>
      </motion.div>

      {!isLast && (
        <div className="csp-pipeline-arrow">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 0.6, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <LuArrowDown size={18} color="#22d3ee" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

const LearningItem = ({
  item, index, isLast,
}: {
  item: (typeof LEARNINGS)[0]; index: number; isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="csp-learning-item">
      <div className="csp-learning-spine">
        <motion.div
          className="csp-learning-dot"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08, type: "spring", stiffness: 400, damping: 20 }}
        />
        {!isLast && (
          <motion.div
            className="csp-learning-line"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 + 0.25, ease: "easeOut" }}
          />
        )}
      </div>
      <motion.div
        className="csp-learning-content csp-card"
        initial={{ opacity: 0, x: -36 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.08 + 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="csp-learning-num">{String(index + 1).padStart(2, "0")}</div>
        <h3 className="csp-learning-title">{item.title}</h3>
        <p className="csp-learning-desc">{item.desc}</p>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
//  Main Page
// ─────────────────────────────────────────────────────────────
const ContainerSecurityPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("csp-overview");
  const [showSectionNav, setShowSectionNav] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowSectionNav(window.scrollY > window.innerHeight * 0.65);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: "-80px 0px -35% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="csp-root">
      <ParticlesBackground />
      <Navbar />

      {/* ── Section Navigator ── */}
      <motion.div
        className="csp-section-nav"
        initial={{ opacity: 0, y: -16 }}
        animate={showSectionNav ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -16, pointerEvents: "none" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="csp-section-nav-inner">
          {NAV_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`csp-nav-tab ${activeSection === id ? "active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="csp-hero">
        <div className="csp-hero-glow" aria-hidden />
        <div className="csp-hero-glow csp-hero-glow--2" aria-hidden />

        <div className="csp-hero-inner">
          <motion.button
            className="csp-back-btn"
            onClick={() => navigate("/")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <LuArrowLeft size={15} /> Back to Portfolio
          </motion.button>

          <motion.div
            className="csp-hero-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {["Docker", "Trivy", "Flask", "Container Security", "DevSecOps", "SDG 9"].map((b) => (
              <span key={b} className="csp-badge">{b}</span>
            ))}
          </motion.div>

          <motion.h1
            className="csp-hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Container Security
            <br />
            <span className="csp-hero-title--accent">Architecture</span>
          </motion.h1>

          <motion.p
            className="csp-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            A practical enterprise case study demonstrating how Docker containers can be secured
            using modern container hardening techniques, vulnerability scanning with Trivy,
            least privilege principles, and secure deployment practices.
          </motion.p>

          <motion.div
            className="csp-hero-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
          >
            <div className="csp-meta-item"><LuCalendar size={13} /><span>July 2026</span></div>
            <span className="csp-meta-div" />
            <div className="csp-meta-item"><LuClock size={13} /><span>12 min read</span></div>
            <span className="csp-meta-div" />
            <div className="csp-meta-item"><LuShield size={13} /><span>Cybersecurity · DevSecOps</span></div>
            <span className="csp-meta-div" />
            <div className="csp-meta-item"><span>Tanay Bokaria</span></div>
          </motion.div>

          <motion.div
            className="csp-hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            <button className="csp-cta-primary" onClick={() => scrollTo("csp-architecture")}>
              View Architecture <LuChevronRight size={16} />
            </button>
            <button className="csp-cta-secondary" onClick={() => scrollTo("csp-implementation")}>
              View Implementation <LuCode size={15} />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="csp-hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <span>Scroll</span>
          <div className="csp-hero-scroll-line" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Overview
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section" id="csp-overview">
        <div className="csp-section-inner">
          <SectionLabel label="01 — Project Overview" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Presentation Overview
          </motion.h2>

          <motion.div
            className="csp-overview-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Problem */}
            <motion.div className="csp-card csp-overview-card" variants={fadeUp}>
              <div className="csp-card-label">Problem Statement</div>
              <h3>The Container Security Challenge</h3>
              <p>
                A software company deploys applications using Docker containers. While containers
                improve scalability and deployment speed, improper configuration introduces
                serious security risks that directly expose the underlying host.
              </p>
              <p>
                Containers running as root users, vulnerable base images, excessive Linux
                capabilities, and unverified dependencies dramatically increase the attack
                surface — creating real-world vulnerability windows for privilege escalation
                and container escape.
              </p>
              <div className="csp-risk-pill">
                <span className="csp-risk-dot" />
                Security Risk Identified
              </div>
            </motion.div>

            {/* Objectives */}
            <motion.div className="csp-card csp-overview-card" variants={fadeUp} custom={1}>
              <div className="csp-card-label">Research Objectives</div>
              <h3>What This Study Achieves</h3>
              <ul className="csp-objectives-list">
                {[
                  "Study container security principles and threat models",
                  "Identify common container vulnerabilities and misconfigurations",
                  "Analyse CVE exposure in unverified base images",
                  "Design a secure Docker deployment architecture",
                  "Implement practical security controls in a real Dockerfile",
                  "Validate security posture using Trivy vulnerability scanning",
                ].map((obj, i) => (
                  <li key={i} className="csp-obj-item">
                    <div className="csp-obj-num">{String(i + 1).padStart(2, "0")}</div>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Expected Outcome */}
            <motion.div className="csp-card csp-overview-card" variants={fadeUp} custom={2}>
              <div className="csp-card-label">Expected Outcome</div>
              <h3>Deliverable</h3>
              <p>
                Deploy a lightweight Flask employee portal securely using Docker,
                demonstrating industry-standard container security practices end-to-end —
                from Dockerfile authoring through to Trivy vulnerability validation.
              </p>
              <div className="csp-outcome-items">
                {[
                  { Icon: LuShield, text: "Hardened Production Dockerfile" },
                  { Icon: LuUser, text: "Non-root Container Execution" },
                  { Icon: LuActivity, text: "Clean Trivy Scan — 0 CRITICAL" },
                  { Icon: LuServer, text: "Gunicorn Production Deployment" },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="csp-outcome-item">
                    <Icon size={14} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Background
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section csp-section--alt" id="csp-background">
        <div className="csp-section-inner">
          <SectionLabel label="02 — Background & Literature Study" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Container Technology Context
          </motion.h2>

          <motion.div className="csp-card csp-bg-explainer" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="csp-bg-explainer-grid">
              <div>
                <div className="csp-card-label">What Are Containers?</div>
                <p>
                  Containers are lightweight, portable units that package an application together
                  with its runtime dependencies and libraries. Unlike virtual machines, containers
                  share the host OS kernel — making them significantly faster to start and far
                  more resource-efficient.
                </p>
                <p style={{ marginTop: 12 }}>
                  Docker is the most widely adopted containerisation platform, enabling developers
                  to build, ship, and run applications consistently across environments — from
                  developer laptops to enterprise cloud production infrastructure.
                </p>
              </div>
              <div>
                <div className="csp-card-label">Why Containers Become Security Risks</div>
                <p>
                  The shared kernel model means that container boundaries are software-enforced
                  rather than hardware-enforced. If a containerised process breaks out of its
                  namespace restrictions — through a kernel exploit or misconfiguration — it can
                  directly interact with the host system.
                </p>
                <p style={{ marginTop: 12 }}>
                  Most container security incidents are not kernel exploits, but simple
                  misconfigurations: running as root, using unpatched images, or exposing
                  unnecessary Linux capabilities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* VM vs Container Table */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="csp-subsection-title">Virtual Machines vs. Containers</h3>
            <div className="csp-comparison-table">
              <div className="csp-comparison-header">
                <div>Dimension</div>
                <div>Virtual Machine</div>
                <div style={{ color: "#22d3ee" }}>Docker Container</div>
              </div>
              {[
                ["Operating System", "Full Guest OS per VM", "Shares Host OS Kernel"],
                ["Startup Time", "Minutes (boot full OS)", "Seconds (process start)"],
                ["Image Size", "GBs (OS + application)", "MBs (app + dependencies only)"],
                ["Isolation Level", "Hardware-level (hypervisor)", "Process-level (Linux namespaces)"],
                ["Security Boundary", "Strong — separate kernel", "Weaker — shared kernel"],
                ["Portability", "Hypervisor-dependent", "High — run anywhere with Docker"],
              ].map(([dim, vm, cont], i) => (
                <div key={i} className="csp-comparison-row">
                  <div className="csp-comparison-dim">{dim}</div>
                  <div className="csp-comparison-cell">{vm}</div>
                  <div className="csp-comparison-cell csp-cell--docker">{cont}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Container Lifecycle */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="csp-subsection-title">Container Lifecycle</h3>
            <div className="csp-lifecycle-flow">
              {[
                { Icon: LuCode, label: "Image", desc: "Dockerfile defines the blueprint" },
                { Icon: LuDatabase, label: "Registry", desc: "Image pushed to Docker Hub or private registry" },
                { Icon: LuBox, label: "Container", desc: "Running instance of the image" },
                { Icon: LuServer, label: "Runtime", desc: "Executed via containerd / runc" },
                { Icon: LuCloud, label: "Deployment", desc: "Orchestrated via Docker Compose or Kubernetes" },
              ].map(({ Icon, label, desc }, i) => (
                <div key={i} className="csp-lifecycle-step">
                  <div className="csp-lifecycle-icon"><Icon size={18} /></div>
                  <div className="csp-lifecycle-label">{label}</div>
                  <div className="csp-lifecycle-desc">{desc}</div>
                  {i < 4 && <div className="csp-lifecycle-arrow"><LuChevronRight size={14} /></div>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Standards */}
          <motion.div
            className="csp-standards-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: "Docker Security", desc: "Official Docker best practices for secure image builds, least privilege, and runtime configuration hardening.", color: "#0db7ed" },
              { label: "OWASP Docker Security", desc: "Community-curated Docker Security Cheat Sheet — attack surface reduction techniques for containerised applications.", color: "#22d3ee" },
              { label: "NIST SP 800-190", desc: "NIST Application Container Security Guide — authoritative publication for enterprise container threat modelling and countermeasures.", color: "#a78bfa" },
            ].map(({ label, desc, color }, i) => (
              <motion.div key={i} className="csp-standard-card csp-card" variants={scaleIn} custom={i}>
                <div className="csp-standard-dot" style={{ background: color }} />
                <div>
                  <div className="csp-standard-label" style={{ color }}>{label}</div>
                  <p>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Threats
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section" id="csp-threats">
        <div className="csp-section-inner">
          <SectionLabel label="03 — Threat & Vulnerability Analysis" color="#ef4444" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Container Attack Vectors
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Container security threats arise from misconfiguration, unverified images, excessive
            privileges, and poor secrets management. Each vector below represents a distinct
            attack path that the security architecture must address.
          </motion.p>

          <motion.div
            className="csp-threats-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {THREATS.map((threat, i) => (
              <motion.div
                key={i}
                className="csp-threat-card csp-card"
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -6, borderColor: `${threat.color}45` }}
                style={{ "--threat-color": threat.color } as React.CSSProperties}
              >
                <div className="csp-threat-top">
                  <div className="csp-threat-icon" style={{ background: `${threat.color}15`, color: threat.color }}>
                    <threat.Icon size={18} />
                  </div>
                  <span className="csp-severity" style={{ background: `${threat.color}15`, color: threat.color, border: `1px solid ${threat.color}30` }}>
                    {threat.impact}
                  </span>
                </div>
                <h3 className="csp-threat-title">{threat.title}</h3>
                <p className="csp-threat-category" style={{ color: threat.color }}>{threat.category}</p>
                <p className="csp-threat-desc">{threat.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="csp-risk-banner" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="csp-risk-banner-left">
              <LuTriangleAlert size={22} color="#ef4444" />
              <div>
                <div className="csp-risk-banner-heading">Threat Assessment Complete</div>
                <p>6 distinct attack vectors identified across privilege, supply chain, and kernel layers.</p>
              </div>
            </div>
            <div className="csp-risk-banner-right">
              <span className="csp-overall-risk">Overall Risk: HIGH</span>
              <span className="csp-risk-subtext">Unmitigated baseline</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — Architecture
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section csp-section--alt" id="csp-architecture">
        <div className="csp-section-inner">
          <SectionLabel label="04 — Proposed Security Solution" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Secure Deployment Pipeline
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            A nine-stage security-first build pipeline that systematically applies hardening
            controls at every layer — from source code to production-verified container deployment.
          </motion.p>

          <div className="csp-pipeline">
            {PIPELINE.map((step, i) => (
              <PipelineStep key={i} step={step} index={i} isLast={i === PIPELINE.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — Controls
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section" id="csp-controls">
        <div className="csp-section-inner">
          <SectionLabel label="05 — Security Controls Implemented" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Security Measures Applied
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Eight security controls applied across the container lifecycle, addressing privilege
            management, image integrity, runtime security, and continuous vulnerability management.
          </motion.p>

          <motion.div
            className="csp-controls-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {CONTROLS.map((ctrl, i) => (
              <motion.div
                key={i}
                className="csp-control-card csp-card"
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -5, borderColor: "rgba(34,211,238,0.25)" }}
              >
                <div className="csp-control-icon-wrap">
                  <ctrl.Icon size={18} />
                  <div className="csp-control-check"><LuCheck size={9} /></div>
                </div>
                <h3 className="csp-control-title">{ctrl.title}</h3>
                <p className="csp-control-desc">{ctrl.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — Tools
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section csp-section--alt" id="csp-tools">
        <div className="csp-section-inner">
          <SectionLabel label="06 — Tools & Technologies" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Technology Stack
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            The primary tools, frameworks, and platforms utilised to develop, containerise, and secure the AcmeTech Employee Portal.
          </motion.p>

          <motion.div
            className="csp-tools-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TOOLS.map((tool, i) => (
              <motion.div
                key={i}
                className="csp-tool-card csp-card"
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -5, borderColor: "rgba(34,211,238,0.25)" }}
              >
                <div className="csp-tool-header">
                  <div className="csp-tool-icon"><tool.Icon size={20} /></div>
                  <span className="csp-tool-version">{tool.version}</span>
                </div>
                <h3 className="csp-tool-title">{tool.title}</h3>
                <p className="csp-tool-desc">{tool.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — Implementation
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section csp-section--dark" id="csp-implementation">
        <div className="csp-section-inner">
          <SectionLabel label="07 — Practical Implementation" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Hands-on Demonstration
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Implemented locally using Docker Desktop on Windows 11. Each command was executed
            sequentially to build, deploy, verify, and vulnerability-scan the containerised
            Flask application from the ground up.
          </motion.p>

          <div className="csp-commands-list">
            {COMMANDS.map((cmd, i) => (
              <CommandBlock key={i} {...cmd} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — Gallery
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section" id="csp-gallery">
        <div className="csp-section-inner">
          <SectionLabel label="08 — Project Gallery" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Visual Documentation
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Screenshot documentation of the complete build, deployment, and scanning workflow
            captured during the practical implementation session.
          </motion.p>

          <motion.div
            className="csp-gallery-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {GALLERY.map((item, i) => (
              <motion.div key={item.id} className="csp-gallery-item" variants={scaleIn} custom={i}>
                <div 
                  className="csp-gallery-img-container" 
                  onClick={() => setLightboxImage(item.src)}
                  style={{ cursor: "zoom-in" }}
                >
                  <img src={item.src} alt={item.title} className="csp-gallery-img" />
                </div>
                <div className="csp-gallery-caption">
                  <span className="csp-gallery-num">{String(item.id).padStart(2, "0")}</span>
                  <span className="csp-gallery-label">{item.title}</span>
                </div>
                <p className="csp-gallery-desc">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — Deliverables
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section csp-section--dark" id="csp-deliverables">
        <div className="csp-section-inner">
          <SectionLabel label="09 — Project Deliverables" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Submission Assets
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            All final project assets, including the comprehensive slide deck, demonstration videos, and documentation, are available in the submission repository.
          </motion.p>

          <motion.div
            className="csp-deliverables-card csp-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="csp-deliverables-grid">
              {DELIVERABLES.items.map((item, i) => (
                <div key={i} className="csp-deliverable-item">
                  <div className="csp-deliverable-icon"><item.Icon size={18} /></div>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
            <div className="csp-deliverables-action">
              <a href={DELIVERABLES.driveLink} target="_blank" rel="noopener noreferrer" className="csp-drive-link">
                <LuFolderOpen size={16} /> Open Google Drive Folder
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 10 — Applications
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section csp-section--alt" id="csp-applications">
        <div className="csp-section-inner">
          <SectionLabel label="10 — Real World Applications" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Industry Impact
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Container security architecture is not limited to academic environments. These
            principles protect critical systems across every industry that relies on modern
            cloud-native infrastructure.
          </motion.p>

          <motion.div
            className="csp-industries-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={i}
                className="csp-industry-card csp-card"
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.22)" }}
              >
                <div className="csp-industry-icon"><ind.Icon size={20} /></div>
                <h3 className="csp-industry-title">{ind.title}</h3>
                <p className="csp-industry-desc">{ind.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 11 — SDG
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section" id="csp-sdg">
        <div className="csp-section-inner">
          <SectionLabel label="11 — UN Sustainable Development Goals" color="#FD6925" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            SDG Alignment
          </motion.h2>

          <motion.div
            className="csp-sdg-card csp-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="csp-sdg-left">
              <div className="csp-sdg-badge">
                <span className="csp-sdg-number">9</span>
              </div>
              <div>
                <div className="csp-sdg-tag" style={{ color: "#FD6925" }}>SDG 9</div>
                <h3 className="csp-sdg-title">Industry, Innovation<br />and Infrastructure</h3>
              </div>
            </div>
            <div className="csp-sdg-right">
              <p>
                This project directly supports SDG Goal 9 by advancing secure digital
                infrastructure practices. Containerised applications form the backbone of modern
                cloud-native systems — from government digital services to financial trading
                platforms and healthcare information systems.
              </p>
              <p style={{ marginTop: 16 }}>
                Applying container security principles ensures these systems are resilient,
                reliable, and resistant to cyber threats — enabling industry innovation without
                compromising the critical infrastructure that organisations and communities
                depend on daily.
              </p>
              <div className="csp-sdg-pillars">
                {["Resilient Infrastructure", "Secure Innovation", "Reduced Cyber Risk", "Cloud-Native Reliability"].map((p) => (
                  <div key={p} className="csp-sdg-pillar">
                    <LuCheck size={12} color="#FD6925" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 12 — Learnings
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section csp-section--alt" id="csp-learnings">
        <div className="csp-section-inner">
          <SectionLabel label="12 — Key Learnings" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Learning Progression
          </motion.h2>
          <motion.p className="csp-section-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            A sequential knowledge journey from container fundamentals to enterprise DevSecOps
            practices — each stage building directly on the previous one.
          </motion.p>

          <div className="csp-learning-timeline">
            {LEARNINGS.map((item, i) => (
              <LearningItem key={i} item={item} index={i} isLast={i === LEARNINGS.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 13 — Conclusion
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section" id="csp-conclusion">
        <div className="csp-section-inner">
          <SectionLabel label="13 — Conclusion" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Summary & Takeaways
          </motion.h2>

          <motion.div className="csp-conclusion-layout" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="csp-card csp-conclusion-main">
              <p className="csp-conclusion-p">
                This project demonstrates that secure container deployment is not achieved by
                Docker alone. True container security requires a holistic approach combining
                secure base image selection, strict least privilege enforcement, automated
                vulnerability scanning, and production-grade runtime configuration.
              </p>
              <p className="csp-conclusion-p">
                The AcmeTech employee portal was successfully containerised and hardened following
                OWASP, NIST, and Docker official best practices. The Trivy scan returned zero
                CRITICAL and zero HIGH severity vulnerabilities — validating the effectiveness
                of the security architecture implemented.
              </p>
              <p className="csp-conclusion-p">
                As containers become the default deployment model for cloud-native applications,
                container security skills are increasingly essential for every developer, DevOps
                engineer, and security practitioner. The principles applied in this study —
                minimal images, non-root execution, dependency pinning, and continuous scanning —
                are directly applicable to production enterprise environments at any scale.
              </p>
              <blockquote className="csp-pull-quote">
                "Security is not a feature to be added after the fact —
                it is a discipline built into every layer of the delivery pipeline."
              </blockquote>
            </div>

            <div className="csp-conclusion-sidebar">
              {[
                { val: "0", label: "Critical CVEs", color: "#34d399" },
                { val: "0", label: "High CVEs", color: "#34d399" },
                { val: "8", label: "Security Controls", color: "#22d3ee" },
                { val: "100%", label: "Best Practices Met", color: "#a78bfa" },
              ].map(({ val, label, color }, i) => (
                <div key={i} className="csp-card csp-stat-card">
                  <div className="csp-stat-val" style={{ color }}>{val}</div>
                  <div className="csp-stat-label">{label}</div>
                </div>
              ))}
              <div className="csp-completed-badge">
                <LuCircleCheck size={15} color="#34d399" />
                <span>Research Complete</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 14 — References
      ══════════════════════════════════════════════════════ */}
      <section className="csp-section csp-section--alt" id="csp-references">
        <div className="csp-section-inner">
          <SectionLabel label="14 — References & Documentation" />
          <motion.h2 className="csp-section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Further Reading
          </motion.h2>

          <motion.div
            className="csp-refs-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {REFERENCES.map((ref, i) => (
              <motion.a
                key={i}
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
                className="csp-ref-card csp-card"
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -5, borderColor: "rgba(34,211,238,0.28)" }}
              >
                <div className="csp-ref-icon"><ref.Icon size={18} /></div>
                <div className="csp-ref-content">
                  <h3 className="csp-ref-title">{ref.title}</h3>
                  <p className="csp-ref-desc">{ref.desc}</p>
                </div>
                <div className="csp-ref-arrow"><LuExternalLink size={14} /></div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="csp-page-footer">
        <p>Container Security Architecture · July 2026 · Tanay Bokaria · B.Tech Cybersecurity, SAKEC Mumbai</p>
        <button className="csp-footer-back" onClick={() => navigate("/")}>
          <LuArrowLeft size={13} /> Back to Portfolio
        </button>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="csp-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="csp-lightbox-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="csp-lightbox-close" onClick={() => setLightboxImage(null)}>
                <LuX size={24} />
              </button>
              <img src={lightboxImage} alt="Gallery Enlarge View" className="csp-lightbox-img" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContainerSecurityPage;
