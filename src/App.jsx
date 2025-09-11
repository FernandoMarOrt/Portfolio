import { BrowserRouter } from "react-router-dom";

import React, { Suspense, lazy } from "react";
import { Hero, Navbar } from "./components";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import ScrollProgress from "./components/ScrollProgress";
import StarryBackground from "./components/StarryBackground";

const About = lazy(() => import("./components/About"));
const Tech = lazy(() => import("./components/Tech"));
const Experience = lazy(() => import("./components/Experience"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));
const StarsManager = lazy(() => import("./components/StarsManager"));

const AppContent = () => {
  const { showStars } = useTheme();

  // Detectar si es móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   window.innerWidth < 768 ||
                   ('ontouchstart' in window);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <ScrollProgress />
        <Suspense fallback={null}>
          {/* Solo mostrar estrellas 3D en desktop */}
          {!isMobile && showStars && <StarsManager key={`stars-${showStars}`} />}
        </Suspense>
        {/* Fondo estrellado CSS: en móvil siempre, en desktop cuando las estrellas están desactivadas */}
        <StarryBackground isActive={isMobile || !showStars} starCount={180} />
        <div className='main-content'>
          <div className='relative'>
            <Navbar />
            <Hero />
          </div>
          <Suspense fallback={null}>
            <About />
            <Tech />
            <Experience />
            <Works />
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
