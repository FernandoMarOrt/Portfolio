import React, { Suspense, useState, useEffect, Component } from 'react';
import { usePerformanceOptimization } from '../hooks/useAnimations';
import { WebGLErrorMessage } from '../components/FallbackCanvas';
import { GeneralLoader } from '../components/Loader';

// @refresh reset

// Simple Error Boundary implementation
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || this.props.children;
    }

    return this.props.children;
  }
}

const withWebGLFallback = (CanvasComponent, FallbackComponent, options = {}) => {
  const {
    enablePerformanceMode = true,
    enableErrorRecovery = true,
    loadingComponent: LoadingComponent = null,
    showDebugInfo = false
  } = options;

  return function WebGLEnhancedComponent(props) {
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [forceWebGL, setForceWebGL] = useState(false);
    const [debugVisible, setDebugVisible] = useState(false);

    const {
      shouldUse3D,
      performanceLevel,
      webgl1,
      webgl2,
      hasHardwareAcceleration,
      recommendFallback,
      isLoading,
      reducedMotion
    } = usePerformanceOptimization();

    useEffect(() => {
      // Reset error on performance optimization changes
      if (!isLoading) {
        setError(null);
      }
    }, [isLoading, shouldUse3D]);

    const handleError = (error, errorInfo) => {
      console.error('WebGL Canvas Error:', error, errorInfo);
      setError(error);
      
      // Send error analytics if available
      if (window.gtag) {
        window.gtag('event', 'webgl_error', {
          error_message: error.message,
          webgl_support: webgl1 ? 'webgl1' : 'none',
          hardware_acceleration: hasHardwareAcceleration,
          retry_count: retryCount
        });
      }
    };

    const handleRetry = () => {
      setError(null);
      setRetryCount(prev => prev + 1);
    };

    const handleForceWebGL = () => {
      setForceWebGL(true);
      setError(null);
    };

    // Show loading state
    if (isLoading) {
      return LoadingComponent ? <LoadingComponent /> : (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900">
          <GeneralLoader message="Detectando capacidades del dispositivo..." />
        </div>
      );
    }

    // Show error recovery UI
    if (error && enableErrorRecovery) {
      return (
        <WebGLErrorMessage 
          error={error} 
          onRetry={handleRetry}
          onForceWebGL={handleForceWebGL}
          retryCount={retryCount}
        />
      );
    }

    // Determine which component to render
    const shouldUseFallback = (recommendFallback && !forceWebGL) || reducedMotion || error;

    // Performance-optimized props for Canvas
    const optimizedProps = {
      ...props,
      performanceLevel,
      gl: {
        alpha: true,
        antialias: performanceLevel === 'high',
        powerPreference: performanceLevel === 'low' ? 'low-power' : 'high-performance',
        failIfMajorPerformanceCaveat: performanceLevel === 'high',
        preserveDrawingBuffer: false,
        ...props.gl
      }
    };

    return (
      <div className="relative">
        {shouldUseFallback ? (
          <FallbackComponent {...props} />
        ) : (
          <ErrorBoundary
            onError={handleError}
            fallback={<FallbackComponent {...props} />}
          >
            <Suspense 
              fallback={LoadingComponent ? <LoadingComponent /> : <GeneralLoader message="Cargando 3D..." />}
            >
              <CanvasComponent {...optimizedProps} />
            </Suspense>
          </ErrorBoundary>
        )}

        {/* Debug Panel */}
        {showDebugInfo && (
          <>
            <button
              onClick={() => setDebugVisible(!debugVisible)}
              className="fixed top-4 right-4 z-50 bg-black bg-opacity-50 text-white p-2 rounded text-xs"
            >
              Debug WebGL
            </button>
            
            {debugVisible && (
              <div className="fixed top-16 right-4 z-50 bg-black bg-opacity-90 text-white p-4 rounded text-xs max-w-xs">
                <h4 className="font-bold mb-2">WebGL Info</h4>
                <div className="space-y-1">
                  <div>WebGL 1.0: {webgl1 ? '✅' : '❌'}</div>
                  <div>WebGL 2.0: {webgl2 ? '✅' : '❌'}</div>
                  <div>Hardware: {hasHardwareAcceleration ? '✅' : '❌'}</div>
                  <div>Performance: {performanceLevel}</div>
                  <div>Using: {shouldUseFallback ? 'Fallback' : '3D'}</div>
                  <div>Reduced Motion: {reducedMotion ? '✅' : '❌'}</div>
                  {error && <div className="text-red-400">Error: {error.message}</div>}
                </div>
                
                {shouldUseFallback && !forceWebGL && (
                  <button
                    onClick={handleForceWebGL}
                    className="mt-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Force WebGL
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  };
};

export default withWebGLFallback;
