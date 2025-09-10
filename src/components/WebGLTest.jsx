// Test file to verify WebGL optimization system
import React from 'react';
import { 
  useWebGLCapabilities, 
  useUserPreferences, 
  usePerformanceOptimization 
} from '../hooks/useAnimations';

const WebGLTest = () => {
  const webglCaps = useWebGLCapabilities();
  const userPrefs = useUserPreferences();
  const optimization = usePerformanceOptimization();

  if (webglCaps.isLoading) {
    return <div>Detectando capacidades WebGL...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test de Optimización WebGL</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* WebGL Capabilities */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-3">Capacidades WebGL</h2>
          <div className="space-y-2 text-sm">
            <div>WebGL 1.0: {webglCaps.webgl1 ? '✅' : '❌'}</div>
            <div>WebGL 2.0: {webglCaps.webgl2 ? '✅' : '❌'}</div>
            <div>Hardware: {webglCaps.hasHardwareAcceleration ? '✅' : '❌'}</div>
            <div>Tamaño máx. textura: {webglCaps.maxTextureSize}px</div>
            <div>Gama baja: {webglCaps.isLowEnd ? '⚠️' : '✅'}</div>
            <div>Recomenda fallback: {webglCaps.recommendFallback ? '⚠️' : '✅'}</div>
            {webglCaps.vendor && <div>Proveedor: {webglCaps.vendor}</div>}
            {webglCaps.renderer && <div>Renderizador: {webglCaps.renderer}</div>}
          </div>
        </div>

        {/* User Preferences */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-3">Preferencias Usuario</h2>
          <div className="space-y-2 text-sm">
            <div>Movimiento reducido: {userPrefs.reducedMotion ? '✅' : '❌'}</div>
            <div>Alto contraste: {userPrefs.highContrast ? '✅' : '❌'}</div>
            <div>Modo oscuro: {userPrefs.darkMode ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* Optimization Results */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-3">Optimización Final</h2>
          <div className="space-y-2 text-sm">
            <div>Usar 3D: {optimization.shouldUse3D ? '✅' : '❌'}</div>
            <div>Nivel rendimiento: 
              <span className={`ml-1 font-bold ${
                optimization.performanceLevel === 'high' ? 'text-green-600' :
                optimization.performanceLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {optimization.performanceLevel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h2 className="font-bold mb-3">Recomendaciones</h2>
        <div className="text-sm space-y-2">
          {!optimization.shouldUse3D && (
            <div className="text-orange-600">
              ⚠️ Se recomienda usar fallbacks CSS para mejor compatibilidad
            </div>
          )}
          {!webglCaps.hasHardwareAcceleration && (
            <div className="text-red-600">
              🔧 Actualiza los drivers de tu tarjeta gráfica para mejor rendimiento
            </div>
          )}
          {optimization.performanceLevel === 'high' && (
            <div className="text-green-600">
              🚀 Tu dispositivo puede ejecutar todas las funciones 3D sin problemas
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebGLTest;
