import { Suspense } from "react";
import ComputersCanvas from "./canvas/Computers";

const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[100dvh] mx-auto overflow-hidden">
      {/* Contenido principal superpuesto arriba del canvas */}
      <div
  className="absolute inset-0 z-10 flex items-start justify-start flex-row max-w-7xl mx-auto pt-24 lg:pt-35 sm:px-16 px-6 mobile-padding gap-3 xs:gap-4 sm:gap-5"
      >
        <div className='flex flex-col justify-center items-center sm:mt-5 mt-2 flex-shrink-0'>
          <div className='w-5 h-5 xs:w-4 xs:h-4 xxs:w-3 xxs:h-3 rounded-full bg-[#f55f17]' />
          <div className="w-1 sm:h-80 xs:h-60 h-40 bg-gradient-to-b from-[#f55f17] to-[#ff914d]" />
        </div>
        <div className="min-w-0 flex-1 hero-text-mobile">
          <h1 className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] xxs:text-[42px] text-[36px] lg:leading-[98px] sm:leading-[65px] xs:leading-[55px] leading-[45px] mt-2 ultra-small-hero">
            <span className="inline-block">Hola,</span>{' '}
            <span className="inline-block">Soy</span>{' '}
            <span className='text-[#f55f17] inline-block'>Fernando</span>
          </h1>
          <p className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] xxs:text-[18px] text-[16px] lg:leading-[40px] sm:leading-[32px] leading-[24px] mt-2 text-white-100 text-responsive">
            <span className="inline-block">Desarrollador</span>
            <br className='sm:block xs:hidden block' />
            <span className="xs:inline sm:inline block">
              Full Stack
            </span>
          </p>
        </div>
      </div>

      {/* Astronauta canvas de fondo */}
      <Suspense fallback={null}>
        <ComputersCanvas />
      </Suspense>
    </section>
  );
};

export default Hero;