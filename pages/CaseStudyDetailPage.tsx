
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioItems } from '../data/portfolioItems';
import LazyImage from '../components/LazyImage';

const CaseStudyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = portfolioItems.find(s => s.id === Number(id));

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary dark:text-white">Project Not Found</h1>
        <p className="mt-4 text-lg text-text-dark dark:text-gray-300">The project you are looking for does not exist.</p>
        <div className="mt-8">
            <Link to="/portfolio" className="inline-block px-8 py-3 rounded-md font-semibold text-center text-white bg-primary hover:bg-primary-hover transition-transform transform hover:scale-105 duration-300 shadow-lg">
                Back to Portfolio
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link to="/portfolio" className="text-primary dark:text-secondary font-semibold hover:underline mb-8 inline-block">
          &larr; Back to Portfolio
        </Link>
        
        <header>
          <h1 className="text-4xl font-extrabold text-primary dark:text-white sm:text-5xl leading-tight">{project.title}</h1>
        </header>
        
        <LazyImage 
          src={project.imageUrl} 
          alt={`Visual for ${project.title}`} 
          className="mt-8 w-full rounded-lg shadow-lg" 
          style={{ aspectRatio: '16/9' }} 
          imageClassName="rounded-lg object-cover"
        />

        <div className="mt-12 space-y-10 text-lg text-text-dark dark:text-gray-300 leading-relaxed border-t dark:border-gray-700 pt-8">
          <section aria-labelledby="challenge-heading">
            <h2 id="challenge-heading" className="text-3xl font-bold text-text-dark dark:text-white mb-4">The Challenge</h2>
            <p>{project.challenge}</p>
          </section>
          <section aria-labelledby="solution-heading">
            <h2 id="solution-heading" className="text-3xl font-bold text-text-dark dark:text-white mb-4">Our Solution</h2>
            <p>{project.solution}</p>
          </section>
          <section aria-labelledby="outcome-heading">
            <h2 id="outcome-heading" className="text-3xl font-bold text-text-dark dark:text-white mb-4">The Outcome</h2>
            <p>{project.outcome}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetailPage;