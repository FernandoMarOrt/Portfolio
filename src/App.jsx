import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import ScrollProgress from "./components/ScrollProgress";

const AppContent = () => {
  const { showStars } = useTheme();

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <ScrollProgress />
        {showStars && <StarsCanvas />}
        
        <div className='main-content'>
          <div className='relative'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Tech />
          <Experience />
          <Works />
          <div className='relative z-0'>
            <Contact />
          </div>
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
