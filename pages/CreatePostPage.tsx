
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

// Get unique categories from existing blog posts for the dropdown
const categories = [...new Set(blogPosts.map(p => p.category))];

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: categories[0] || 'General', // Default to the first existing category
    date: new Date().toISOString().split('T')[0], // Default to today
    imageUrls: '', // Storing as comma-separated string for simplicity
    content: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Basic validation
    if (!formData.title || !formData.excerpt || !formData.imageUrls || !formData.content) {
      setStatus('Please fill out all fields.');
      setIsSubmitting(false);
      return;
    }
    
    const newPost = {
      id: Date.now(), // Use timestamp for a unique ID in this simulation
      ...formData,
      imageUrls: formData.imageUrls.split(',').map(url => url.trim()), // Convert string to array
    };
    
    // In a real app, you would send this to a backend API.
    // For this simulation, we'll log it and show a success message.
    console.log('New Blog Post Created:', newPost);
    
    setStatus('Blog post created successfully! (This is a simulation). Redirecting to blog...');
    
    // Redirect after a delay
    setTimeout(() => {
      navigate('/blog');
    }, 2500);
  };
  
  const inputClasses = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary";

  return (
    <div className="bg-light-bg dark:bg-gray-900 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-primary dark:text-white sm:text-5xl text-center mb-8">Create New Blog Post</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={inputClasses} />
            </div>
             <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Excerpt</label>
              <textarea name="excerpt" id="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} required className={inputClasses}></textarea>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                   <select name="category" id="category" value={formData.category} onChange={handleChange} className={inputClasses}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    <option value="New Category">-- Add New Category --</option>
                  </select>
                </div>
                 <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className={inputClasses} />
                </div>
             </div>
             <div>
              <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URLs (comma-separated)</label>
              <input type="text" name="imageUrls" id="imageUrls" value={formData.imageUrls} onChange={handleChange} required placeholder="https://example.com/main.jpg, https://example.com/secondary.jpg" className={inputClasses} />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">The first URL will be used as the main featured image.</p>
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content (HTML allowed)</label>
                <textarea name="content" id="content" rows={12} value={formData.content} onChange={handleChange} required className={inputClasses}></textarea>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Use standard HTML tags like `&lt;p&gt;`, `&lt;h2&gt;`, `&lt;ul&gt;` for formatting. Use `[IMAGE-1]`, `[IMAGE-2]` to embed additional images.</p>
            </div>
            <div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Create Post'}
              </button>
            </div>
          </form>
          {status && <p className="mt-4 text-center text-primary dark:text-secondary font-semibold">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;