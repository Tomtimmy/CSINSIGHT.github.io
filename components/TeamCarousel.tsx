

import React, { useState } from 'react';
import LazyImage from './LazyImage';

interface TeamMember {
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
}

interface TeamCarouselProps {
    teamMembers: TeamMember[];
}

const TeamCarousel: React.FC<TeamCarouselProps> = ({ teamMembers }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? teamMembers.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === teamMembers.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    if (!teamMembers || teamMembers.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="overflow-hidden relative h-[450px]">
                {teamMembers.map((leader, index) => (
                    <div
                        key={leader.name}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transitionDelay: `${index === currentIndex ? '0.2s' : '0s'}` }}
                    >
                        <div className={`bg-white dark:bg-gray-800 text-center p-8 rounded-lg shadow-lg flex flex-col items-center h-full transition-transform duration-500 ${index === currentIndex ? 'transform scale-100' : 'transform scale-95'}`}>
                            <LazyImage src={leader.imageUrl} alt={`Photo of ${leader.name}`} className="w-32 h-32 rounded-full mx-auto mb-5 ring-4 ring-secondary" imageClassName="object-cover rounded-full"/>
                            <h3 className="text-xl font-bold text-text-dark dark:text-white">{leader.name}</h3>
                            <p className="text-md font-semibold text-primary dark:text-secondary">{leader.title}</p>
                            <p className="mt-3 text-base text-text-dark dark:text-gray-300 flex-grow">{leader.bio}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Left Arrow */}
            <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-10 p-3 rounded-full bg-primary/50 text-white hover:bg-primary dark:bg-secondary/80 dark:text-primary dark:hover:bg-secondary transition-colors focus:outline-none" aria-label="Previous team member">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            {/* Right Arrow */}
            <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-10 p-3 rounded-full bg-primary/50 text-white hover:bg-primary dark:bg-secondary/80 dark:text-primary dark:hover:bg-secondary transition-colors focus:outline-none" aria-label="Next team member">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            <div className="flex justify-center mt-4 space-x-2">
                {teamMembers.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === slideIndex ? 'bg-primary dark:bg-secondary' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default TeamCarousel;