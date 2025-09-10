import React, { useState } from 'react';
import { usePerformanceOptimization } from '../hooks/useAnimations';
import WebGLInfoPanel from './WebGLInfoPanel';

const PerformanceIndicator = () => {
  const [showInfo, setShowInfo] = useState(false);
  const optimization = usePerformanceOptimization();

  // Only show in development or if there are performance issues
  const shouldShow = process.env.NODE_ENV === 'development' || 
                    optimization.recommendFallback || 
                    !optimization.hasHardwareAcceleration;

  if (!shouldShow || optimization.isLoading) return null;

  const getIndicatorInfo = () => {
    if (!optimization.shouldUse3D) {
      return {
        level: 'fallback',
        color: 'bg-purple-500',
        text: 'Modo Compatibilidad',
        icon: '🔧'
      };
    }

    switch (optimization.performanceLevel) {
      case 'high':
        return {
          level: 'high',
          color: 'bg-green-500',
          text: 'Alto Rendimiento',
          icon: '🚀'
        };
      case 'medium':
        return {
          level: 'medium',
          color: 'bg-yellow-500',
          text: 'Rendimiento Medio',
          icon: '⚡'
        };
      case 'low':
        return {
          level: 'low',
          color: 'bg-red-500',
          text: 'Rendimiento Bajo',
          icon: '🐌'
        };
      default:
        return {
          level: 'unknown',
          color: 'bg-gray-500',
          text: 'Detectando...',
          icon: '❓'
        };
    }
  };

  const indicator = getIndicatorInfo();

  return (
    <>
      <div className="fixed top-4 left-4 z-50 group">
        <button
          onClick={() => setShowInfo(true)}
          className={`
            ${indicator.color} text-white px-3 py-2 rounded-lg shadow-lg
            text-xs font-bold uppercase tracking-wide
            hover:opacity-90 transition-all duration-200
            group-hover:scale-105 transform
            flex items-center gap-2
          `}
          title="Click para ver información detallada"
        >
          <span>{indicator.icon}</span>
          <span className="hidden sm:inline">{indicator.text}</span>
          <span className="sm:hidden">Perf</span>
        </button>

        {/* Tooltip for additional info */}
        <div className="
          absolute top-full left-0 mt-2 p-2 bg-black bg-opacity-80 text-white text-xs rounded
          opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
          w-48 z-60
        ">
          <div className="space-y-1">
            <div>WebGL: {optimization.webgl1 ? '✅' : '❌'}</div>
            <div>Hardware: {optimization.hasHardwareAcceleration ? '✅' : '❌'}</div>
            <div>3D: {optimization.shouldUse3D ? 'Activo' : 'Fallback'}</div>
            {optimization.reducedMotion && <div>🔄 Movimiento reducido</div>}
          </div>
        </div>
      </div>

      <WebGLInfoPanel 
        isVisible={showInfo}
        onClose={() => setShowInfo(false)}
      />
    </>
  );
};

export default PerformanceIndicator;
