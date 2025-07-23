import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import LazyImage from "./LazyImage";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-[200px] max-w-[300px] mx-auto'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-4 px-4 xs:px-6 sm:px-8 min-h-[220px] xs:min-h-[260px] sm:min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <LazyImage
          src={icon}
          alt='web-development'
          loading="lazy"
          className='w-12 h-12 xs:w-16 xs:h-16 sm:w-17 sm:h-17 object-contain'
        />

        <h3 className='text-white text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-center leading-tight'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Sobre mi.</h2>
      </motion.div>

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
