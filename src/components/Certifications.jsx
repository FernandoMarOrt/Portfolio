import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

const certifications = [
  {
    title: "Angular Developer Certification",
    issuer: "Google Developers",
    date: "2024",
    credentialId: "GD-2024-ANG-001",
    image: "/path/to/angular-cert.png", // Añadir imagen real
    skills: ["Angular", "TypeScript", "RxJS"],
    color: "from-red-500 to-pink-500"
  },
  {
    title: "Full Stack Web Developer",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-2023-FULL-002",
    image: "/path/to/freecodecamp-cert.png",
    skills: ["React", "Node.js", "MongoDB"],
    color: "from-green-500 to-blue-500"
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-2023-JS-003",
    image: "/path/to/js-cert.png",
    skills: ["JavaScript", "Algorithms", "Data Structures"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2022",
    credentialId: "FCC-2022-RWD-004",
    image: "/path/to/rwd-cert.png",
    skills: ["HTML", "CSS", "Flexbox", "Grid"],
    color: "from-purple-500 to-indigo-500"
  }
];

const CertificationCard = ({ certification, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className="bg-tertiary p-6 rounded-2xl border border-gray-700 hover:border-primary/50 transition-all duration-300 group"
  >
    <div className="relative mb-6">
      {/* Badge superior con fecha */}
      <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-3 py-1 rounded-full z-10">
        {certification.date}
      </div>
      
      {/* Imagen del certificado */}
      <div className={`w-full h-48 bg-gradient-to-br ${certification.color} rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
        <div className="text-white text-center">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-sm font-semibold">{certification.issuer}</div>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-white text-xl font-bold leading-tight">
        {certification.title}
      </h3>
      
      <div className="text-secondary text-sm space-y-1">
        <p><span className="font-semibold">Emisor:</span> {certification.issuer}</p>
        <p><span className="font-semibold">ID:</span> {certification.credentialId}</p>
      </div>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2">
        {certification.skills.map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="bg-gray-700/50 text-white text-xs px-3 py-1 rounded-full border border-gray-600"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Botón de verificación */}
      <button className="w-full mt-4 bg-gradient-to-r from-primary to-orange-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-semibold">
        Verificar Certificado
      </button>
    </div>
  </motion.div>
);

const Certifications = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Mis logros</p>
        <h2 className={styles.sectionHeadText}>Certificaciones</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Estas certificaciones representan mi compromiso con el aprendizaje continuo 
        y mi dedicación por mantenerme actualizado con las últimas tecnologías y 
        mejores prácticas del desarrollo web.
      </motion.p>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((certification, index) => (
          <CertificationCard
            key={`certification-${index}`}
            index={index}
            certification={certification}
          />
        ))}
      </div>

      {/* Sección de estadísticas */}
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-16 bg-tertiary rounded-2xl p-8 border border-gray-700"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-primary text-3xl font-bold">{certifications.length}</div>
            <div className="text-secondary text-sm">Certificaciones</div>
          </div>
          <div>
            <div className="text-primary text-3xl font-bold">2</div>
            <div className="text-secondary text-sm">Años Estudiando</div>
          </div>
          <div>
            <div className="text-primary text-3xl font-bold">15+</div>
            <div className="text-secondary text-sm">Cursos Completados</div>
          </div>
          <div>
            <div className="text-primary text-3xl font-bold">100h</div>
            <div className="text-secondary text-sm">Horas de Estudio</div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");
