import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: isMobile ? 25 : 45, // Reducir efecto en móvil
          scale: 1,
          speed: isMobile ? 200 : 450, // Más lento en móvil
        }}
        className='bg-tertiary p-4 xs:p-5 rounded-2xl sm:w-[360px] w-full max-w-[400px] mx-auto'
      >
        <div className='relative w-full h-[200px] xs:h-[230px]'>
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
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Mi trabajo</p>
        <h2 className={`${styles.sectionHeadText}`}>Proyectos</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[15px] xs:text-[16px] sm:text-[17px] max-w-3xl leading-[26px] xs:leading-[28px] sm:leading-[30px]'
        >
          Los siguientes proyectos muestran mis habilidades y experiencia a través de ejemplos reales de mi trabajo. Cada proyecto se describe brevemente con enlaces a repositorios de código y demostraciones en vivo. Refleja mi capacidad para resolver problemas complejos, trabajar con diferentes tecnologías y gestionar proyectos de forma eficaz.
        </motion.p>
      </div>

      <div className='mt-12 xs:mt-16 sm:mt-20 flex flex-wrap gap-6 xs:gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
