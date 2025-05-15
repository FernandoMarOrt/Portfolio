import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#f55f17]' />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#f55f17] to-[#ff914d]" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hola, Soy <span className='text-[#f55f17]'>Fernando</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
           Desarrollador<br className='sm:block hidden' />
            Full Stack
          </p>
        </div>
      </div>

      <ComputersCanvas />
    </section>
  );
};

export default Hero;
