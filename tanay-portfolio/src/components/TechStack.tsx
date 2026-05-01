import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerformanceMonitor } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import { isMobile } from "./utils/responsive";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/javascript.webp",
  "/images/node2.webp",
  "/images/css.jpg",
  "/images/git.jpg",
  "/images/html.jpg",
  "/images/js.jpg",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

// Higher segment count for perfectly smooth spheres
const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);

// 14 bodies
const spheres = [...Array(14)].map(() => ({
  scale: [1.2, 1.5, 1.3, 1.6, 1.4][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.5}
      angularDamping={0.5}
      friction={0.1}
      restitution={0.8}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
      restitution={1.1}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [dpr, setDpr] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onEnter = () => setIsActive(true);
    const onLeave = () => setIsActive(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setIsActive(false); },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      observer.disconnect();
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  const mobile = isMobile();

  return (
    <div
      ref={sectionRef}
      className="techstack section-container"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px', padding: '150px 0', cursor: 'crosshair' }}
    >

      <div style={{ width: '100%', zIndex: 10, padding: '0 8vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', marginBottom: '40px', fontWeight: 800, color: '#fff', textAlign: 'center', textTransform: 'uppercase', fontStyle: 'italic' }}>My <span style={{ color: 'var(--accentColor)' }}>Tech Stack</span></h2>

        <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--accentColor)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400, marginBottom: '10px', textAlign: 'center' }}>Technologies I work with</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {['React', 'JavaScript', 'TypeScript', 'Antigravity', 'Cursor', 'Three.js', 'HTML', 'CSS', 'Git'].map(tech => (
              <span key={tech} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', color: '#fff', fontSize: '15px' }}>{tech}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--accentColor)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400, marginBottom: '10px', textAlign: 'center' }}>Currently exploring</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {['Node.js', 'Backend development', 'APIs', 'Performance optimization'].map(tech => (
              <span key={tech} style={{ padding: '8px 16px', background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '20px', color: '#eae5ec', fontSize: '15px' }}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: mobile ? 'auto' : '500px', position: 'relative', marginTop: mobile ? '40px' : '0' }}>
        {mobile ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
            gap: '15px',
            padding: '20px',
            maxWidth: '450px',
            margin: '0 auto'
          }}>
            {imageUrls.map((url, idx) => (
              <div key={idx} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                animation: `fadeIn 0.5s ease forwards ${idx * 0.1}s`,
                opacity: 0
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)'
                }}>
                  <img src={url} alt="tech icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
              <Canvas
                shadows={false}
                frameloop={isActive ? "always" : "demand"}
                dpr={dpr}
                gl={{ alpha: true, stencil: false, depth: true, antialias: false, powerPreference: "high-performance" }}
                camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
                onCreated={(state) => { state.gl.toneMappingExposure = 1.2; }}
                className="tech-canvas"
              >
                <PerformanceMonitor onDecline={() => setDpr(0.75)} onIncline={() => setDpr(Math.min(window.devicePixelRatio, 1.5))} />
                <ambientLight intensity={1.5} />
                <Physics gravity={[0, 0, 0]} paused={!isActive}>
                  <Pointer isActive={isActive} />
                  {spheres.map((props, i) => (
                    <SphereGeo key={i} {...props} material={materials[i % materials.length]} isActive={isActive} />
                  ))}
                </Physics>
                <Environment files="/models/char_enviorment.hdr" environmentIntensity={0.5} />
              </Canvas>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TechStack;
