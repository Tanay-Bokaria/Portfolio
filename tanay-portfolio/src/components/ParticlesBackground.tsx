import { useEffect, useRef } from "react";
import { isMobile } from "./utils/responsive";

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      angleSpeed: number;
      shape: "circle" | "square" | "triangle";
      baseX: number;
      opacity: number;
      color: string;
      parallaxFactor: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 4 + 2; 
        
        this.parallaxFactor = this.size / 6; 
        
        this.speedY = (Math.random() * 0.9 + 0.3) * this.parallaxFactor; 
        
        this.baseX = this.x;
        this.speedX = 0;
        this.angle = Math.random() * 360;
        this.angleSpeed = Math.random() * 0.02 - 0.01;
        
        const shapes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        this.opacity = (Math.random() * 0.35 + 0.15) * this.parallaxFactor; 
        
        const isTeal = Math.random() > 0.5;
        this.color = isTeal ? `rgba(20, 184, 166, ${this.opacity})` : `rgba(255, 255, 255, ${this.opacity})`;
      }

      update() {
        this.y -= this.speedY;

        this.angle += this.angleSpeed;
        this.x = this.baseX + Math.sin(this.angle) * 20 * this.parallaxFactor;

        if (this.y + this.size < 0) {
          this.y = canvas!.height + this.size;
          this.x = Math.random() * canvas!.width;
          this.baseX = this.x;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = isMobile() ? 60 : 120;
        if (distance < interactionRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (interactionRadius - distance) / interactionRadius;
          
          this.x -= forceDirectionX * force * (isMobile() ? 1 : 2);
          this.y -= forceDirectionY * force * (isMobile() ? 1 : 2);
          this.baseX -= forceDirectionX * force * (isMobile() ? 1 : 2);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        if (this.shape === "circle") {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.shape === "square") {
          ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
          ctx.fill();
        } else if (this.shape === "triangle") {
          ctx.moveTo(this.x, this.y - this.size);
          ctx.lineTo(this.x - this.size, this.y + this.size);
          ctx.lineTo(this.x + this.size, this.y + this.size);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    const init = () => {
      particlesArray = [];
      const mobile = isMobile();
      const numberOfParticles = mobile ? 8 : Math.min(Math.floor(window.innerWidth / 60), 20);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    if (canvas) {
      observer.observe(canvas);
    }

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default ParticlesBackground;
