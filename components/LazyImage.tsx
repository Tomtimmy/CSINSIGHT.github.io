import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string; // Applied to the wrapper div
  imageClassName?: string; // Applied to the img element itself
  style?: React.CSSProperties;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '', imageClassName = '', style }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative bg-light-bg overflow-hidden ${className}`} style={style}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${imageClassName}`}
        style={{ objectFit: 'cover' }} // A sensible default, can be overridden by imageClassName
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;