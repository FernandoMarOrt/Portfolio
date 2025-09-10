import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import withWebGLFallback from "../../hoc/withWebGLFallback";
import { StarsFallback } from "../FallbackCanvas";

const Stars = ({ performanceLevel = 'medium', ...props }) => {
  const ref = useRef();
  
  // Optimize star count based on performance level
  const starCounts = {
    low: 1000,
    medium: 3000,
    high: 5000
  };
  
  const starCount = starCounts[performanceLevel] || starCounts.medium;
  
  const [sphere] = useState(() => {
    const positions = new Float32Array(starCount * 3);
    
    // Generate random positions within a sphere
    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() * 1.2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Ensure no NaN values
      positions[i * 3] = isNaN(x) ? 0 : x;
      positions[i * 3 + 1] = isNaN(y) ? 0 : y;
      positions[i * 3 + 2] = isNaN(z) ? 0 : z;
    }
    
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      // Reduce animation intensity for low performance
      const rotationMultiplier = performanceLevel === 'low' ? 0.5 : 1;
      ref.current.rotation.x -= (delta / 10) * rotationMultiplier;
      ref.current.rotation.y -= (delta / 15) * rotationMultiplier;
    }
  });

  // Cleanup function for component unmount
  useEffect(() => {
    return () => {
      // Force cleanup of any references
      if (ref.current) {
        ref.current = null;
      }
    };
  }, []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={performanceLevel === 'low' ? 0.001 : 0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = ({ performanceLevel = 'medium', gl }) => {
  const [canvasKey, setCanvasKey] = useState(0);

  // Force re-render on mount to ensure clean state
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanvasKey(prev => prev + 1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='stars-canvas'>
      <Canvas 
        key={canvasKey}
        camera={{ position: [0, 0, 1] }}
        gl={{
          alpha: true,
          antialias: performanceLevel !== 'low',
          powerPreference: performanceLevel === 'low' ? 'low-power' : 'high-performance',
          preserveDrawingBuffer: false,
          ...gl
        }}
        onCreated={({ gl: renderer }) => {
          if (performanceLevel === 'low') {
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          }
          
          // Clear any previous WebGL state
          renderer.clear();
        }}
      >
        <Suspense fallback={null}>
          <Stars performanceLevel={performanceLevel} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

// Apply WebGL fallback HOC
const EnhancedStarsCanvas = withWebGLFallback(
  StarsCanvas, 
  StarsFallback,
  {
    enablePerformanceMode: true,
    enableErrorRecovery: true,
    showDebugInfo: process.env.NODE_ENV === 'development'
  }
);

export default EnhancedStarsCanvas;
