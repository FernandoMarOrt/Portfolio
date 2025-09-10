import React, { useState } from 'react';

const ComputerFallback = ({ className = '', style = {} }) => {
  return (
    <div 
      className={`w-full h-screen flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-300 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-300 rounded-full blur-md animate-ping"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center text-white">
        <div className="mb-8">
          {/* CSS-based computer illustration */}
          <div className="inline-block relative">
            <div className="w-32 h-20 bg-gray-800 rounded-lg shadow-2xl mb-2 border-2 border-gray-600">
              <div className="w-full h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-md p-2">
                <div className="grid grid-cols-3 gap-1 h-full">
                  <div className="bg-white bg-opacity-20 rounded animate-pulse"></div>
                  <div className="bg-white bg-opacity-30 rounded animate-pulse delay-75"></div>
                  <div className="bg-white bg-opacity-20 rounded animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
            <div className="w-6 h-2 bg-gray-700 mx-auto rounded-sm"></div>
            <div className="w-24 h-1 bg-gray-600 mx-auto mt-1 rounded-full"></div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 animate-fade-in">
          Modo de Compatibilidad
        </h3>
        <p className="text-lg opacity-90 max-w-md mx-auto leading-relaxed">
          Tu dispositivo está usando una versión optimizada del portafolio para una mejor experiencia.
        </p>
        
        <div className="mt-6 text-sm opacity-75">
          <p>WebGL no disponible - Usando fallback CSS</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

const StarsFallback = ({ className = '' }) => {
  return (
    <div className={`stars-fallback ${className}`}>
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .stars-fallback {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000;
          z-index: -1;
        }

        .stars-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #f272c8;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

const WebGLErrorMessage = ({ error, onRetry, onForceWebGL, retryCount = 0 }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getErrorSuggestion = (error) => {
    const message = error?.message?.toLowerCase() || '';
    
    if (message.includes('webgl')) {
      return {
        title: "WebGL no está disponible",
        suggestions: [
          "Actualiza tu navegador a la última versión",
          "Actualiza los drivers de tu tarjeta gráfica",
          "Habilita la aceleración por hardware en tu navegador",
          "Intenta usar Chrome o Firefox"
        ]
      };
    }
    
    if (message.includes('context')) {
      return {
        title: "Error de contexto WebGL",
        suggestions: [
          "Cierra otras pestañas que usen WebGL",
          "Reinicia tu navegador",
          "Libera memoria cerrando aplicaciones pesadas"
        ]
      };
    }
    
    return {
      title: "Error de renderizado 3D",
      suggestions: [
        "Refresca la página",
        "Intenta en modo incógnito",
        "Desactiva extensiones del navegador temporalmente"
      ]
    };
  };

  const errorInfo = getErrorSuggestion(error);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto text-center shadow-2xl">
        <div className="text-yellow-500 text-5xl mb-4">⚠️</div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          {errorInfo.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          No se pudieron cargar las animaciones 3D. Puedes continuar usando la versión simplificada o intentar las siguientes soluciones:
        </p>

        <div className="text-left mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Soluciones recomendadas:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {errorInfo.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Recargar página
          </button>
          
          {retryCount < 3 && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Reintentar ({3 - retryCount} restantes)
            </button>
          )}
          
          <button
            onClick={onForceWebGL}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
          >
            Forzar WebGL
          </button>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          {showDetails ? 'Ocultar' : 'Ver'} detalles técnicos
        </button>

        {showDetails && error && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-left">
            <strong>Error:</strong> {error.message}<br/>
            <strong>Reintentos:</strong> {retryCount}<br/>
            <strong>Navegador:</strong> {navigator.userAgent.split(' ').pop()}<br/>
            <strong>WebGL:</strong> {(() => {
              try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                return gl ? 'Soportado' : 'No soportado';
              } catch (e) {
                return 'Error al detectar';
              }
            })()}
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          El sitio seguirá funcionando con una versión optimizada
        </p>
      </div>
    </div>
  );
};

export { ComputerFallback, StarsFallback, WebGLErrorMessage };
