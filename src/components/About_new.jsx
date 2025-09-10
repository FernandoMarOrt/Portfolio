import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import LazyImage from "./LazyImage";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt 
    className='xs:w-[250px] w-[200px] max-w-[300px] mx-auto'
    options={{
      max: window.innerWidth > 768 ? 45 : 0,
      scale: window.innerWidth > 768 ? 1 : 1,
      speed: window.innerWidth > 768 ? 450 : 0,
    }}
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-4 px-4 xs:px-6 sm:px-8 min-h-[220px] xs:min-h-[260px] sm:min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <LazyImage
          src={icon}
          alt='web-development'
          loading="lazy"
          className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 object-contain'
        />

        <h3 className='text-white text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  // Detectar si es móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   window.innerWidth < 768 ||
                   ('ontouchstart' in window);

  // Versión minimalista para móvil
  if (isMobile) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-light text-white mb-8 tracking-wide">
            Sobre mi
          </h2>
          <div className="space-y-6">
            <p className="text-gray-300 text-base leading-relaxed font-light">
              Desarrollador Full Stack con pasión por crear experiencias digitales excepcionales.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Especializado en React, Angular, .NET y tecnologías modernas. 
              Siempre buscando aprender y evolucionar.
            </p>
            
            {/* Skills minimalistas */}
            <div className="pt-8">
              <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-wider text-gray-500">
                <div className="text-center">
                  <div className="w-2 h-2 bg-[#f55f17] rounded-full mx-auto mb-2"></div>
                  Frontend
                </div>
                <div className="text-center">
                  <div className="w-2 h-2 bg-[#f55f17] rounded-full mx-auto mb-2"></div>
                  Backend
                </div>
                <div className="text-center">
                  <div className="w-2 h-2 bg-[#f55f17] rounded-full mx-auto mb-2"></div>
                  Mobile
                </div>
                <div className="text-center">
                  <div className="w-2 h-2 bg-[#f55f17] rounded-full mx-auto mb-2"></div>
                  Cloud
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Versión desktop original
  return (
    <>
      <div>
        <h2 className={styles.sectionHeadText}>Sobre mi.</h2>
      </div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[#CCCCCC] text-[15px] xs:text-[16px] sm:text-[17px] max-w-3xl leading-[26px] xs:leading-[28px] sm:leading-[30px]"
      >
        Soy un programador junior con un sólido interés en la programación y el desarrollo web. Mi capacidad para adaptarme a diferentes entornos y ofrecer siempre lo mejor de mí es una de mis principales fortalezas. Destaco por mi habilidad para trabajar de manera colaborativa en equipos y mi constante entusiasmo por aprender y mejorar mis habilidades.
      </motion.p>

      <div className='mt-12 xs:mt-16 sm:mt-20 flex flex-wrap gap-6 xs:gap-8 sm:gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
