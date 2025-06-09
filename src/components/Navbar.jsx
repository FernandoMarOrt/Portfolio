import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para controlar el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (toggle) {
      // Bloquear scroll cuando el menú está abierto
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restaurar scroll cuando el menú se cierra
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup: restaurar scroll cuando el componente se desmonta
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [toggle]);

  return (
    <nav
    className={`${
      styles.paddingX
    } w-full flex items-center py-5 fixed top-0 z-20 navbar-mobile ${
      scrolled ? "bg-primary" : "bg-transparent"
    }`}
  >  
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto '>
        <Link
          to='/'
          className='flex items-center gap-2 min-w-0 flex-shrink-0'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 xs:w-8 xs:h-8 xxs:w-7 xxs:h-7 object-contain flex-shrink-0' />
          <p className='text-white text-[18px] xs:text-[16px] xxs:text-[15px] font-bold cursor-pointer flex flex-wrap'>
            <span className="whitespace-nowrap">Fernando</span>&nbsp;
            <span className='sm:inline hidden whitespace-nowrap'>| Full stack developer</span>
            <span className='sm:hidden xs:inline hidden whitespace-nowrap'>| Dev</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-6 lg:gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className="text-white hover:text-[#915EFF] text-[18px] md:text-[16px] lg:text-[18px] font-medium cursor-pointer transition-colors duration-200"
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
         
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            className={`mobile-touch-target flex items-center justify-center p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              toggle 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 space-button-glow' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/30'
            }`}
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? "Cerrar menú" : "Abrir menú"}
          >
            <img
              src={toggle ? close : menu}
              alt='menu'
              className={`w-[28px] h-[28px] xs:w-[24px] xs:h-[24px] object-contain transition-transform duration-300 ${
                toggle ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          {/* Full Screen Mobile Menu */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } fixed inset-0 z-50 space-fullscreen-menu overflow-hidden`}
          >
            {/* Background overlay with stars effect */}
            <div 
              className="absolute inset-0 space-fullscreen-overlay"
              onClick={() => setToggle(false)}
            ></div>
            
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-[60] text-white space-close-button hover:text-purple-400 transition-colors duration-300 p-2 rounded-full mobile-touch-target"
              onClick={() => setToggle(false)}
              aria-label="Cerrar menú"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu content */}
            <div 
              className="relative z-50 flex flex-col items-center justify-start pt-20 w-full h-full px-6 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logo/Title */}
              <div className="mb-12 xs:mb-10 text-center space-fullscreen-logo">
                <h2 className="text-white text-4xl xs:text-3xl font-bold mb-3 text-space-glow">Fernando</h2>
                <p className="text-secondary text-lg xs:text-base font-light tracking-wide">Full Stack Developer</p>
                <div className="mt-4 w-24 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
              </div>

              {/* Navigation links */}
              <ul className='list-none flex flex-col items-center gap-6 xs:gap-5 space-fullscreen-nav'>
                {navLinks.map((nav, index) => (
                  <li
                    key={nav.id}
                    className="space-fullscreen-nav-item"
                  >
                    <a
                      href={`#${nav.id}`}
                      className={`space-nav-link font-poppins font-medium text-3xl xs:text-2xl transition-all duration-300 py-2 px-6 rounded-lg ${
                        active === nav.title ? "text-white space-nav-link active" : "text-secondary hover:text-white"
                      }`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                    >
                      {nav.title}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Footer section */}
              <div className="mt-12 xs:mt-10 text-center space-fullscreen-footer">
                <p className="text-secondary text-sm font-light tracking-widest">EXPLORE THE GALAXY OF CODE</p>
                <div className="mt-4 flex justify-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
