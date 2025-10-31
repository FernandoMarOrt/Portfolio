import { useState, useRef, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const Stars = ({ performanceLevel = 'medium' }) => {
  const ref = useRef();
  
  // Memoize star positions - CRÍTICO para evitar recálculos
  const sphere = useMemo(() => {
    const starCounts = {
      low: 1000,
      medium: 2500,  // Reducido de 3000
      high: 4000     // Reducido de 5000
    };
    
    const starCount = starCounts[performanceLevel] || starCounts.medium;
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const sinPhi = Math.sin(phi);
      positions[i * 3] = radius * sinPhi * Math.cos(theta);
      positions[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [performanceLevel]); // Solo recalcula si cambia performanceLevel

  // Animación optimizada
  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const speed = performanceLevel === 'low' ? 0.5 : 1;
    ref.current.rotation.x -= delta * 0.1 * speed;
    ref.current.rotation.y -= delta * 0.066 * speed;
  });

  // Configuración de material memoizada
  const materialSize = useMemo(() => {
    return performanceLevel === 'low' ? 0.001 : 0.002;
  }, [performanceLevel]);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points 
        ref={ref} 
        positions={sphere} 
        stride={3} 
        frustumCulled={true} // Cambiado a true para mejor performance
      >
        <PointMaterial
          transparent
          color='#f272c8'
          size={materialSize}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = ({ performanceLevel = 'medium' }) => {
  // Detectar rendimiento automáticamente
  const [autoPerformance, setAutoPerformance] = useState(performanceLevel);

  useEffect(() => {
    // Detectar dispositivo móvil o bajo rendimiento
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const hasSlowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (isMobile || hasLowMemory || hasSlowCPU) {
      setAutoPerformance('low');
    }
  }, []);

  // Configuración de Canvas memoizada
  const canvasConfig = useMemo(() => ({
    camera: { position: [0, 0, 1], fov: 45 },
    dpr: autoPerformance === 'low' ? [1, 1.5] : [1, 2], // Limitar pixel ratio
    gl: {
      alpha: true,
      antialias: autoPerformance !== 'low',
      powerPreference: autoPerformance === 'low' ? 'low-power' : 'default',
      preserveDrawingBuffer: false,
      stencil: false,
      depth: true
    },
    frameloop: 'always', // Mantener animación continua
    performance: {
      min: 0.5 // FPS mínimo antes de reducir calidad
    }
  }), [autoPerformance]);

  return (
    <div className='stars-canvas' style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas {...canvasConfig}>
        <Suspense fallback={null}>
          <Stars performanceLevel={autoPerformance} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;