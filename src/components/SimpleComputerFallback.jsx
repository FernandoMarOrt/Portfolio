// Fallback simple sin hooks para testing inicial
import React from 'react';

const SimpleComputerFallback = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="text-center text-white">
        {/* Simple computer icon using CSS */}
        <div className="mb-8">
          <div className="inline-block relative">
            <div className="w-32 h-20 bg-gray-800 rounded-lg shadow-2xl mb-2 border-2 border-gray-600">
              <div className="w-full h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-md p-2">
                <div className="grid grid-cols-3 gap-1 h-full">
                  <div className="bg-white bg-opacity-20 rounded animate-pulse"></div>
                  <div className="bg-white bg-opacity-30 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="bg-white bg-opacity-20 rounded animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
            <div className="w-6 h-2 bg-gray-700 mx-auto rounded-sm"></div>
            <div className="w-24 h-1 bg-gray-600 mx-auto mt-1 rounded-full"></div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">Modo de Compatibilidad</h3>
        <p className="text-gray-300">WebGL no disponible - Usando versión optimizada</p>
      </div>
    </div>
  );
};

export default SimpleComputerFallback;
