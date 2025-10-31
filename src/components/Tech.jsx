import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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


// Simulación de imports
const styles = {
  sectionHeadText: "font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]"
};

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

const SkillCard = ({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        rotateY: 5,
        z: 50
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Resplandor exterior en hover */}
      <motion.div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${categoryConfig[tech.category]?.color} opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500`}
        animate={isHovered ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Contenedor principal */}
      <div className="relative bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden">
        
        {/* Efecto de escaneo láser diagonal */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100`}
          animate={isHovered ? {
            x: ["-100%", "200%"],
            y: ["-100%", "200%"],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Campo de estrellas mini en hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Línea orbital superior */}
        <motion.div
          className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${categoryConfig[tech.category]?.color}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
        />

        <div className="relative flex flex-col items-center space-y-3 sm:space-y-4 z-10">
          {/* Contenedor del icono con múltiples órbitas */}
          <div className="relative">
            {/* Órbita exterior */}
            <motion.div
              className={`absolute -inset-8 border-2 border-dashed rounded-full opacity-30`}
              style={{ borderColor: categoryConfig[tech.category]?.color.split(' ')[1] }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Órbita media */}
            <motion.div
              className={`absolute -inset-6 border border-dashed rounded-full opacity-20`}
              style={{ borderColor: categoryConfig[tech.category]?.color.split(' ')[3] }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Contenedor central del icono */}
            <motion.div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${categoryConfig[tech.category]?.color} p-[2px] shadow-2xl`}
              animate={isHovered ? {
                rotate: 360,
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(168, 85, 247, 0.8)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ],
              } : {}}
              transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            >
              {/* Fondo interno del icono */}
              <div className="w-full h-full bg-[#1a1a2e] rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Brillo interior */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                
                <img
                  src={tech.icon}
                  alt={tech.name}
                  loading="lazy"
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain relative z-10 filter group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Partícula orbital brillante */}
            <motion.div
              className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${categoryConfig[tech.category]?.color} shadow-lg`}
              style={{ left: "50%", top: "50%" }}
              animate={{
                x: [20, -20, 20],
                y: [15, -15, 15],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Información de la tecnología */}
          <div className="text-center flex flex-col items-center space-y-2">
            <motion.h3 
              className="text-white text-sm sm:text-base font-bold tracking-wide"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            >
              {tech.name}
            </motion.h3>
            
            <motion.span 
              className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${categoryConfig[tech.category]?.color} text-white font-medium shadow-lg relative overflow-hidden`}
              whileHover={{ scale: 1.1 }}
            >
              {/* Brillo deslizante */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={isHovered ? { x: ["-100%", "200%"] } : {}}
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
              />
              <span className="relative z-10">{tech.category}</span>
            </motion.span>
          </div>
        </div>

        {/* Efecto de borde brillante pulsante */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${categoryConfig[tech.category]?.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
          animate={isHovered ? {
            opacity: [0.2, 0.4, 0.2],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Fondo espacial animado */}
      <div className="absolute inset-0">
        {/* Estrellas de fondo */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Nebulosas de colores */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Título principal mejorado */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            {/* Resplandor del título */}
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl" />
            
            <h2 className={`${styles.sectionHeadText} text-center relative`}>
              <span className="text-white">Tecnologías y </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Herramientas
              </span>
            </h2>

            {/* Línea decorativa debajo */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* Subtítulo */}
          <motion.p
            className="mt-8 text-gray-400 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Mi arsenal de herramientas para crear experiencias increíbles
          </motion.p>
        </motion.div>

        {/* Grid de tecnologías */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {technologies.map((tech, index) => (
            <SkillCard key={tech.name} tech={tech} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Tech;