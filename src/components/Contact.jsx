import React, { useState, useEffect } from "react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import githubSvg from "../assets/github.svg";
import linkedinSvg from "../assets/linkedin.svg";
import gmailSvg from "../assets/gmail.svg";

const socialLinks = [
  {
    name: "GitHub",
    icon: <img src={githubSvg} alt="GitHub" className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20" />,
    url: "https://github.com/FernandoMarOrt",
    description: "Explora mis proyectos",
    border: "border-purple-500 sm:border-white/60 sm:dark:border-white/20 sm:hover:border-purple-500 sm:hover:shadow-purple-500/20",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    name: "LinkedIn",
    icon: <img src={linkedinSvg} alt="LinkedIn" className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20" />,
    url: "https://www.linkedin.com/in/fernandomartinezo/",
    description: "Conecta conmigo",
    border: "border-blue-500 sm:border-white/60 sm:dark:border-white/20 sm:hover:border-blue-500 sm:hover:shadow-blue-500/20",
    bgGradient: "from-blue-800 to-blue-900"
  },
  {
    name: "Email",
    icon: <img src={gmailSvg} alt="Email" className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20" />,
    url: "mailto:fmarort153@gmail.com",
    description: "Envíame un mensaje",
    border: "border-green-500 sm:border-white/60 sm:dark:border-white/20 sm:hover:border-green-500 sm:hover:shadow-green-500/20",
    bgGradient: "from-green-800 to-green-900"
  }
];

// Componente de contacto minimalista para móvil
const MobileContact = () => (
  <section className="py-16 px-6">
    <div className="max-w-md mx-auto text-center">
      <p className={styles.sectionSubText}>Conecta conmigo</p>
      <h2 className={styles.sectionHeadText}>Contacto.</h2>
      
      <div className="space-y-4 mt-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target={link.name !== "Email" ? "_blank" : "_self"}
            rel={link.name !== "Email" ? "noopener noreferrer" : ""}
            className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex-shrink-0">
                <img 
                  src={link.name === "GitHub" ? githubSvg : link.name === "LinkedIn" ? linkedinSvg : gmailSvg} 
                  alt={link.name} 
                  className="w-full h-full" 
                />
              </div>
              <div className="text-left">
                <div className="text-white text-sm font-medium">{link.name}</div>
                <div className="text-secondary text-xs">{link.description}</div>
              </div>
            </div>
            <div className="text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
      
      <p className="text-secondary text-[16px] mt-8 leading-relaxed">
        ¿Tienes un proyecto en mente? <br />
        ¡Hablemos!
      </p>
    </div>
  </section>
);

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Solo usar window.innerWidth para la detección responsiva
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    // Verificar inicialmente
    checkMobile();
    
    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Versión minimalista para móvil
  if (isMobile) {
    return <MobileContact />;
  }

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

  // Versión desktop original
  return (
  <div className="flex justify-center w-full min-h-[60vh] bg-black-100">
      <div
        className='w-full max-w-6xl p-6 xs:p-8 sm:p-10 rounded-2xl shadow-2xl border-4 border-white/80 dark:border-white/30 relative before:content-[""] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:border-4 before:border-white/40 before:blur-lg before:opacity-80 before:z-0 animate-fade-in-blur'
      >
        <div className="relative z-10">
          <div className="text-center mb-16">
            <p className={styles.sectionSubText}>Conecta conmigo</p>
            <h3 className={styles.sectionHeadText}>Contacto</h3>
            <p className="text-secondary text-[16px] xs:text-[18px] mt-6 max-w-3xl mx-auto leading-relaxed">
              ¿Tienes un proyecto en mente o quieres colaborar? ¡Me encantaría saber de ti!
              Puedes contactarme a través de cualquiera de estas plataformas y te responderé lo antes posible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:gap-10 mb-12">
            {socialLinks.map((link, index) => (
              <div
                key={link.name}
                className="group relative h-full"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative block bg-tertiary p-4 xs:p-8 sm:p-10 rounded-2xl border-2 ${link.border} transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden h-full min-h-[180px] xs:min-h-[240px] sm:min-h-[320px] flex flex-col justify-center before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:border-2 before:border-white/40 before:blur before:opacity-70 before:z-0`}
                  style={{ boxShadow: '0 0 16px 0 rgba(255,255,255,0.18), 0 0 0 2px rgba(255,255,255,0.10) inset' }}
                >
                  {/* Fondo degradado solo en hover escritorio */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.bgGradient} opacity-0 sm:group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                  {/* Contenido principal */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4 xs:space-y-6">
                    <div className="text-4xl xs:text-5xl sm:text-6xl mb-2 sm:group-hover:scale-125 transition-transform duration-500 filter sm:group-hover:drop-shadow-lg">
                      {link.icon}
                    </div>
                    <h4 className="text-white text-[16px] xs:text-[20px] sm:text-[24px] font-bold tracking-wide">
                      {link.name}
                    </h4>
                    <p className="text-secondary text-[13px] xs:text-[15px] sm:text-[17px] leading-relaxed sm:group-hover:text-white transition-colors duration-300">
                      {link.description}
                    </p>
                    {/* Botón call-to-action */}
                    <div className="mt-4 px-4 py-2 bg-primary rounded-full text-white text-[12px] xs:text-[14px] font-semibold opacity-100 transition-all duration-300">
                      {getButtonText(link.name)}
                    </div>
                  </div>

                  {/* Icono de enlace externo */}
                  <div className="absolute top-4 right-4 opacity-100 transition-all duration-300">
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
                  <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping animation-delay-300"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping animation-delay-600"></div>
                  </div>

                  {/* Borde animado */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-100 transition-opacity duration-500"></div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");