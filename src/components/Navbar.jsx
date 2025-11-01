import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks } from "../constants";
import { generalImages } from "../constants/index.js";
import { useTheme } from "../contexts/ThemeContext";

// Componente de item de navegación desktop
const NavItem = ({ nav, active, setActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
    >
      <a
        href={`#${nav.id}`}
        className={`relative text-[18px] font-medium cursor-pointer transition-all duration-300 block py-2 px-4 rounded-lg ${
          active === nav.title 
            ? "text-white" 
            : "text-gray-300 hover:text-white"
        }`}
        onClick={() => setActive(nav.title)}
      >
        {nav.title}
        
        {/* Efecto de subrayado animado */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f55f17] via-purple-500 to-blue-500 rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: (active === nav.title || isHovered) ? 1 : 0,
            opacity: (active === nav.title || isHovered) ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Brillo de fondo en hover */}
        {(isHovered || active === nav.title) && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#f55f17]/10 via-purple-500/10 to-blue-500/10 rounded-lg -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </a>
    </motion.li>
  );
};

// Componente del botón de estrellas mejorado
const StarsToggleButton = ({ showStars, toggleStars }) => {
  return (
    <motion.button
      onClick={toggleStars}
      className={`relative p-3 rounded-full transition-all duration-300 overflow-hidden ${
        showStars 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
      }`}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.95 }}
      aria-label={showStars ? "Desactivar estrellas" : "Activar estrellas"}
    >
      {/* Efecto de brillo pulsante */}
      {showStars && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-50 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
        {showStars ? (
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        ) : (
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 4.24l-2.13 4.32-4.77.69 3.45 3.36-.81 4.74L12 17.27l4.26 2.24-.81-4.74 3.45-3.36-4.77-.69L12 6.24z"/>
        )}
      </svg>
    </motion.button>
  );
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { showStars, toggleStars } = useTheme();

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
    <motion.nav
      className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 navbar-mobile transition-all duration-500 ${
        scrolled ? "bg-primary backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Borde inferior brillante con animación */}
      {scrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f55f17] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}

      <div className='w-full flex justify-between items-center max-w-7xl mx-auto '>
        {/* Logo mejorado */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to='/'
            className='flex items-center gap-3'
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f55f17] to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              F
            </motion.div>
            <div className="flex flex-col">
              <span className="text-white text-lg font-bold">Fernando</span>
              <span className="text-gray-400 text-xs hidden sm:block">Full Stack Developer</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation - MEJORADO */}
        <ul className='list-none hidden sm:flex flex-row gap-2 items-center'>
          {navLinks.map((nav) => (
            <NavItem 
              key={nav.id} 
              nav={nav} 
              active={active} 
              setActive={setActive} 
            />
          ))}
          
          {/* Separador */}
          <div className="w-px h-6 bg-gray-700 mx-2" />
          
          {/* Botón de estrellas mejorado */}
          <StarsToggleButton 
            showStars={showStars} 
            toggleStars={toggleStars} 
          />
        </ul>

        {/* MENÚ MÓVIL - SIN CAMBIOS */}
        <div className='sm:hidden flex flex-1 justify-end items-center gap-3'>
          {/* Botón de menú móvil */}
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
              src={toggle ? generalImages.close : generalImages.menu}
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
            } fixed inset-0 z-50 space-fullscreen-menu`}
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
              className="relative z-50 flex flex-col items-center justify-start pt-20 w-full h-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logo/Title */}
              <div className="mb-12 xs:mb-10 text-center space-fullscreen-logo">
                <h2 className="text-white text-4xl xs:text-3xl font-bold mb-3 text-space-glow">Fernando</h2>
                <p className="text-secondary text-lg xs:text-base font-light tracking-wide">Desarrollador Full Stack</p>
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
                <p className="text-secondary text-sm font-light tracking-widest">EXPLORA LA GALAXIA DEL CÓDIGO</p>
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
    </motion.nav>
  );
};

export default Navbar;