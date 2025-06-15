import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className='relative z-0 bg-primary'>
          <CustomCursor />
          <ScrollProgress />
          <StarsCanvas />
          
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
    </ThemeProvider>
  );
}

export default App;
