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
            className="mobile-touch-target flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? "Cerrar menú" : "Abrir menú"}
          >
            <img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] xs:w-[24px] xs:h-[24px] object-contain'
            />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] max-w-[200px] z-10 rounded-xl shadow-lg`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] hover:text-[#915EFF] transition-colors duration-200 ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
