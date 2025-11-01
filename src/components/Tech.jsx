import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
  Frontend: { color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/50" },
  Backend: { color: "from-green-500 to-emerald-400", shadow: "shadow-green-500/50" },
  Framework: { color: "from-purple-500 to-violet-400", shadow: "shadow-purple-500/50" },
  Tools: { color: "from-orange-500 to-yellow-400", shadow: "shadow-orange-500/50" },
  DevOps: { color: "from-red-500 to-pink-400", shadow: "shadow-red-500/50" },
  Design: { color: "from-indigo-500 to-purple-400", shadow: "shadow-indigo-500/50" },
  Database: { color: "from-teal-500 to-cyan-400", shadow: "shadow-teal-500/50" },
};

// Detectar si es móvil para reducir animaciones
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const SkillCard = ({ tech, index }) => {
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
      {/* Glow effect - solo desktop y con will-change */}
      {!isMobile && (
        <div
          className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${config.color} opacity-0 group-hover:opacity-60 blur transition-opacity duration-300 will-change-transform`}
        />
      )}

      {/* Card principal */}
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 sm:p-5 rounded-xl border border-slate-700/50 group-hover:border-slate-600 transition-colors duration-300 will-change-transform">
        
        {/* Barra superior de categoría */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} rounded-t-xl`} />

        <div className="flex flex-col items-center gap-3">
          {/* Contenedor del icono - animación simplificada */}
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
  // Reducir número de estrellas en móvil
  const starCount = isMobile ? 15 : 40;
  
  const stars = useMemo(() => 
    [...Array(starCount)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    })),
    []
  );

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden bg-slate-950">
      {/* Fondo con estrellas - reducido y optimizado */}
      <div className="absolute inset-0 opacity-50">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}

        {/* Gradientes de fondo - sin blur excesivo */}
        {!isMobile && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
          </>
        )}
      </div>

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
            <SkillCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tech;