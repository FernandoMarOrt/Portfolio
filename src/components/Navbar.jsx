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

          <div
            className={`${
              !toggle ? "opacity-0 invisible transform translate-y-[-20px]" : "opacity-100 visible transform translate-y-0 slide-in-menu"
            } transition-all duration-300 ease-out absolute top-20 right-0 mx-4 my-2 min-w-[180px] max-w-[220px] z-50`}
          >
            {/* Menú espacial con efectos */}
            <div className="relative space-menu-container">
              {/* Fondo con gradiente espacial */}
              <div className="absolute inset-0 rounded-2xl backdrop-blur-md"></div>
              
              {/* Borde brillante animado */}
              <div className="absolute inset-0 rounded-2xl space-border-glow p-[1px]">
                <div className="w-full h-full rounded-2xl"></div>
              </div>
              
              {/* Efectos de partículas animadas */}
              <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full space-particles"></div>
              <div className="absolute top-4 right-3 w-0.5 h-0.5 bg-blue-400 rounded-full space-particles" style={{ animationDelay: '0.7s' }}></div>
              <div className="absolute bottom-3 left-4 w-0.5 h-0.5 bg-purple-400 rounded-full space-particles" style={{ animationDelay: '1.4s' }}></div>
              
              {/* Contenido del menú */}
              <div className="relative p-6">
                <ul className='list-none flex justify-end items-start flex-1 flex-col gap-1'>
                  {navLinks.map((nav, index) => (
                    <li
                      key={nav.id}
                      className="w-full menu-item-float"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <a 
                        href={`#${nav.id}`}
                        className={`
                          space-menu-item block w-full p-3 rounded-lg font-medium cursor-pointer text-[16px] 
                          transition-all duration-300 border border-transparent
                          ${active === nav.title 
                            ? "active" 
                            : "text-gray-300 hover:text-white"
                          }
                        `}
                        onClick={() => {
                          setToggle(!toggle);
                          setActive(nav.title);
                        }}
                        onMouseEnter={(e) => {
                          e.target.querySelector('.shimmer-effect')?.classList.add('shimmer-effect');
                        }}
                      >
                        {/* Efecto de brillo en hover */}
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] shimmer-effect"></span>
                        
                        {/* Icono decorativo con animación */}
                        <span className="inline-block w-2 h-2 mr-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-70 space-particles"></span>
                        
                        {/* Texto del enlace */}
                        <span className="relative z-10">{nav.title}</span>
                        
                        {/* Indicador activo con pulso */}
                        {active === nav.title && (
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full pulse-indicator"></span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
                
                {/* Línea divisoria decorativa con efectos espaciales */}
                <div className="mt-4 pt-4 border-t border-gradient-to-r from-transparent via-purple-500/30 to-transparent">
                  <div className="flex justify-center space-x-2">
                    <div className="w-1 h-1 bg-purple-400 rounded-full space-particles"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full space-particles" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-1 h-1 bg-cyan-400 rounded-full space-particles" style={{ animationDelay: '1s' }}></div>
                  </div>
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
