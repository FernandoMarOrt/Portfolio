import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { useInView } from "../hooks/useAnimations";

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
  { name: "HTML 5", icon: htmlIcon, category: "Frontend" },
  { name: "CSS 3", icon: cssIcon, category: "Frontend" },
  { name: "JavaScript", icon: javascriptIcon, category: "Frontend" },
  { name: "TypeScript", icon: typescriptIcon, category: "Frontend" },
  { name: "Tailwind CSS", icon: tailwindIcon, category: "Frontend" },
  { name: "C#", icon: csharpIcon, category: "Backend" },
  { name: "Node JS", icon: nodejsIcon, category: "Backend" },
  { name: "Angular", icon: angularIcon, category: "Framework" },
  { name: ".NET", icon: netIcon, category: "Framework" },
  { name: "Git", icon: gitIcon, category: "Tools" },
  { name: "Visual Studio", icon: visualestudioIcon, category: "Tools" },
  { name: "Postman", icon: postmanIcon, category: "Tools" },
  { name: "Docker", icon: dockerIcon, category: "DevOps" },
  { name: "Figma", icon: figmaIcon, category: "Design" },
  { name: "PostgreSQL", icon: postgreIcon, category: "Database" },
  { name: "MySQL", icon: mysqlIcon, category: "Database" },
];

const categoryConfig = {
  Frontend: { color: "from-blue-500 to-cyan-400"},
  Backend: { color: "from-green-500 to-emerald-400"},
  Framework: { color: "from-purple-500 to-violet-400"},
  Tools: { color: "from-orange-500 to-yellow-400"},
  DevOps: { color: "from-red-500 to-pink-400"},
  Design: { color: "from-indigo-500 to-purple-400"},
  Database: { color: "from-teal-500 to-cyan-400"},
};

// Componente SkillCard rediseñado con temática espacial
const SkillCard = ({ tech, index }) => {
  const [ref, isInView] = useInView(0.2);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        scale: 1.08,
        rotateY: 5,
        z: 50
      }}
      className="group relative md:hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor principal con efecto de cristal espacial */}
  <div className="relative bg-[#181c2a]/50 p-3 sm:p-6 rounded-2xl border border-white/30 transition-all duration-500 overflow-hidden">


        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Partículas espaciales en hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0
                  }}
                  animate={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex flex-col items-center space-y-2 sm:space-y-4 z-10">
          {/* Contenedor del icono con órbita */}
            <div className="relative mb-4 sm:mb-0">
                <motion.div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                  animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 8, repeat: isHovered ? Infinity : 0, ease: "linear" }}
                >
                <div className="absolute inset-0 border-2 border-dashed border-cyan-400/80 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                <img
                  src={tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </motion.div>
            </div>

          {/* Información de la tecnología */}
            <div className="text-center flex flex-col items-center space-y-3 sm:space-y-2">
              <h3 className="text-white text-xs sm:text-base font-bold tracking-wide">
                {tech.name}
              </h3>
              <span className={`text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r ${categoryConfig[tech.category]?.color} text-white font-medium shadow-lg`}>
                {tech.category}
              </span>
            </div>
        </div>

        {/* Efecto de borde brillante */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <>
      {/* Título principal */}
      <div className="text-center mb-16">
        <h2 className={`${styles.sectionHeadText} text-center text-white`}>
          Tecnologías y Herramientas
        </h2>
      </div>

      {/* Grid simple de todas las tecnologías */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6"
      >
        {technologies.map((tech, index) => (
          <SkillCard key={tech.name} tech={tech} index={index} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
