import React, { useState, useEffect } from 'react';
import { usePerformanceOptimization } from '../hooks/useAnimations';

const WebGLInfoPanel = ({ isVisible, onClose }) => {
  const [webglInfo, setWebglInfo] = useState(null);
  const optimization = usePerformanceOptimization();

  useEffect(() => {
    if (isVisible) {
      const getWebGLInfo = () => {
        try {
          const canvas = document.createElement('canvas');
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
          
          if (!gl) {
            return { supported: false };
          }

          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          const info = {
            supported: true,
            version: gl.getParameter(gl.VERSION),
            vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
            renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
            maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
            maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
            extensions: gl.getSupportedExtensions(),
            webgl2: !!document.createElement('canvas').getContext('webgl2')
          };

          canvas.remove();
          return info;
        } catch (error) {
          return { supported: false, error: error.message };
        }
      };

      setWebglInfo(getWebGLInfo());
    }
  }, [isVisible]);

  if (!isVisible || !webglInfo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Información WebGL y Rendimiento
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Performance Status */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">
                Estado del Rendimiento
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Nivel de rendimiento:</span>
                  <span className={`font-medium ${
                    optimization.performanceLevel === 'high' ? 'text-green-600' :
                    optimization.performanceLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {optimization.performanceLevel === 'high' ? 'Alto' :
                     optimization.performanceLevel === 'medium' ? 'Medio' : 'Bajo'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Usar 3D:</span>
                  <span className={optimization.shouldUse3D ? 'text-green-600' : 'text-red-600'}>
                    {optimization.shouldUse3D ? '✅ Sí' : '❌ No'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Dispositivo de gama baja:</span>
                  <span className={optimization.isLowEnd ? 'text-red-600' : 'text-green-600'}>
                    {optimization.isLowEnd ? '⚠️ Sí' : '✅ No'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Movimiento reducido:</span>
                  <span className={optimization.reducedMotion ? 'text-yellow-600' : 'text-green-600'}>
                    {optimization.reducedMotion ? '⚠️ Activado' : '✅ Desactivado'}
                  </span>
                </div>
              </div>
            </div>

            {/* WebGL Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">
                Capacidades WebGL
              </h3>
              
              {webglInfo.supported ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>WebGL 1.0:</span>
                    <span className="text-green-600">✅ Soportado</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>WebGL 2.0:</span>
                    <span className={webglInfo.webgl2 ? 'text-green-600' : 'text-yellow-600'}>
                      {webglInfo.webgl2 ? '✅ Soportado' : '⚠️ No soportado'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Aceleración hardware:</span>
                    <span className={optimization.hasHardwareAcceleration ? 'text-green-600' : 'text-red-600'}>
                      {optimization.hasHardwareAcceleration ? '✅ Activa' : '❌ Inactiva'}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div><strong>Versión:</strong> {webglInfo.version}</div>
                      <div><strong>Proveedor:</strong> {webglInfo.vendor}</div>
                      <div><strong>Renderizador:</strong> {webglInfo.renderer}</div>
                      <div><strong>Tamaño máximo textura:</strong> {webglInfo.maxTextureSize}px</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-red-600 text-sm">
                  ❌ WebGL no está disponible
                  {webglInfo.error && (
                    <div className="text-xs mt-1 text-gray-500">
                      Error: {webglInfo.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-semibold text-gray-700 mb-3">
              Recomendaciones
            </h3>
            
            <div className="text-sm text-gray-600 space-y-2">
              {!optimization.shouldUse3D && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <strong>📱 Modo optimizado activo:</strong> Se está usando una versión simplificada para mejor rendimiento.
                </div>
              )}
              
              {!optimization.hasHardwareAcceleration && (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <strong>⚠️ Sin aceleración hardware:</strong> Actualiza los drivers de tu tarjeta gráfica para mejor rendimiento.
                </div>
              )}
              
              {optimization.reducedMotion && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <strong>🔄 Movimiento reducido:</strong> Has configurado tu sistema para reducir animaciones.
                </div>
              )}
              
              {optimization.performanceLevel === 'high' && optimization.shouldUse3D && (
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <strong>🚀 Rendimiento óptimo:</strong> Tu dispositivo puede mostrar todas las animaciones 3D.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebGLInfoPanel;
