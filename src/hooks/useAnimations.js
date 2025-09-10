import { useEffect, useRef, useState } from 'react';

// Hook para Intersection Observer
export const useInView = (threshold = 0.1, rootMargin = '0px') => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Opcional: dejar de observar después de que sea visible
          // observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return [ref, isInView];
};



// Hook para scroll con throttle
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  return scrollPosition;
};

// Hook para animaciones con contador
export const useCounter = (target, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const startCounter = () => {
    if (hasStarted) return;
    setHasStarted(true);

    setTimeout(() => {
      const increment = target / (duration / 16); // 60fps
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= target) {
            clearInterval(timer);
            return target;
          }
          return Math.min(prev + increment, target);
        });
      }, 16);
    }, delay);
  };

  return [Math.floor(count), startCounter];
};

// Hook para preload de imágenes
export const useImagePreload = (images) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!images.length) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    images.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // También contar errores como "cargados"
      img.src = src;
    });
  }, [images]);

  return imagesLoaded;
};

// Hook para detección de WebGL y capacidades del dispositivo
export const useWebGLCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    webgl1: null,
    webgl2: null,
    hasHardwareAcceleration: null,
    maxTextureSize: null,
    vendor: null,
    renderer: null,
    isLowEnd: null,
    recommendFallback: null,
    isLoading: true
  });

  useEffect(() => {
    const detectWebGLCapabilities = () => {
      let webgl1 = false;
      let webgl2 = false;
      let hasHardwareAcceleration = false;
      let maxTextureSize = 0;
      let vendor = '';
      let renderer = '';
      let isLowEnd = false;

      try {
        // Test WebGL 1.0
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
          webgl1 = true;
          
          // Get renderer info
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '';
            renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
            
            // Check for software rendering indicators
            const softwareIndicators = [
              'swiftshader', 'llvmpipe', 'mesa', 'software', 'microsoft basic render'
            ];
            hasHardwareAcceleration = !softwareIndicators.some(indicator => 
              renderer.toLowerCase().includes(indicator)
            );
          }
          
          maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
          
          // Determine if device is low-end based on various factors
          isLowEnd = maxTextureSize < 4096 || 
                    renderer.toLowerCase().includes('intel') ||
                    /mobile|android|iphone|ipad/i.test(navigator.userAgent);
        }

        // Test WebGL 2.0
        const gl2 = canvas.getContext('webgl2');
        if (gl2) {
          webgl2 = true;
        }

        // Clean up
        canvas.remove();

      } catch (error) {
        console.warn('WebGL detection failed:', error);
      }

      const recommendFallback = !webgl1 || !hasHardwareAcceleration || isLowEnd;

      setCapabilities({
        webgl1,
        webgl2,
        hasHardwareAcceleration,
        maxTextureSize,
        vendor,
        renderer,
        isLowEnd,
        recommendFallback,
        isLoading: false
      });
    };

    detectWebGLCapabilities();
  }, []);

  return capabilities;
};

// Hook para detección de preferencias de usuario
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    darkMode: false
  });

  useEffect(() => {
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      darkMode: window.matchMedia('(prefers-color-scheme: dark)')
    };

    const updatePreferences = () => {
      setPreferences({
        reducedMotion: mediaQueries.reducedMotion.matches,
        highContrast: mediaQueries.highContrast.matches,
        darkMode: mediaQueries.darkMode.matches
      });
    };

    updatePreferences();

    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updatePreferences);
    });

    return () => {
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updatePreferences);
      });
    };
  }, []);

  return preferences;
};

// Hook combinado para optimización de rendimiento
export const usePerformanceOptimization = () => {
  const webglCapabilities = useWebGLCapabilities();
  const userPreferences = useUserPreferences();

  const shouldUse3D = !webglCapabilities.recommendFallback && 
                     !userPreferences.reducedMotion && 
                     !webglCapabilities.isLoading;

  const performanceLevel = webglCapabilities.isLowEnd ? 'low' : 
                          webglCapabilities.webgl2 ? 'high' : 'medium';

  return {
    ...webglCapabilities,
    ...userPreferences,
    shouldUse3D,
    performanceLevel
  };
};
