import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[120px] xs:top-[110px] xxs:top-[100px] hero-container max-w-7xl mx-auto ${styles.paddingX} mobile-padding flex flex-row items-start gap-3 xs:gap-4 sm:gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5 flex-shrink-0'>
          <div className='w-5 h-5 xs:w-4 xs:h-4 xxs:w-3 xxs:h-3 rounded-full bg-[#f55f17]' />
          <div className="w-1 sm:h-80 xs:h-60 h-40 bg-gradient-to-b from-[#f55f17] to-[#ff914d]" />
        </div>

        <div className="min-w-0 flex-1 hero-text-mobile">
          <h1 className={`${styles.heroHeadText} text-white ultra-small-hero`}>
            <span className="inline-block">Hola,</span>{' '}
            <span className="inline-block">Soy</span>{' '}
            <span className='text-[#f55f17] inline-block'>Fernando</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100 text-responsive`}>
           <span className="inline-block">Desarrollador</span>
           <br className='sm:block xs:hidden block' />
           <span className="xs:inline sm:inline block">
             <span className="xs:inline hidden">&nbsp;</span>Full Stack
           </span>
          </p>
        </div>
      </div>

      <ComputersCanvas />
    </section>
  );
};

export default Hero;
