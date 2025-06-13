import React, { useState } from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { useInView, useIsMobile } from "../hooks/useAnimations";

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
  { name: "C#", icon: csharpIcon, category: "Backend" },
  { name: "Node JS", icon: nodejsIcon, category: "Backend" },
  { name: "Angular", icon: angularIcon, category: "Framework" },
  { name: ".NET", icon: netIcon, category: "Framework" },
  { name: "Tailwind CSS", icon: tailwindIcon, category: "Frontend" },
  { name: "Git", icon: gitIcon, category: "Tools" },
  { name: "Docker", icon: dockerIcon, category: "DevOps" },
  { name: "Figma", icon: figmaIcon, category: "Design" },
  { name: "PostgreSQL", icon: postgreIcon, category: "Database" },
  { name: "MySQL", icon: mysqlIcon, category: "Database" },
  { name: "Visual Studio", icon: visualestudioIcon, category: "Tools" },
  { name: "Postman", icon: postmanIcon, category: "Tools" },
];
// Componente SkillCard extraído fuera del componente principal
const SkillCard = ({ tech }) => {
  const [ref, isInView] = useInView(0.3);
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      ref={ref}
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      className="group relative bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex flex-col items-center space-y-4">        <div className="relative">
          <img 
            src={tech.icon} 
            alt={tech.name} 
            className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300 lazy-load" 
            loading="lazy"
          />
        </div>
          <h3 className="text-white text-sm font-semibold text-center">{tech.name}</h3>
        
        <span className="text-xs text-secondary bg-gray-700/50 px-2 py-1 rounded-full">
          {tech.category}
        </span>
      </div>
    </motion.div>  );
};

const Tech = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Frontend', 'Backend', 'Framework', 'Tools', 'Database', 'Design', 'DevOps'];
  
  const filteredTechs = selectedCategory === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  return (
    <>
      <motion.div variants={textVariant()} className="flex justify-center mb-6 xs:mb-8">
        <h2 className={`${styles.sectionHeadText} text-center`}>Tecnologías y Herramientas</h2>
      </motion.div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de tecnologías */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {filteredTechs.map((tech) => (
          <motion.div
            key={`${tech.name}-${tech.category}`}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: Math.random() * 0.1 }}
          >
            <SkillCard tech={tech} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
