// Imágenes generales
import logo from "../assets/logo.svg";
import backend from "../assets/backend.png";
import creator from "../assets/creator.png";
import mobile from "../assets/angular.png";
import web from "../assets/web2.png";
import github from "../assets/github.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

export const generalImages = {
  logo,
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
};

// Imágenes de tecnologías
import css from "../assets/tech/css.png";
import docker from "../assets/tech/docker.png";
import figma from "../assets/tech/figma.png";
import git from "../assets/tech/git.png";
import html from "../assets/tech/html.png";
import javascript from "../assets/tech/javascript.png";
import nodejs from "../assets/tech/nodejs.png";
import reactjs from "../assets/tech/reactjs.png";
import tailwind from "../assets/tech/tailwind.png";
import typescript from "../assets/tech/typescript.png";
import angular from "../assets/tech/angular.png";
import net from "../assets/tech/net.png";
import csharp from "../assets/tech/csharp.png";
import postgre from "../assets/tech/postgre.png";
import mysql from "../assets/tech/mysql.png";
import visualestudio from "../assets/tech/visualestudio.png";
import postman from "../assets/tech/postman.png";

export const techImages = {
  css,
  docker,
  figma,
  git,
  html,
  javascript,
  nodejs,
  reactjs,
  tailwind,
  typescript,
  angular,
  net,
  csharp,
  postgre,
  mysql,
  visualestudio,
  postman,
};

// Imágenes de empresas
import bimaxpro from "../assets/company/bimaxpro.png";
import villacarrillo from "../assets/company/villacarrillo.png";
import freelancer from "../assets/company/freelancer.png";

export const companyImages = {
  bimaxpro,
  villacarrillo,
  freelancer,
};

// Imágenes de proyectos
import carrent from "../assets/tech/css.png";
import stylebarber from "../assets/works/stylebarber.webp";
import tripguide from "../assets/tech/css.png";

export const projectImages = {
  carrent,
  stylebarber,
  tripguide,
};


export const navLinks = [
  {
    id: "about",
    title: "Sobre mi",
  },
  {
    id: "tech",
    title: "Tecnologías",
  },
  {
    id: "work",
    title: "Experiencia",
  },
  {
    id: "projects",
    title: "Proyectos",
  },
  {
    id: "contact",
    title: "Contacto",
  },
];

const services = [
  {
    title: "Desarrollador Web",
    icon: generalImages.web,
  },
  {
    title: "Desarrollador Angular",
    icon: generalImages.mobile,
  },
  {
    title: "Desarrollador Backend",
    icon: generalImages.backend,
  },
  {
    title: "Desarrollador .NET",
    icon: generalImages.creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: techImages.html,
  },
  {
    name: "CSS 3",
    icon: techImages.css,
  },
  {
    name: "JavaScript",
    icon: techImages.javascript,
  },
  {
    name: "TypeScript",
    icon: techImages.typescript,
  },
  {
    name: "React JS",
    icon: techImages.reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: techImages.tailwind,
  },
  {
    name: "Node JS",
    icon: techImages.nodejs,
  },
  {
    name: "git",
    icon: techImages.git,
  },
  {
    name: "figma",
    icon: techImages.figma,
  },
  {
    name: "docker",
    icon: techImages.docker,
  },
];

const experiences = [
  {
    title: "Técnico Informático",
    company_name: "Ayuntamiento de Villacarrillo",
    icon: companyImages.villacarrillo,
    iconBg: "#E6DEDD",
    date: "Abril 2022 - Junio 2022",
    points: [
      "Mantenimiento y soporte técnico de equipos informáticos y redes en las dependencias municipales-",
      "Instalación y configuración de software y hardware para empleados del ayuntamiento.",
      "Resolución de incidencias relacionadas con sistemas operativos, aplicaciones y periféricos.",
      "Gestión y administración básica de servidores y bases de datos locales.",
    ],
  },
  {
    title: "Freenlancer Web Developer",
    company_name: "Freelance",
    icon: companyImages.freelancer,
    iconBg: "#E6DEDD",
    date: "Julio 2022 -  Septiembre 2024",
    points: [
      "Diseño y desarrollo de sitios web personalizados utilizando tecnologías modernas como React.js y Next.js.",
      "Optimización del rendimiento y la accesibilidad de las aplicaciones web para mejorar la experiencia del usuario.",
      "Mantenimiento y actualización de sitios web para garantizar su seguridad y compatibilidad con nuevas tecnologías.",
      "Comunicación directa con clientes para definir requisitos, proporcionar soluciones técnicas y garantizar la satisfacción del proyecto.",
    ],
  },
  {
    title: "Desarrollador Web Full Stack",
    company_name: "Bimaxpro",
    icon: companyImages.bimaxpro,
    iconBg: "#E6DEDD",
    date: "Octubre 2024 - Actualidad",
    points: [
      "Desarrollo e implementación de nuevas funcionalidades en aplicaciones web utilizando Angular, .NET, TypeScript y C#",
      "Mantenimiento y optimización del código existente para mejorar rendimiento y estabilidad.",
      "Diagnóstico y resolución de errores en aplicaciones web para garantizar un funcionamiento eficiente.",
      "Colaboración con equipos multidisciplinarios para definir requisitos y mejorar la experiencia del usuario.",
    ],
  }
];

const testimonials = [
  {
    testimonial:
      "Pensé que era imposible hacer un sitio web tan hermoso como nuestro producto, pero Fernando me demostró lo contrario.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Nunca he conocido a un desarrollador web que se preocupe tanto por el éxito de sus clientes como lo hace Fernando.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Después de que Fernando optimizó nuestro sitio web, nuestro tráfico aumentó en un 50%. ¡No podemos agradecerle lo suficiente!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "BitLock - (En desarrollo)",
    description:
      "Juego de caja fuerte intereactivo con pistas ocultas.",
    tags: [
       {
        name: "Astro",
        color: "orange-text-gradient",
      },
      {
        name: "TypeScript",
        color: "dark-blue-text-gradient",
      },
      {
        name: "CSS",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "yellow-text-gradient",
      },
    ],
    image: projectImages.carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "StyleBarber",
    description:
      "Página web para una barbería local que permite a los usuarios ver los servicios ofrecidos y sus locales",
    tags: [
       {
        name: "Astro",
        color: "orange-text-gradient",
      },
      {
        name: "TypeScript",
        color: "dark-blue-text-gradient",
      },
      {
        name: "CSS",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "yellow-text-gradient",
      },
    ],
    image: projectImages.stylebarber,
    source_code_link: "https://stylebarber.es/",
  },
  {
    name: "MyLedger - (En desarrollo)",
    description:
      "Aplicación móvil que permite al usuario crear y manejar gastos , presupuestos e ingresos.",
    tags: [
      {
        name: "React Native",
        color: "blue-text-gradient",
      },
        {
        name: "TypeScript",
        color: "dark-blue-text-gradient",
      },
      {
        name: "Expo",
        color: "pink-text-gradient",
      },
    ],
    image: projectImages.tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
