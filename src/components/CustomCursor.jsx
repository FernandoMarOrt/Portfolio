import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      if (e.target.matches('a, button, .hover-target, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('a, button, .hover-target, [role="button"]')) {
        setIsHovering(false);
      }
    };

    // Solo en desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', updateMousePosition);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseover', handleMouseEnter);
      document.addEventListener('mouseout', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  // Solo mostrar en desktop
  if (window.innerWidth <= 768) return null;  return (
    <>
      {/* Cursor cohete - solo aparece cuando hay hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className={`transition-all duration-150 ${
              isClicking ? 'scale-75' : 'scale-100'
            }`}
          >
            {/* Cohete emoji */}
            <div className="text-2xl filter drop-shadow-lg animate-pulse">🚀</div>
          </div>
        </div>
      )}

      {/* Efecto de estela/trail del cohete - solo cuando hay hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-40"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className={`transition-all duration-500 opacity-60 ${
              isClicking ? 'scale-50' : 'scale-100'
            }`}
          >            {/* Estela de fuego/partículas */}
            <div className="relative">
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-sm opacity-60 animate-ping"></div>
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-md opacity-30"></div>
            </div>
          </div>        </div>
      )}
    </>
  );
};

export default CustomCursor;
