import React, { Suspense, Component } from 'react';
import { GeneralLoader } from '../components/Loader';

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
    console.error('WebGL Canvas Error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Simple WebGL detection function
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return false;
    
    // Check for software rendering
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      const softwareIndicators = ['swiftshader', 'llvmpipe', 'mesa', 'software'];
      const isSoftware = softwareIndicators.some(indicator => 
        renderer.toLowerCase().includes(indicator)
      );
      
      canvas.remove();
      return !isSoftware; // Return false if using software rendering
    }
    
    canvas.remove();
    return true;
  } catch (error) {
    console.warn('WebGL detection failed:', error);
    return false;
  }
};

const withSimpleWebGLFallback = (CanvasComponent, FallbackComponent) => {
  return function SimpleWebGLEnhancedComponent(props) {
    // Simple check - if WebGL is not available or is software rendered, use fallback
    if (!isWebGLAvailable()) {
      return <FallbackComponent {...props} />;
    }

    return (
      <ErrorBoundary 
        fallback={<FallbackComponent {...props} />}
        onError={(error) => {
          console.error('Canvas error, falling back:', error);
        }}
      >
        <Suspense fallback={<GeneralLoader message="Cargando 3D..." />}>
          <CanvasComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
};

export default withSimpleWebGLFallback;
