import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { services } from "../constants";
import SectionWrapper from "./SectionWrapper";
import { fadeIn, textVariant } from "../utils/motion";

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
        <img
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
      <div>
  <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Sobre mi.</h2>
      </div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-[#CCCCCC] text-[15px] xs:text-[16px] sm:text-[17px] max-w-3xl leading-[26px] xs:leading-[28px] sm:leading-[30px]"
      >
        Soy un programador full stack apasionado por crear experiencias digitales excepcionales. Mi enfoque se centra en desarrollar soluciones innovadoras y escalables que combinan diseño elegante con funcionalidad robusta.

        Me destaco por mi capacidad de adaptación rápida a nuevas tecnologías, mi enfoque en el trabajo colaborativo y mi compromiso constante con la excelencia en cada proyecto que emprendo.
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
