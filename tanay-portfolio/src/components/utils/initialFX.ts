import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  const mainElements = document.getElementsByTagName("main");
  if (mainElements.length > 0) {
    mainElements[0].classList.add("main-active");
  }
  
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // Animate Landing
  const landingTargets = ".landing-intro h2, .landing-intro h1, .landing-info h3, .landing-info-h2";
  if (document.querySelectorAll(landingTargets).length > 0) {
    gsap.fromTo(
      landingTargets,
      { opacity: 0, y: 50, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.out",
        y: 0,
        stagger: 0.1,
        delay: 0.3,
      }
    );
  }

  // Animate UI elements
  const uiTargets = [".header", ".icons-section", ".nav-fade"];
  const existingUiTargets = uiTargets.filter(selector => document.querySelector(selector));
  if (existingUiTargets.length > 0) {
    gsap.fromTo(
      existingUiTargets,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0.1,
      }
    );
  }
}
