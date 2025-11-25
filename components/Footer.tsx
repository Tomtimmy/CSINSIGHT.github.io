
import React from 'react';
import { Link } from 'react-router-dom';
import { imagePaths } from '../data/imagePaths';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg dark:bg-gray-950 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link to="/" aria-label="C_S Insight Homepage">
              <img 
                src={imagePaths.footerLogo} 
                alt="C_S Insight and Solution Firm Logo" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Transforming complexity into clarity. We help organizations simplify data, strengthen systems, and achieve measurable growth.
            </p>
            <div className="mt-6">
                <p className="text-gray-300">No. 5, Eta Avenue, Oregun Ikeja.</p>
                <p className="text-gray-300">14 Ilupeju Street, Abule Egba, Lagos, Nigeria.</p>
                <p className="mt-2 text-gray-300">
                  Phone: <a href="tel:+2348132847661" className="hover:text-secondary">+234 813 284 7661</a>
                </p>
                <p className="text-gray-300">
                  Email: <a href="mailto:csinsightssolution@gmail.com" className="hover:text-secondary">csinsightssolution@gmail.com</a>
                </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold tracking-wider uppercase">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-secondary transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold tracking-wider uppercase">Follow Us</h4>
            <div className="mt-4 flex space-x-5">
              <SocialIcon href="https://www.facebook.com/profile.php?id=61582538803227&mibextid=rS40aB7S9Ucbxw6v">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/cs-insights-and-solution/">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/cs_insights_solutions?utm_source=qr&igsh=MW5tbTBkeWJiZHE1Mg==">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.161 16.95c.983.473 2.146.473 3.13 0a1.18 1.18 0 00.75-1.096c.01-1.31.01-3.64 0-4.95-.01-1.08-.43-1.68-1.45-1.85-.98-.17-2.1-.17-3.08 0-.97.16-1.4.74-1.45 1.85-.01 1.31-.01 3.64 0 4.95.01.62.33 1.01.75 1.096z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="https://x.com/CSinsightsSol?t=3IuQ4KZGRFaa-D1yIttB5g&s=09">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </SocialIcon>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} C_S Insight and Solution Firm. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
