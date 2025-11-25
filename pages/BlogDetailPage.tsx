
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import LazyImage from '../components/LazyImage';

const processContent = (content: string, imageUrls: string[], title: string) => {
  let processed = content;
  // Start from the second image (index 1) for embedding
  imageUrls.slice(1).forEach((url, index) => {
    const imageTag = `<img src="${url}" alt="${title} - image ${index + 2}" class="my-8 rounded-lg shadow-xl w-full" loading="lazy" />`;
    processed = processed.replace(`[IMAGE-${index + 1}]`, imageTag);
  });
  return processed;
};

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === Number(id));
  const [copySuccess, setCopySuccess] = useState('');

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold text-primary dark:text-white">Blog Post Not Found</h1>
        <p className="mt-4 text-lg text-text-dark dark:text-gray-300">The article you are looking for does not exist.</p>
        <div className="mt-8">
            <Link to="/blog" className="inline-block px-8 py-3 rounded-md font-semibold text-center text-white bg-primary hover:bg-primary-hover transition-transform transform hover:scale-105 duration-300 shadow-lg">
                Back to Blog
            </Link>
        </div>
      </div>
    );
  }

  const postUrl = window.location.href;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);
  
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy: ', err);
        setCopySuccess('Failed');
        setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const processedContent = processContent(post.content, post.imageUrls, post.title);

  return (
    <div className="bg-white dark:bg-gray-900">
        <header className="relative">
            <LazyImage src={post.imageUrls[0]} alt={post.title} className="w-full h-96" imageClassName="object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-50"/>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-4 max-w-3xl">
                    <p className="text-lg font-semibold uppercase tracking-widest text-secondary">{post.category}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold mt-2">{post.title}</h1>
                    <p className="mt-4 text-lg text-gray-300">{post.date}</p>
                </div>
            </div>
        </header>

        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                 <Link to="/blog" className="text-primary dark:text-secondary font-semibold hover:underline mb-8 inline-block">
                  &larr; Back to All Articles
                </Link>

                {/* Social Share Section */}
                <div className="my-8 py-4 border-y dark:border-gray-700 flex flex-wrap items-center gap-4">
                    <span className="font-semibold text-text-dark dark:text-gray-200">Share this post:</span>
                    <div className="flex items-center gap-3">
                        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-secondary transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.16 2.33,6.96C2.33,8.43 3.07,9.73 4.17,10.43C3.47,10.4 2.82,10.21 2.22,9.88C2.22,9.9 2.22,9.91 2.22,9.92C2.22,12.03 3.72,13.79 5.74,14.22C5.38,14.31 5,14.36 4.6,14.36C4.32,14.36 4.05,14.33 3.79,14.28C4.33,16.08 6.02,17.38 8.01,17.42C6.52,18.57 4.66,19.22 2.68,19.22C2.32,19.22 1.97,19.2 1.62,19.12C3.62,20.42 5.96,21.19 8.49,21.19C16,21.19 20.33,14.93 20.33,9.3C20.33,9.12 20.33,8.94 20.32,8.75C21.14,8.17 21.87,7.44 22.46,6Z"/></svg>
                        </a>
                        <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-secondary transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.43 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,6 7.78,5.21 6.88,5.21A1.69,1.69 0 0,0 5.21,6.88C5.21,7.78 6,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/></svg>
                        </a>
                        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-secondary transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                        </a>
                        <button onClick={copyToClipboard} className="ml-2 px-3 py-1 text-sm border dark:border-gray-600 rounded-md hover:bg-light-bg dark:hover:bg-gray-700 transition-colors">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            {copySuccess || 'Copy Link'}
                          </span>
                        </button>
                    </div>
                </div>

                <div 
                    className="prose prose-lg max-w-none text-text-dark dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                />
            </div>
        </div>
    </div>
  );
};

export default BlogDetailPage;