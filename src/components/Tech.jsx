import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { techImages } from "../constants";
import SectionWrapper from "./SectionWrapper";

const technologies = [
  { name: "HTML 5", icon: techImages.html, category: "Frontend" },
  { name: "CSS 3", icon: techImages.css, category: "Frontend" },
  { name: "JavaScript", icon: techImages.javascript, category: "Frontend" },
  { name: "TypeScript", icon: techImages.typescript, category: "Frontend" },
  { name: "Tailwind CSS", icon: techImages.tailwind, category: "Frontend" },
  { name: "C#", icon: techImages.csharp, category: "Backend" },
  { name: "Node JS", icon: techImages.nodejs, category: "Backend" },
  { name: "Angular", icon: techImages.angular, category: "Framework" },
  { name: ".NET", icon: techImages.net, category: "Framework" },
  { name: "Git", icon: techImages.git, category: "Tools" },
  { name: "Visual Studio", icon: techImages.visualestudio, category: "Tools" },
  { name: "Postman", icon: techImages.postman, category: "Tools" },
  { name: "Docker", icon: techImages.docker, category: "DevOps" },
  { name: "Figma", icon: techImages.figma, category: "Design" },
  { name: "PostgreSQL", icon: techImages.postgre, category: "Database" },
  { name: "MySQL", icon: techImages.mysql, category: "Database" },
];

const categoryConfig = {
  Frontend: { color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/50" },
  Backend: { color: "from-green-500 to-emerald-400", shadow: "shadow-green-500/50" },
  Framework: { color: "from-purple-500 to-violet-400", shadow: "shadow-purple-500/50" },
  Tools: { color: "from-orange-500 to-yellow-400", shadow: "shadow-orange-500/50" },
  DevOps: { color: "from-red-500 to-pink-400", shadow: "shadow-red-500/50" },
  Design: { color: "from-indigo-500 to-purple-400", shadow: "shadow-indigo-500/50" },
  Database: { color: "from-teal-500 to-cyan-400", shadow: "shadow-teal-500/50" },
};

const SkillCard = ({ tech, index, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = categoryConfig[tech.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
        ease: "easeOut"
      }}
      className="group relative"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Glow effect - solo desktop */}
      {!isMobile && (
        <div
          className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${config.color} opacity-0 group-hover:opacity-60 blur transition-opacity duration-300`}
        />
      )}

      {/* Card principal */}
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 sm:p-5 rounded-xl border border-slate-700/50 group-hover:border-slate-600 transition-colors duration-300">
        
        {/* Barra superior de categoría */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} rounded-t-xl`} />

        <div className="flex flex-col items-center gap-3">
          {/* Contenedor del icono */}
          <div className="relative">
            <motion.div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${config.color} p-0.5 ${config.shadow} shadow-lg`}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
            </motion.div>

            {/* Orbital dot - solo desktop */}
            {!isMobile && isHovered && (
              <motion.div
                className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${config.color}`}
                style={{ 
                  left: "50%", 
                  top: "50%",
                  marginLeft: "-4px",
                  marginTop: "-4px"
                }}
                animate={{
                  x: [20, -20, 20],
                  y: [15, -15, 15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </div>

          {/* Info */}
          <div className="text-center space-y-1.5">
            <h3 className="text-white text-sm sm:text-base font-semibold">
              {tech.name}
            </h3>
            
            <span className={`inline-block text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${config.color} text-white font-medium`}>
              {tech.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden">
      {/* Solo nebulosas sutiles para dar profundidad - SIN fondo sólido ni estrellas */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[80px]"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[80px]"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Título */}
        <motion.div 
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Tecnologías y </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Herramientas
            </span>
          </h2>

          {/* Línea decorativa */}
          <motion.div
            className="mx-auto h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full max-w-xs"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <p className="mt-4 sm:mt-6 text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Mi arsenal de herramientas para crear experiencias increíbles
          </p>
        </motion.div>

        {/* Grid optimizado */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <SkillCard key={tech.name} tech={tech} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");