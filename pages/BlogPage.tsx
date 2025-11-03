
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import LazyImage from '../components/LazyImage';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredPosts = useMemo(() => blogPosts.slice(0, 3), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  const categories = useMemo(() => ['All', ...new Set(blogPosts.map(p => p.category))], []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="bg-light-bg dark:bg-gray-900">
      {/* Hero Carousel Section */}
      <section className="relative h-96 w-full overflow-hidden">
        {featuredPosts.map((post, index) => (
          <div
            key={post.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <LazyImage src={post.imageUrls[0]} alt={post.title} className="w-full h-full" imageClassName="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white p-4 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold">{post.title}</h1>
                <p className="mt-4 text-lg">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-hover transition-colors duration-300">
                  Read Full Story
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {featuredPosts.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}></button>
            ))}
        </div>
      </section>

      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-primary dark:text-white sm:text-5xl">Blog & Thought Leadership</h2>
            <p className="mt-4 text-xl text-text-dark dark:text-gray-300">
              Industry insights, research updates, and practical advice on data management, business transformation, and operational leadership.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-secondary"
              />
            </div>
            <div className="flex justify-center flex-wrap gap-2 mt-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white dark:bg-secondary dark:text-primary'
                      : 'bg-white text-text-dark hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <LazyImage src={post.imageUrls[0]} alt={post.title} className="w-full h-48" imageClassName="object-cover"/>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                        <p className="text-sm font-semibold text-secondary uppercase">{post.category}</p>
                        <h3 className="mt-2 text-xl font-bold text-text-dark dark:text-white">{post.title}</h3>
                        <p className="mt-3 text-base text-text-dark dark:text-gray-300">{post.excerpt}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                      <Link to={`/blog/${post.id}`} className="font-semibold text-primary dark:text-secondary hover:text-primary-hover dark:hover:text-secondary-hover">
                        Read More &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="md:col-span-2 lg:col-span-3 text-center text-lg text-text-dark dark:text-gray-300">
                No articles found. Try adjusting your search or filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;