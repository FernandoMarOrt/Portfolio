import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  figma,
  docker,
  villacarrillo,
  freelancer,
  bimaxpro,
  carrent,
  jobit,
  tripguide,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Sobre mi",
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
    icon: web,
  },
  {
    title: "Desarrollador Angular",
    icon: mobile,
  },
  {
    title: "Desarrollador Backend",
    icon: backend,
  },
  {
    title: "Desarrollador .NET",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Técnico Informático",
    company_name: "Ayuntamiento de Villacarrillo",
    icon: villacarrillo,
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
    icon: freelancer,
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
    title: "Desarrollador Web",
    company_name: "Bimaxpro",
    icon: bimaxpro,
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
    name: "Style Barber",
    description:
      "Plataforma web que permite a los usuarios buscar, reservar y gestionar servicios de barbería de varios proveedores, proporcionando una solución conveniente y eficiente para el cuidado personal.",
    tags: [
      {
        name: "HTML",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Aplicación web que permite a los usuarios buscar ofertas de trabajo, ver rangos salariales estimados para posiciones y localizar trabajos disponibles basándose en su ubicación actual.",
    tags: [
      {
        name: "HTML",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "Una plataforma integral de reservas de viajes que permite a los usuarios reservar vuelos, hoteles y autos de alquiler, y ofrece recomendaciones seleccionadas para destinos populares.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
