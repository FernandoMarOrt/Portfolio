import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };
  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-6 sm:gap-8 xl:gap-10 overflow-hidden`}
    >
      <motion.div
        variants={isMobile ? {} : slideIn("left", "tween", 0.2, 1)}
        initial={isMobile ? false : 'hidden'}
        whileInView={isMobile ? false : 'show'}
        viewport={isMobile ? {} : { once: true, amount: 0.25 }}
        className={`flex-[0.75] bg-black-100 p-4 xs:p-6 sm:p-8 rounded-2xl ${isMobile ? 'framer-motion-disable' : ''}`}
      >
        <p className={styles.sectionSubText}>Póngase en contacto</p>
        <h3 className={styles.sectionHeadText}>Contacto</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 xs:mt-10 sm:mt-12 flex flex-col gap-6 xs:gap-7 sm:gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3 xs:mb-4 text-[14px] xs:text-[16px]'>Nombre</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="¿Cuál es tu nombre?"
              className='bg-tertiary py-3 xs:py-4 px-4 xs:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[14px] xs:text-[16px] mobile-touch-target'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3 xs:mb-4 text-[14px] xs:text-[16px]'>Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="¿Cuál es tu email?"
              className='bg-tertiary py-3 xs:py-4 px-4 xs:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[14px] xs:text-[16px] mobile-touch-target'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3 xs:mb-4 text-[14px] xs:text-[16px]'>Mensaje</span>
            <textarea
              rows={5}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='¿Qué me quieres comentar?'
              className='bg-tertiary py-3 xs:py-4 px-4 xs:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium text-[14px] xs:text-[16px] resize-none mobile-touch-target'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-6 xs:px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary mobile-touch-target text-[14px] xs:text-[16px] hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50'
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </motion.div>      <motion.div
        variants={isMobile ? {} : slideIn("right", "tween", 0.2, 1)}
        initial={isMobile ? false : 'hidden'}
        whileInView={isMobile ? false : 'show'}
        viewport={isMobile ? {} : { once: true, amount: 0.25 }}
        className={`xl:flex-1 xl:h-auto md:h-[550px] sm:h-[400px] h-[300px] ${isMobile ? 'framer-motion-disable' : ''}`}
      >
        {/* Contact visual content - lightweight space design */}
        <div className="relative w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden flex items-center justify-center">
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              ></div>
            ))}
          </div>
          
          {/* Central icon */}
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 xs:w-24 xs:h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 xs:w-12 xs:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-secondary text-sm xs:text-base">¡Hablemos!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
