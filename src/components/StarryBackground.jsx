import React, { useState, useEffect } from 'react';

const StarryBackground = ({ isActive = true, starCount = 100 }) => {
  const [shouldRender, setShouldRender] = useState(isActive);
  const [isVisible, setIsVisible] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      // Ocultar inmediatamente cuando se desactiva
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!shouldRender) return null;

  return (
    <div className={`starry-background ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="stars-container">
        {[...Array(starCount)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              // Puntos blancos
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .starry-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #101010 100%);
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          /* Optimización para mejor scroll */
          transform: translateZ(0);
          will-change: opacity;
        }

        .starry-background.visible {
          opacity: 1;
        }

        .starry-background.hidden {
          opacity: 0;
        }

        .stars-container {
          position: relative;
          width: 100%;
          height: 100%;
          /* Optimización GPU */
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .star {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          animation: twinkle linear infinite;
          transform: translateZ(0);
          will-change: opacity, transform;
        }

        /* Variaciones sutiles de blanco para más naturalidad */
        .star:nth-child(3n) {
          background: #f8f8f8;
        }

        .star:nth-child(4n) {
          background: #ffffff;
        }

        .star:nth-child(5n) {
          background: #fafafa;
        }

        @keyframes twinkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0.5) translateZ(0); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1) translateZ(0); 
          }
        }

        /* Optimización para dispositivos móviles */
        @media (max-width: 768px) {
          .star {
            animation-duration: 4s !important;
          }
        }

        /* Reducir animaciones si el usuario lo prefiere */
        @media (prefers-reduced-motion: reduce) {
          .star {
            animation: none !important;
            opacity: 0.7;
          }
          
          .starry-background {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StarryBackground;
