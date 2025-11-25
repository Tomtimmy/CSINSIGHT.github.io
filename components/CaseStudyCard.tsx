
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import LazyImage from './LazyImage';

interface CaseStudyCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ id, title, description, imageUrl }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareButtonRef = useRef<HTMLDivElement>(null);

  const projectUrl = `${window.location.origin}/#/portfolio/${id}`;
  const encodedUrl = encodeURIComponent(projectUrl);
  const encodedTitle = encodeURIComponent(`Check out this project: ${title}`);

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const emailShareUrl = `mailto:?subject=${encodedTitle}&body=I%20found%20this%20interesting%20project:%20${encodedUrl}`;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (shareButtonRef.current && !shareButtonRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShareOpen(false);
      }
    };

    if (isShareOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isShareOpen]);


  return (
    <article className="bg-light-bg dark:bg-gray-800 rounded-lg shadow-lg flex flex-col text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      <LazyImage src={imageUrl} alt={`Visual representation for ${title}`} className="w-full h-56" imageClassName="object-cover" />
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">{title}</h3>
          <p className="text-text-dark dark:text-gray-300 leading-relaxed">{description}</p>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <Button to={`/portfolio/${id}`} variant="secondary">View Project Details</Button>
          
          <div className="relative" ref={shareButtonRef}>
            <button
              onClick={() => setIsShareOpen(!isShareOpen)}
              aria-haspopup="true"
              aria-expanded={isShareOpen}
              aria-label="Share this project"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
            </button>
            {isShareOpen && (
              <div 
                className="origin-top-right absolute right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="share-button"
              >
                <div className="py-1" role="none">
                  <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 text-sm text-text-dark dark:text-gray-200 hover:bg-light-bg dark:hover:bg-gray-600" role="menuitem">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                  </a>
                  <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 text-sm text-text-dark dark:text-gray-200 hover:bg-light-bg dark:hover:bg-gray-600" role="menuitem">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X (Twitter)
                  </a>
                   <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 text-sm text-text-dark dark:text-gray-200 hover:bg-light-bg dark:hover:bg-gray-600" role="menuitem">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                    Facebook
                  </a>
                   <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 text-sm text-text-dark dark:text-gray-200 hover:bg-light-bg dark:hover:bg-gray-600" role="menuitem">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.203 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    WhatsApp
                  </a>
                   <a href={emailShareUrl} className="flex items-center px-4 py-2 text-sm text-text-dark dark:text-gray-200 hover:bg-light-bg dark:hover:bg-gray-600" role="menuitem">
                    <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Email
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </article>
  );
};

export default CaseStudyCard;
