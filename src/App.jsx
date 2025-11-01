import { BrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";  
import ScrollProgress from "./components/ScrollProgress";
import StarryBackground from "./components/StarryBackground";

// Lazy loading optimizado
const About = lazy(() => import("./components/About"));
const Tech = lazy(() => import("./components/Tech"));
const Experience = lazy(() => import("./components/Experience"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));
const StarsManager = lazy(() => import("./components/StarsManager"));

// Componente de loading elegante
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-t-[#f55f17] border-r-[#ff914d] border-b-transparent border-l-transparent rounded-full animate-spin" />
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-transparent border-r-transparent border-b-[#f55f17] border-l-[#ff914d] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
    </div>
  </div>
);

const AppContent = () => {
  const { showStars } = useTheme();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  // Resize optimizado con debounce
  React.useEffect(() => {
    let resizeTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150); // 150ms de debounce
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Preload inteligente de secciones
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Añadir clase para animaciones si es necesario
            entry.target.classList.add('section-visible');
          }
        });
      },
      { 
        rootMargin: '100px', // Detectar 100px antes
        threshold: 0.1 
      }
    );

    // Observar todas las secciones después del Hero
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <ScrollProgress />
        
        {/* Estrellas 3D con Suspense */}
        <Suspense fallback={null}>
          {!isMobile && showStars && <StarsManager key={`stars-${showStars}`} />}
        </Suspense>
        
        {/* Fondo estrellado CSS */}
        <StarryBackground isActive={isMobile || !showStars} starCount={180} />
        
        <div className='main-content'>
          {/* Hero y Navbar sin lazy (críticos para FCP) */}
          <div className='relative'>
            <Navbar />
            <Hero />
          </div>
          
          {/* Secciones con lazy loading individual */}
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Tech />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Works />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <div className='relative z-0'>
              <Contact />
            </div>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;