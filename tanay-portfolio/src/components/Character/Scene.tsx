import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  const [isContextLost, setIsContextLost] = useState(false);

  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      // Handle WebGL Context Loss
      renderer.domElement.addEventListener(
        "webglcontextlost",
        (event) => {
          event.preventDefault();
          console.warn("THREE.WebGLRenderer: Context Lost");
          setIsContextLost(true);
        },
        false
      );

      renderer.domElement.addEventListener(
        "webglcontextrestored",
        () => {
          console.log("THREE.WebGLRenderer: Context Restored");
          setIsContextLost(false);
        },
        false
      );

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let isMounted = true;
      loadCharacter().then((gltf) => {
        if (!isMounted) return;
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            if (!isMounted) return;
            setTimeout(() => {
              if (!isMounted) return;
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          const onResize = () => handleResize(renderer, camera, canvasDiv, character);
          window.addEventListener("resize", onResize);

          if (canvasDiv.current) {
            (canvasDiv.current as any)._onResize = onResize;
          }
        }
      }).catch((e) => {
        console.error("3D model failed to load:", e);
        if (isMounted) progress.clear();
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      let animationFrameId: number;
      let isVisible = true;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        },
        { threshold: 0.1 }
      );

      if (canvasDiv.current) {
        observer.observe(canvasDiv.current);
      }

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        if (!isVisible) return;

        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        isMounted = false;
        progress.abort();
        cancelAnimationFrame(animationFrameId);
        clearTimeout(debounce);
        observer.disconnect();

        scene.traverse((object: any) => {
          if (object.isMesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((mat: any) => mat.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });

        scene.clear();
        renderer.dispose();
        if (canvasDiv.current && (canvasDiv.current as any)._onResize) {
          window.removeEventListener("resize", (canvasDiv.current as any)._onResize);
        }
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="character-container">
        {isContextLost ? (
          <div className="webgl-fallback-ui" style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            height: "100%", width: "100%", color: "white", zIndex: 10
          }}>
            <h3 style={{ marginBottom: "10px", color: "#5eead4" }}>3D Scene Paused</h3>
            <p style={{ marginBottom: "20px", textAlign: "center", fontSize: "14px" }}>
              Your browser suspended the 3D graphics to save memory.
            </p>
            <button
              onClick={handleReload}
              style={{
                padding: "10px 20px", background: "#5eead4", color: "#000",
                border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold"
              }}
            >
              Reload 3D Scene
            </button>
          </div>
        ) : (
          <div className="character-model" ref={canvasDiv}>
            <div className="character-rim"></div>
            <div className="character-hover" ref={hoverDivRef}></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Scene;
