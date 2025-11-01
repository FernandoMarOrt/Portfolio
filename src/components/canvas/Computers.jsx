import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useMemo, memo, useState } from "react";

// Pre-cargar el modelo (solo una vez)
useGLTF.preload("./desktop_pc/spaceman.glb");

const Computers = memo(({ scale, position, rotationX, rotationY }) => {
  const spacemanRef = useRef();
  const { scene, animations } = useGLTF("./desktop_pc/spaceman.glb");
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    if (actions?.["Idle"]) {
      actions["Idle"].play();
    }
  }, [actions]);

  // Memoizar la rotación con validación contra NaN y valores extremos
  const rotation = useMemo(() => [
    isNaN(rotationX) ? 0 : rotationX,
    2.2 + (isNaN(rotationY) ? 0 : rotationY),
    0
  ], [rotationX, rotationY]);

  return (
    <mesh 
      ref={spacemanRef} 
      position={position} 
      scale={scale} 
      rotation={rotation}
    >
      <primitive object={scene} />
    </mesh>
  );
});

Computers.displayName = 'Computers';

const ComputersCanvas = ({ scrollContainer }) => {
  const containerRef = scrollContainer || useRef(null);
  const animationFrameRef = useRef(null);
  
  // Estado para rotaciones (necesita re-render para animar)
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  
  // Estado para escala y posición (cambian raramente)
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -1.5, 0]);

  // Función de scroll optimizada con límites y reseteo
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        animationFrameRef.current = requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollTop = Math.max(0, containerRef.current.scrollTop); // Nunca negativo
            const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
            
            // Si estamos en el tope, resetear completamente
            if (scrollTop <= 0) {
              setRotationX(0);
              setRotationY(0);
            } else {
              // Calcular porcentaje de scroll (0 a 1)
              const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
              
              // Aplicar rotación con límites máximos (evita rotaciones extremas)
              const maxRotationX = 1.5; // ~86 grados máximo
              const maxRotationY = 1.8; // ~103 grados máximo
              
              const newRotationX = Math.min(scrollPercent * -1.2, maxRotationX);
              const newRotationY = Math.min(scrollPercent * -1.5, maxRotationY);
              
              setRotationX(newRotationX);
              setRotationY(newRotationY);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScale([0.7, 0.7, 0.7]);
        setPosition([0, -1.2, 0]);
      } else if (width < 1024) {
        setScale([0.9, 0.9, 0.9]);
        setPosition([0.2, -1.2, 0]);
      } else if (width < 1280) {
        setScale([1, 1, 1]);
        setPosition([0.2, -1.2, 0]);
      } else if (width < 1536) {
        setScale([1.1, 1.1, 1.1]);
        setPosition([0.2, -1.2, 0]);
      } else {
        setScale([1.2, 1.2, 1.2]);
        setPosition([0.2, -1.2, 0]);
      }
    };

    // Debounce para resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateScale, 150);
    };

    updateScale(); // Inicial

    const scrollElement = containerRef.current || window;
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [containerRef]);

  // Configuración de Canvas memoizada
  const canvasConfig = useMemo(() => ({
    camera: { 
      near: 0.1, 
      far: 100,
      fov: 50
    },
    gl: { 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      preserveDrawingBuffer: false
    },
    dpr: [1, 2],
    shadows: false,
    performance: {
      min: 0.5
    }
  }), []);

  // Luces optimizadas y memoizadas
  const Lights = memo(() => (
    <>
      <directionalLight position={[1, 1, 1]} intensity={2} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 5, 10]} intensity={2} />
      <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
      <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
    </>
  ));
  
  Lights.displayName = 'Lights';

  return (
    <Canvas 
      className="w-full h-screen bg-transparent"
      style={{ 
        zIndex: 10,
        position: 'relative'
      }}
      {...canvasConfig}
    >
      <Suspense fallback={null}>
        <Lights />
        <Computers 
          rotationX={rotationX} 
          rotationY={rotationY} 
          scale={scale} 
          position={position}
        />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;