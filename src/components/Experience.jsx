import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div className="tarjeta-info">
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
       {/* Estilos globales para la sección de experiencia */}
      <style>
        {`
          .tarjeta-info {
            background: #1d1836 !important;
          }
          .vertical-timeline-element-content {
            background: #1d1836 !important;
            color: #fff !important;
          }
          /* Optimizaciones móviles para performance */
          @media (max-width: 768px) {
            .vertical-timeline::before {
              will-change: auto !important;
            }
            .vertical-timeline-element {
              will-change: auto !important;
              transform: translateZ(0) !important;
            }
            .vertical-timeline-element-content {
              will-change: auto !important;
              transform: translateZ(0) !important;
            }
          }
        `}
      </style>
      <div>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Experiencia
        </h2>
      </div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline lineColor="#fff"> 
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
