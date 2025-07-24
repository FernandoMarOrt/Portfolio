import { BrowserRouter } from "react-router-dom";

import React, { Suspense, lazy } from "react";
import { Hero, Navbar } from "./components";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import ScrollProgress from "./components/ScrollProgress";

const About = lazy(() => import("./components/About"));
const Tech = lazy(() => import("./components/Tech"));
const Experience = lazy(() => import("./components/Experience"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const AppContent = () => {
  const { showStars } = useTheme();

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <ScrollProgress />
        <Suspense fallback={null}>
          {showStars && <StarsCanvas />}
        </Suspense>
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
