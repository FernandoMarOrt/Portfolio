import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

import htmlIcon from '../assets/tech/html.png';
import cssIcon from '../assets/tech/css.png';
import javascriptIcon from '../assets/tech/javascript.png';
import typescriptIcon from '../assets/tech/typescript.png';
import tailwindIcon from '../assets/tech/tailwind.png';
import nodejsIcon from '../assets/tech/nodejs.png';
import angularIcon from '../assets/tech/angular.png';
import netIcon from '../assets/tech/net.png';
import csharpIcon from '../assets/tech/csharp.png';
import gitIcon from '../assets/tech/git.png';
import dockerIcon from '../assets/tech/docker.png';
import figmaIcon from '../assets/tech/figma.png';
import postgreIcon from '../assets/tech/postgre.png';
import mysqlIcon from '../assets/tech/mysql.png';
import visualestudioIcon from '../assets/tech/visualestudio.png';
import postmanIcon from '../assets/tech/postman.png';

const technologies = [
  { name: "HTML 5", icon: htmlIcon },
  { name: "CSS 3", icon: cssIcon },
  { name: "JavaScript", icon: javascriptIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "C#", icon: csharpIcon },
  { name: "Node JS", icon: nodejsIcon },
  { name: "Angular", icon: angularIcon },
  { name: ".NET", icon: netIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Git", icon: gitIcon },
  { name: "Docker", icon: dockerIcon },
  { name: "Figma", icon: figmaIcon },
  { name: "PostgreSQL", icon: postgreIcon },
  { name: "MySQL", icon: mysqlIcon },
  { name: "Visual Studio", icon: visualestudioIcon },
  { name: "Postman", icon: postmanIcon },
];
const Tech = () => {
  return (
    <>
    <motion.div variants={textVariant()} className="flex justify-center mb-8">
        <h2 className={styles.sectionHeadText}>Tecnologías y Herramientas</h2>
    </motion.div>

      <div className='flex flex-row flex-wrap justify-center gap-10'>
        <div className="p-6 rounded-xl border border-gray-700">
          <ul className="flex flex-row flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <li key={tech.name} className="flex flex-col items-center">
                <img src={tech.icon} alt={tech.name} className="w-28 h-28" />
                <p className="text-white text-sm mt-2">{tech.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
