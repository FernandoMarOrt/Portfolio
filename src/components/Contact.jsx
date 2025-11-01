import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

// Simulación de estilos
const styles = {
  sectionHeadText: "font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText: "sm:text-[18px] text-[14px] text-gray-400 uppercase tracking-wider"
};

const socialLinks = [
  {
    name: "GitHub",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    url: "https://github.com/FernandoMarOrt",
    description: "Explora mis proyectos",
    color: "from-gray-700 to-gray-900",
    hoverColor: "group-hover:from-purple-600 group-hover:to-purple-800",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    url: "https://www.linkedin.com/in/fernandomartinezo/",
    description: "Conecta conmigo",
    color: "from-blue-700 to-blue-900",
    hoverColor: "group-hover:from-blue-500 group-hover:to-blue-700",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  {
    name: "Email",
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    url: "mailto:fmarort153@gmail.com",
    description: "Envíame un mensaje",
    color: "from-green-700 to-emerald-900",
    hoverColor: "group-hover:from-green-500 group-hover:to-emerald-700",
    glowColor: "rgba(34, 197, 94, 0.4)"
  }
];

// Detectar móvil
const isMobileDevice = () => typeof window !== 'undefined' && window.innerWidth < 768;

// Componente de card de contacto
const ContactCard = ({ link, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const handleClick = (e) => {
    if (link.name === "Email") {
      e.preventDefault();
      window.location.href = link.url;
      
      setTimeout(() => {
        const userChoice = window.confirm(
          '¿No se abrió tu cliente de email?\n\n' +
          'Puedes copiar mi email: fmarort153@gmail.com\n\n' +
          '¿Quieres copiarlo al portapapeles?'
        );
        if (userChoice) {
          navigator.clipboard.writeText('fmarort153@gmail.com').then(() => {
            alert('¡Email copiado al portapapeles!');
          }).catch(() => {
            alert('Email: fmarort153@gmail.com');
          });
        }
      }, 1000);
    }
  };

  return (
    <motion.a
      href={link.url}
      target={link.name !== "Email" ? "_blank" : "_self"}
      rel={link.name !== "Email" ? "noopener noreferrer" : ""}
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className="group relative block"
    >
      {/* Contenedor principal */}
      <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500">
        
        {/* Fondo con gradiente animado */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${link.color} ${link.hoverColor} opacity-20 transition-all duration-500`}
          animate={isHovered && !isMobile ? {
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Efecto de escaneo láser - SOLO DESKTOP */}
        {!isMobile && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                exit={{ y: "200%" }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        )}

        {/* Partículas orbitales - SOLO DESKTOP */}
        {!isMobile && (
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${link.glowColor} 0%, transparent 70%)`,
                      left: "50%",
                      top: "50%"
                    }}
                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                    animate={{
                      scale: [0, 1, 0],
                      x: `calc(-50% + ${60 * Math.cos(i * Math.PI / 4)}px)`,
                      y: `calc(-50% + ${60 * Math.sin(i * Math.PI / 4)}px)`,
                    }}
                    exit={{ scale: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        )}

        {/* Contenido */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col items-center text-center min-h-[280px] sm:min-h-[320px] md:min-h-[340px] justify-center">
          
          {/* Icono con órbita */}
          <div className="relative mb-4 sm:mb-6">
            {/* Anillo orbital - SOLO DESKTOP */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 border-2 border-dashed rounded-full"
                style={{ borderColor: link.glowColor }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            )}
            
            {/* Icono principal */}
            <motion.div
              className="relative w-16 h-16 sm:w-20 sm:h-20 text-white p-3 sm:p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20"
              animate={isHovered && !isMobile ? {
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                boxShadow: isHovered && !isMobile ? `0 0 30px ${link.glowColor}` : `0 0 15px ${link.glowColor}`,
                filter: `drop-shadow(0 0 ${isHovered && !isMobile ? '20px' : '10px'} ${link.glowColor})`
              }}
            >
              {link.icon}
            </motion.div>

            {/* Punto orbital brillante - SOLO DESKTOP */}
            {!isMobile && (
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-white"
                style={{
                  boxShadow: `0 0 15px ${link.glowColor}`,
                  left: "50%",
                  top: "50%"
                }}
                animate={{
                  x: [20, -20, 20],
                  y: [20, -20, 20]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </div>

          {/* Nombre del contacto */}
          <motion.h3
            className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3"
            animate={isHovered && !isMobile ? { scale: 1.05 } : { scale: 1 }}
          >
            {link.name}
          </motion.h3>

          {/* Descripción */}
          <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
            {link.description}
          </p>

          {/* Botón de acción */}
          <motion.div
            className={`px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r ${link.color} ${link.hoverColor} rounded-full text-white font-semibold text-sm shadow-lg transition-all duration-300`}
            style={{
              boxShadow: isHovered && !isMobile ? `0 10px 40px ${link.glowColor}` : `0 5px 20px ${link.glowColor}`
            }}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
          >
            {link.name === "Email" ? "Escribir" : 
             link.name === "GitHub" ? "Ver Repos" : 
             "Conectar"}
            <motion.span
              className="inline-block ml-2"
              animate={!isMobile ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Efecto de brillo en los bordes - SOLO DESKTOP */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${link.glowColor} 0%, transparent 50%, ${link.glowColor} 100%)`,
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude"
            }}
          />
        )}
      </div>

      {/* Sombra proyectada - SOLO DESKTOP */}
      {!isMobile && (
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] h-6 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: link.glowColor }}
          animate={isHovered ? {
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.a>
  );
};

// Componente de formulario rápido
const QuickMessageForm = () => {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!formData.message) return;
    
    setIsSubmitting(true);
    
    const subject = encodeURIComponent(`Mensaje de ${formData.name || 'Visitante'}`);
    const body = encodeURIComponent(formData.message);
    window.location.href = `mailto:fmarort153@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", message: "" });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="max-w-2xl mx-auto mt-12 sm:mt-16"
    >
      <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10">
        <h4 className="text-white text-xl sm:text-2xl font-bold mb-2 text-center">
          Mensaje Rápido
        </h4>
        <p className="text-gray-400 text-center mb-6 text-sm">
          O escríbeme directamente desde aquí
        </p>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f55f17] transition-colors"
          />
          <textarea
            placeholder="Tu mensaje..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f55f17] transition-colors resize-none"
          />
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.message}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#f55f17] to-[#ff914d] text-white font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(245,95,23,0.5)] transition-all duration-300"
          >
            {isSubmitting ? "Abriendo cliente de email..." : "Enviar Mensaje"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(isMobileDevice());
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative py-12 sm:py-20 overflow-hidden">
      {/* Efectos de fondo - Optimizados */}
      {!isMobile && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" 
               style={{ animation: 'pulse 5s ease-in-out infinite' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f55f17]/10 rounded-full blur-[100px]" 
               style={{ animation: 'pulse 6s ease-in-out infinite' }} />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
 
          <div className="relative inline-block">
            <div className="absolute -inset-6 bg-gradient-to-r from-[#f55f17]/20 via-purple-600/20 to-blue-500/20 blur-3xl opacity-60" />
            <h2 className={`${styles.sectionHeadText} text-white relative z-10`}>
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Contac
              </span>
              <span className="bg-gradient-to-r from-[#f55f17] via-purple-500 to-blue-500 bg-clip-text text-transparent">
                to
              </span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            ¿Tienes un proyecto en mente o quieres colaborar? ¡Me encantaría saber de ti!
            <br className="hidden sm:block" />
            Puedes contactarme a través de cualquiera de estas plataformas.
          </motion.p>
        </motion.div>

        {/* Grid de contactos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {socialLinks.map((link, index) => (
            <ContactCard 
              key={link.name} 
              link={link} 
              index={index}
            />
          ))}
        </div>

        {/* Formulario rápido */}
        <QuickMessageForm />

        {/* Línea decorativa final */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 sm:mt-16 h-1 bg-gradient-to-r from-transparent via-[#f55f17] to-transparent rounded-full"
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");