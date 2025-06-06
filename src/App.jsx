import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
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
          {/* <Feedbacks /> */}
          <div className='relative z-0'>
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
