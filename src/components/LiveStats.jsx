import React from 'react';
import { motion } from 'framer-motion';
import { useInView, useCounter } from '../hooks/useAnimations';

const StatCard = ({ icon, number, label, delay = 0 }) => {
  const [ref, isInView] = useInView(0.5);
  const [count, startCounter] = useCounter(number, 2000, delay);

  React.useEffect(() => {
    if (isInView) {
      startCounter();
    }
  }, [isInView, startCounter]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="bg-tertiary p-6 rounded-2xl text-center border border-gray-700 hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="text-white text-3xl font-bold mb-2">
        {count}{number > 50 ? '+' : ''}
      </div>
      <div className="text-secondary text-sm">{label}</div>    </motion.div>
  );
};

const LiveStats = () => {
  const stats = [
    { icon: '🚀', number: 50, label: 'Proyectos Completados' },
    { icon: '👥', number: 25, label: 'Clientes Satisfechos' },
    { icon: '💻', number: 15, label: 'Tecnologías Dominadas' },
    { icon: '⭐', number: 98, label: 'Satisfacción del Cliente' },
    { icon: '📈', number: 2, label: 'Años de Experiencia' },
    { icon: '🏆', number: 12, label: 'Certificaciones' }
  ];

  return (
    <div className="w-full py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-white text-4xl font-bold mb-4">Mi Trayectoria en Números</h2>
        <p className="text-secondary text-lg max-w-2xl mx-auto">
          Estas estadísticas reflejan mi compromiso y dedicación en el desarrollo web
        </p>
      </motion.div>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <StatCard
            key={`${stat.label}-${index}`}
            {...stat}
            delay={index * 200}
          />
        ))}
      </div>
    </div>
  );
};

export default LiveStats;
