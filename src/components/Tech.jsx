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

const technologies = [
  { name: "HTML 5", icon: htmlIcon },
  { name: "CSS 3", icon: cssIcon },
  { name: "JavaScript", icon: javascriptIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "Tailwind CSS", icon: tailwindIcon },
  { name: "Node JS", icon: nodejsIcon },
  { name: "Angular", icon: angularIcon },
];
const Tech = () => {
  return (
    <>
    <motion.div variants={textVariant()} className="flex justify-center">
        <h2 className={styles.sectionHeadText}>Tecnologías</h2>
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
