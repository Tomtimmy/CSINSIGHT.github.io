import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

interface Slide {
  imageUrl: string;
  title: string;
  subtitle: string;
  link?: string;
  buttonText?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[60vh] max-h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <LazyImage 
            src={slide.imageUrl} 
            alt={slide.title} 
            className="w-full h-full" 
            imageClassName="object-cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-4 max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">{slide.title}</h1>
              <p className="mt-4 text-lg md:text-xl">{slide.subtitle}</p>
              {slide.link && slide.buttonText && (
                <Link to={slide.link} className="mt-8 inline-block bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition-transform transform hover:scale-105 duration-300 shadow-lg">
                  {slide.buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index ? 'bg-white' : 'bg-gray-400 hover:bg-gray-200'}`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
