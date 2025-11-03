
import React, { useState, useMemo } from 'react';
import CaseStudyCard from '../components/CaseStudyCard';
import HeroCarousel from '../components/HeroCarousel';
import { imagePaths } from '../data/imagePaths';
import { portfolioItems } from '../data/portfolioItems';

const achievements = [
  {
    metric: '30%',
    description: 'Reduction in operational costs for our clients.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
    ),
  },
  {
    metric: '50%',
    description: 'Improvement in data reporting accuracy.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
    ),
  },
  {
    metric: 'Faster',
    description: 'Project delivery timelines achieved.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
];

const portfolioSlides = [
  {
    imageUrl: imagePaths.portfolioHero1,
    title: 'Our Portfolio',
    subtitle: 'Demonstrating our impact through tangible results.',
  },
  {
    imageUrl: imagePaths.portfolioHero2,
    title: '30% Reduction in Operational Costs',
    subtitle: 'See how we streamlined the supply chain for a manufacturing giant.',
    link: '/portfolio/1',
    buttonText: 'View Project'
  },
  {
    imageUrl: imagePaths.portfolioHero3,
    title: '50% Improvement in Data Accuracy',
    subtitle: 'Discover our data-driven strategy for a retail startup.',
    link: '/portfolio/2',
    buttonText: 'View Project'
  }
];

const CaseStudiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => 
    ['All', ...new Set(portfolioItems.map(item => item.category))]
  , []);

  const filteredPortfolioItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return portfolioItems;
    }
    return portfolioItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);


  return (
    <div className="bg-white dark:bg-gray-900">
      <HeroCarousel slides={portfolioSlides} />
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <section aria-labelledby="achievements-heading">
            <h2 id="achievements-heading" className="sr-only">Our Achievements</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
                {achievements.map((item, index) => (
                <div key={index} className="bg-light-bg dark:bg-gray-800 p-8 rounded-lg shadow-md">
                    <div className="flex justify-center items-center mb-4">{item.icon}</div>
                    <p className="text-4xl font-bold text-primary dark:text-white">{item.metric}</p>
                    <p className="mt-2 text-lg text-text-dark dark:text-gray-300">{item.description}</p>
                </div>
                ))}
            </div>
            </section>

            <section aria-labelledby="explore-work-heading">
            <div className="text-center">
              <h2 id="explore-work-heading" className="text-3xl font-bold text-text-dark dark:text-white">Explore Our Work</h2>
              <p className="mt-2 text-lg text-text-dark dark:text-gray-300 max-w-2xl mx-auto">
                Filter by service category to see how we've helped clients tackle their specific challenges.
              </p>
            </div>

            {/* Filtering Buttons */}
            <div className="flex justify-center flex-wrap gap-3 my-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-primary text-white dark:bg-secondary dark:text-primary shadow-md'
                      : 'bg-white text-primary border border-primary hover:bg-light-bg dark:bg-gray-800 dark:text-secondary dark:border-secondary dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredPortfolioItems.map((item) => (
                <CaseStudyCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                />
                ))}
            </div>
            </section>

            <section className="mt-16 sm:mt-24 text-center">
                <h2 className="text-3xl font-bold text-text-dark dark:text-white sm:text-4xl">Our Tailored Approach</h2>
                <p className="mt-4 text-lg text-text-dark dark:text-gray-300 max-w-3xl mx-auto">
                    Our case studies demonstrate how we’ve helped clients achieve remarkable outcomes. Each story showcases our tailored approach — combining insight, innovation, and execution excellence to solve unique challenges and unlock new opportunities.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPage;