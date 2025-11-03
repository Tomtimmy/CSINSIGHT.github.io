import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { imagePaths } from '../data/imagePaths';
import ThemeToggleButton from './ThemeToggleButton';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '/contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = searchInputRef.current?.value;
    // In a real application, you would navigate to a search results page
    // e.g., navigate(`/search?q=${searchTerm}`);
    console.log('Searching for:', searchTerm);
    setIsSearchOpen(false);
  };


  const activeLinkClass = 'text-secondary font-semibold';
  const inactiveLinkClass = 'hover:text-primary dark:hover:text-secondary transition-colors duration-300';

  return (
    <header className={`bg-white dark:bg-gray-800 sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg dark:shadow-black/20' : 'shadow-md dark:shadow-black/20'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <div className="flex-shrink-0">
            <Link to="/" aria-label="C_S Insight Homepage">
              <img 
                src={imagePaths.logo} 
                alt="C_S Insight and Solution Firm Logo" 
                className="h-24 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `${isActive ? activeLinkClass : inactiveLinkClass} text-base`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-text-dark dark:text-gray-200 hover:bg-light-bg dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Open search bar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <ThemeToggleButton />
          </div>
          <div className="md:hidden flex items-center gap-2">
             <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-text-dark dark:text-gray-200 hover:bg-light-bg dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Open search bar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <ThemeToggleButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-dark dark:text-gray-200 hover:text-primary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${
                    isActive ? 'bg-primary text-white' : 'text-text-dark dark:text-gray-200 hover:bg-light-bg dark:hover:bg-gray-700'
                  } block px-3 py-2 rounded-md text-base font-medium`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
            className="fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4" 
            onClick={() => setIsSearchOpen(false)}
        >
          <div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search the site..."
                className="w-full pl-5 pr-12 py-4 text-lg border-2 border-primary dark:border-secondary rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-secondary/50 bg-white dark:bg-gray-800 text-text-dark dark:text-white"
              />
              <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-5" aria-label="Submit search">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </form>
          </div>
           <button 
                onClick={() => setIsSearchOpen(false)} 
                className="absolute top-6 right-6 text-text-dark dark:text-gray-300 hover:text-primary dark:hover:text-white"
                aria-label="Close search bar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>
      )}
    </header>
  );
};

export default Header;