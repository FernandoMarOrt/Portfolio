import React, { useRef, useState } from "react";
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
    <div className="flex justify-center items-center w-full">
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1)}
        className='w-full max-w-2xl bg-black-100 p-4 xs:p-6 sm:p-8 rounded-2xl'
      >
        <div className="text-center mb-8">
          <p className={styles.sectionSubText}>Póngase en contacto</p>
          <h3 className={styles.sectionHeadText}>Contacto</h3>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 xs:gap-7 sm:gap-8'
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

          <div className="flex justify-center">
            <button
              type='submit'
              className='bg-tertiary py-3 px-8 xs:px-10 rounded-xl outline-none text-white font-bold shadow-md shadow-primary mobile-touch-target text-[14px] xs:text-[16px] hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50'
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
