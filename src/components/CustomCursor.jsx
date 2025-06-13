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
  if (window.innerWidth <= 768) return null;

  return (
    <>
      {/* Cursor principal */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-all duration-150 ${
            isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Cursor de seguimiento */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-8 h-8 border-2 border-primary rounded-full transition-all duration-300 ${
            isHovering ? 'scale-200 border-orange-500' : 'scale-100'
          } ${isClicking ? 'scale-50' : ''}`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
