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

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #101010 100%)',
    zIndex: -1,
    pointerEvents: 'none',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    transform: 'translateZ(0)',
    willChange: 'opacity'
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  };

  const getStarStyle = (i) => ({
    position: 'absolute',
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${2 + Math.random() * 3}px`,
    height: `${2 + Math.random() * 3}px`,
    background: i % 3 === 0 ? '#f8f8f8' : i % 4 === 0 ? '#ffffff' : '#fafafa',
    borderRadius: '50%',
    animation: `starTwinkle ${2 + Math.random() * 3}s linear infinite`,
    animationDelay: `${Math.random() * 2}s`,
    transform: 'translateZ(0)',
    willChange: 'opacity, transform'
  });

  return (
    <>
      <style>{`
        @keyframes starTwinkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0.5) translateZ(0); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1) translateZ(0); 
          }
        }
        
        @media (max-width: 768px) {
          .starry-star {
            animation-duration: 4s !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .starry-star {
            animation: none !important;
            opacity: 0.7 !important;
          }
        }
      `}</style>
      <div style={backgroundStyle}>
        <div style={containerStyle}>
          {[...Array(starCount)].map((_, i) => (
            <div
              key={i}
              className="starry-star"
              style={getStarStyle(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StarryBackground;
