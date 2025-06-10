import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

import htmlIcon from '../assets/tech/html.png';
import cssIcon from '../assets/tech/css.png';
import javascriptIcon from '../assets/tech/javascript.png';
import typescriptIcon from '../assets/tech/typescript.png';
import tailwindIcon from '../assets/tech/tailwind.png';
import nodejsIcon from '../assets/tech/nodejs.png';
import angularIcon from '../assets/tech/angular.png';
import netIcon from '../assets/tech/net.png';
import csharpIcon from '../assets/tech/csharp.png';
import gitIcon from '../assets/tech/git.png';
import dockerIcon from '../assets/tech/docker.png';
import figmaIcon from '../assets/tech/figma.png';
import postgreIcon from '../assets/tech/postgre.png';
import mysqlIcon from '../assets/tech/mysql.png';
import visualestudioIcon from '../assets/tech/visualestudio.png';
import postmanIcon from '../assets/tech/postman.png';

const technologies = [
  { name: "HTML 5", icon: htmlIcon },
  { name: "CSS 3", icon: cssIcon },
  { name: "JavaScript", icon: javascriptIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "C#", icon: csharpIcon },
  { name: "Node JS", icon: nodejsIcon },
  { name: "Angular", icon: angularIcon },
  { name: ".NET", icon: netIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Git", icon: gitIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "Figma", icon: figmaIcon },
  { name: "PostgreSQL", icon: postgreIcon },
  { name: "MySQL", icon: mysqlIcon },
  { name: "Visual Studio", icon: visualestudioIcon },
  { name: "Postman", icon: postmanIcon },
];
const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
    <motion.div 
      variants={isMobile ? {} : textVariant()} 
      initial={isMobile ? false : 'hidden'}
      whileInView={isMobile ? false : 'show'}
      viewport={isMobile ? {} : { once: true, amount: 0.25 }}
      className="flex justify-center mb-6 xs:mb-8"
    >
        <h2 className={`${styles.sectionHeadText} text-center`}>Tecnologías y Herramientas</h2>
    </motion.div>

      <div className='flex flex-row flex-wrap justify-center gap-6 xs:gap-8 sm:gap-10'>
        <div className="p-4 xs:p-6 rounded-xl border border-gray-700 w-full max-w-6xl">
          <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 xs:gap-6 justify-items-center">
            {technologies.map((tech) => (
              <li key={tech.name} className={`flex flex-col items-center group ${!isMobile ? 'hover:scale-105' : ''} transition-transform duration-200`}>
                <div className={`p-2 xs:p-3 rounded-lg bg-gray-800/50 ${!isMobile ? 'hover:bg-gray-700/50' : ''} transition-colors duration-200`}>
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" 
                  />
                </div>
                <p className="text-white text-xs xs:text-sm mt-2 text-center leading-tight max-w-[80px] xs:max-w-[100px]">
                  {tech.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
