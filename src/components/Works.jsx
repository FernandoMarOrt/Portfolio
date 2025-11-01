import Tilt from "react-parallax-tilt";
import { generalImages } from "../constants/index.js";
import SectionWrapper from "./SectionWrapper";
import { projects } from "../constants";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {

  const cardContent = (
    <>
      {/* Contenedor de imagen que rellena todo el espacio */}
      <div className='relative z-10 w-full h-[200px] xs:h-[230px] rounded-2xl overflow-hidden'>
        <img
          src={image}
          alt={`Proyecto ${name}`}
          loading="lazy"
          className='w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110'
        />

        {/* Botón de GitHub */}
        <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
          <button
            onClick={() => window.open(source_code_link, "_blank")}
            className='black-gradient w-10 h-10 xs:w-12 xs:h-12 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200 mobile-touch-target z-20'
            aria-label={`Ver código de ${name}`}
          >
            <img
              src={generalImages.github}
              alt='source code'
              className='w-1/2 h-1/2 object-contain'
            />
          </button>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className='mt-4 xs:mt-5 flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='text-white font-bold text-[20px] xs:text-[22px] sm:text-[24px] leading-tight'>
            {name}
          </h3>
          <p className='mt-2 text-secondary text-[13px] xs:text-[14px] leading-relaxed'>
            {description}
          </p>
        </div>
        
        {/* Tags de la tarjeta */}
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
      </div>
    </>
  );

  const cardClasses = 'bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#0f172a] p-4 xs:p-5 rounded-2xl sm:w-[360px] w-full max-w-[400px] mx-auto relative border-2 border-white/80 dark:border-white/40 before:content-[" "] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:border-2 before:border-blue-400/40 before:blur-2xl before:opacity-90 before:z-0 hover:scale-105 hover:shadow-[0_0_64px_16px_rgba(96,165,250,0.35)] transition-transform duration-300 group min-h-[400px] flex flex-col';

  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className={cardClasses}
      style={{ 
        boxShadow: '0 0 48px 0 rgba(96,165,250,0.25), 0 0 0 3px rgba(255,255,255,0.18) inset', 
        display: 'flex', 
        flexDirection: 'column' 
      }}
    >
      {cardContent}
    </Tilt>
  );
};

const Works = () => {
  return (
    <>
      <div>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
          Proyectos
        </h2>
      </div>
      <div className='mt-12 xs:mt-16 sm:mt-20 flex flex-wrap gap-6 xs:gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");