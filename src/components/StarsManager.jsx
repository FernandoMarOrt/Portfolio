import React, { useState, useEffect, useRef } from 'react';
import StarsCanvas from './canvas/Stars';

const StarsManager = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    
    // Renderizar inmediatamente, solo un pequeño delay para evitar conflictos
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setShouldRender(true);
        setRenderKey(prev => prev + 1);
      }
    }, 10);

    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
    };
  }, []);

  // Reset cuando se desmonta
  useEffect(() => {
    return () => {
      setShouldRender(false);
      setRenderKey(0);
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <StarsCanvas key={`stars-${renderKey}-${Date.now()}`} />;
};

export default StarsManager;
