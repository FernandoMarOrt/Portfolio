import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn } from "../utils/motion";

const socialLinks = [
  {
    name: "GitHub",
    icon: "🐙",
    url: "https://github.com/FernandoMarOrt",
    description: "Explora mis proyectos y código",
    color: "hover:border-purple-500 hover:shadow-purple-500/20",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    name: "LinkedIn",
    icon: "💼",
    url: "https://www.linkedin.com/in/fernandomartinezo/",
    description: "Conecta conmigo profesionalmente",
    color: "hover:border-blue-500 hover:shadow-blue-500/20",
    bgGradient: "from-blue-800 to-blue-900"
  },
  {
    name: "Email",
    icon: "📧",
    url: "mailto:fmarort153@gmail.com",
    description: "Envíame un mensaje directo",
    color: "hover:border-green-500 hover:shadow-green-500/20",
    bgGradient: "from-green-800 to-green-900"
  }
];
const Contact = () => {
  const getButtonText = (linkName) => {
    switch (linkName) {
      case "Email":
        return "Escribir Email";
      case "GitHub":
        return "Ver Repositorios";
      default:
        return "Conectar";
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1)}
        className='w-full max-w-6xl bg-black-100 p-6 xs:p-8 sm:p-10 rounded-2xl shadow-2xl'
      >
        <div className="text-center mb-16">
          <p className={styles.sectionSubText}>Conecta conmigo</p>
          <h3 className={styles.sectionHeadText}>Contacto</h3>
          <p className="text-secondary text-[16px] xs:text-[18px] mt-6 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente o quieres colaborar? ¡Me encantaría saber de ti!
            Puedes contactarme a través de cualquiera de estas plataformas y te responderé lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:gap-10 mb-12">
          {socialLinks.map((link, index) => (            <motion.div
              key={link.name}
              variants={fadeIn("up", "spring", index * 0.2, 0.75)}
              className="group relative h-full"
            >
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block bg-tertiary p-8 xs:p-10 rounded-2xl border-2 border-transparent transition-all duration-500 transform hover:scale-105 ${link.color} hover:shadow-2xl overflow-hidden h-full min-h-[320px] flex flex-col justify-center`}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Fondo degradado en hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                {/* Contenido principal */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="text-5xl xs:text-6xl mb-2 group-hover:scale-125 transition-transform duration-500 filter group-hover:drop-shadow-lg">
                    {link.icon}
                  </div>
                  <h4 className="text-white text-[20px] xs:text-[24px] font-bold tracking-wide">
                    {link.name}
                  </h4>
                  <p className="text-secondary text-[15px] xs:text-[17px] leading-relaxed group-hover:text-white transition-colors duration-300">
                    {link.description}
                  </p>
                  {/* Botón call-to-action */}
                  <div className="mt-4 px-6 py-2 bg-primary rounded-full text-white text-[14px] font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {getButtonText(link.name)}
                  </div>
                </div>

                {/* Icono de enlace externo */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>

                {/* Efectos de partículas decorativos */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping animation-delay-300"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping animation-delay-600"></div>
                </div>

                {/* Borde animado */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Sección adicional con información */}
        <motion.div
          variants={fadeIn("up", "tween", 0.6, 1)}
          className="text-center bg-tertiary rounded-2xl p-8 border border-gray-700"
        >
          <div className="flex flex-col xs:flex-row items-center justify-center gap-4 mb-6">
            <span className="text-4xl">⚡</span>
            <h4 className="text-white text-[18px] xs:text-[20px] font-bold">
              Respuesta Rápida Garantizada
            </h4>
            <span className="text-4xl">🚀</span>
          </div>
          <p className="text-secondary text-[15px] xs:text-[17px] leading-relaxed max-w-2xl mx-auto">
            Siempre estoy abierto a nuevas oportunidades, colaboraciones y proyectos interesantes.
            No dudes en contactarme si tienes alguna idea o propuesta.
          </p>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-600">
            <div className="text-center">
              <div className="text-white text-[20px] xs:text-[24px] font-bold">24h</div>
              <div className="text-secondary text-[12px] xs:text-[14px]">Tiempo de respuesta</div>
            </div>
            <div className="text-center">
              <div className="text-white text-[20px] xs:text-[24px] font-bold">100%</div>
              <div className="text-secondary text-[12px] xs:text-[14px]">Compromiso</div>
            </div>
            <div className="text-center">
              <div className="text-white text-[20px] xs:text-[24px] font-bold">∞</div>
              <div className="text-secondary text-[12px] xs:text-[14px]">Creatividad</div>
            </div>
          </div>
        </motion.div>      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");