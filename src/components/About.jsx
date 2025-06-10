import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => {
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
    <Tilt className='xs:w-[250px] w-full max-w-[300px] mx-auto'
      options={{
        max: isMobile ? 0 : 45,
        scale: 1,
        speed: isMobile ? 0 : 450,
      }}
    >
      <motion.div
        variants={isMobile ? {} : fadeIn("right", "spring", index * 0.5, 0.75)}
        initial={isMobile ? false : 'hidden'}
        whileInView={isMobile ? false : 'show'}
        viewport={isMobile ? {} : { once: true, amount: 0.25 }}
        className={`w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card ${isMobile ? 'framer-motion-disable' : ''}`}
      >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-6 xs:px-8 sm:px-12 min-h-[280px] xs:min-h-[260px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 xs:w-17 xs:h-17 object-contain'
        />

        <h3 className='text-white text-[18px] xs:text-[20px] font-bold text-center leading-tight'>
          {title}
        </h3>
      </div>      </motion.div>
    </Tilt>
  );
};

const About = () => {
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
      >
        <h2 className={styles.sectionHeadText}>Sobre mi.</h2>
      </motion.div>

      <motion.p
        variants={isMobile ? {} : fadeIn("", "", 0.1, 1)}
        initial={isMobile ? false : 'hidden'}
        whileInView={isMobile ? false : 'show'}
        viewport={isMobile ? {} : { once: true, amount: 0.25 }}
        className={`mt-4 text-[#CCCCCC] text-[15px] xs:text-[16px] sm:text-[17px] max-w-3xl leading-[26px] xs:leading-[28px] sm:leading-[30px] ${isMobile ? 'framer-motion-disable' : ''}`}
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
