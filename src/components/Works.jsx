import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
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
    <div>
      <Tilt
        options={{
          max: isMobile ? 0 : 45,
          scale: 1,
          speed: isMobile ? 0 : 450,
        }}
        className='bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] p-4 xs:p-5 rounded-2xl sm:w-[360px] w-full max-w-[400px] mx-auto relative border-2 border-white/80 dark:border-white/40 before:content-[" "] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:border-2 before:border-blue-400/40 before:blur-2xl before:opacity-90 before:z-0 animate-glow-card hover:scale-105 hover:shadow-[0_0_64px_16px_rgba(96,165,250,0.35)] transition-transform duration-300 group'
        style={{ boxShadow: '0 0 48px 0 rgba(96,165,250,0.25), 0 0 0 3px rgba(255,255,255,0.18) inset' }}
      >
        {/* Partículas tipo estrellas */}
        <div className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-6 left-8 w-1 h-1 bg-white rounded-full animate-twinkle" style={{animationDelay:'0.1s'}}></div>
          <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-blue-300 rounded-full animate-twinkle" style={{animationDelay:'0.4s'}}></div>
          <div className="absolute bottom-8 left-1/3 w-0.5 h-0.5 bg-white/80 rounded-full animate-twinkle" style={{animationDelay:'0.7s'}}></div>
          <div className="absolute bottom-4 right-1/4 w-1 h-1 bg-blue-200 rounded-full animate-twinkle" style={{animationDelay:'1s'}}></div>
        </div>
        <div className='relative z-10 w-full h-[200px] xs:h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <button
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 xs:w-12 xs:h-12 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200 mobile-touch-target'
              aria-label={`Ver código de ${name}`}
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </button>
          </div>
        </div>

        <div className='mt-4 xs:mt-5'>
          <h3 className='text-white font-bold text-[20px] xs:text-[22px] sm:text-[24px] leading-tight'>{name}</h3>
          <p className='mt-2 text-secondary text-[13px] xs:text-[14px] leading-relaxed'>{description}</p>
        </div>

        <div className='mt-3 xs:mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[12px] xs:text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}        </div>
      </Tilt>
    </div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Mi trabajo</p>
        <h2 className={`${styles.sectionHeadText}`}>Proyectos</h2>
      </motion.div>      <div className='w-full flex'>
        <p
          className='mt-3 text-secondary text-[15px] xs:text-[16px] sm:text-[17px] max-w-3xl leading-[26px] xs:leading-[28px] sm:leading-[30px]'
        >
          Los siguientes proyectos muestran mis habilidades y experiencia a través de ejemplos reales de mi trabajo. Cada proyecto se describe brevemente con enlaces a repositorios de código y demostraciones en vivo. Refleja mi capacidad para resolver problemas complejos, trabajar con diferentes tecnologías y gestionar proyectos de forma eficaz.
        </p>
      </div>

      <div className='mt-12 xs:mt-16 sm:mt-20 flex flex-wrap gap-6 xs:gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>  );
};

export default SectionWrapper(Works, "projects");