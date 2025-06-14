import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import CanvasLoader from "../Loader";

const Computers = ({ scale, position }) => {
  const spacemanRef = useRef();
  const { scene, animations } = useGLTF("./desktop_pc/spaceman.glb");
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    actions["Idle"].play();
  }, [actions]);

  return (
    <mesh ref={spacemanRef} position={position} scale={scale} rotation={[0, 2.2, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};

const ComputersCanvas = ({ scrollContainer }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -0.7, 0]);

  const containerRef = scrollContainer || { current: document.createElement('div') };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const rotationXValue = scrollTop * -0.0006;
        const rotationYValue = scrollTop * -0.00075;
        setRotationX(rotationXValue);
        setRotationY(rotationYValue);
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale([1, 1, 1]);
        setPosition([0, -1.5, 0]);
      } else if (window.innerWidth < 1024) {
        setScale([1.5, 1.5, 1.5]); // Ajustado en proporción
        setPosition([0.2, -1.5, 0]);
      } else if (window.innerWidth < 1280) {
        setScale([1.75, 1.75, 1.75]); // Ajustado en proporción
        setPosition([0.2, -1.5, 0]);
      } else if (window.innerWidth < 1536) {
        setScale([1.85, 1.85, 1.85]); // Ajustado en proporción
        setPosition([0.2, -1.5, 0]);
      } else {
        setScale([2, 2, 2]); // Valor base (para pantallas mayores a 1536px)
        setPosition([0.2, -1.5, 0]);
      }
    };


    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollContainer]);

  return (
    <Canvas 
      className={`w-full h-screen bg-transparent`}
      camera={{ near: 0.1, far: 1000 }}
      style={{ 
        zIndex: 10,
        position: 'relative'
      }}
      gl={{ alpha: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 5, 10]} intensity={2} />
        <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
        <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

        <Computers rotationX={rotationX} rotationY={rotationY} scale={scale} position={position} />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;