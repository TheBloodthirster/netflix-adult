import React from 'react';
import { useScrollAnimation } from '../hooks/useImageLazyLoad';

function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  duration = 600 
}) {
  const { elementRef, isVisible } = useScrollAnimation();

  const getAnimationClass = () => {
    const baseClass = 'transition-all ease-out';
    const durationClass = `duration-${duration}`;
    
    switch (animation) {
      case 'fadeInUp':
        return `${baseClass} ${durationClass} ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`;
      case 'fadeInLeft':
        return `${baseClass} ${durationClass} ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-8'
        }`;
      case 'fadeInRight':
        return `${baseClass} ${durationClass} ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        }`;
      case 'scaleIn':
        return `${baseClass} ${durationClass} ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`;
      default:
        return `${baseClass} ${durationClass} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default AnimatedSection;
