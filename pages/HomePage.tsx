
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import HeroCarousel from '../components/HeroCarousel';
import LazyImage from '../components/LazyImage';
import { imagePaths } from '../data/imagePaths';

// IMPORTANT: To connect this to your Google Sheet, create a Google Apps Script Web App.
// 1. Create a new Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Paste the provided script code for handling POST requests.
// 4. Deploy as a Web App with "Anyone" access.
// 5. Copy the Web App URL and paste it here.
const NEWSLETTER_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzB2oktCEY7edhwXSvn_qn6EgkIbhW1n_Gp1zA0JPx5MeFvUuuxhlR_H1oqARc8ul5LKA/exec';


const clientLogos = [
  { name: 'Aperture Science', imageUrl: 'https://i.imgur.com/v1s5nAz.png' },
  { name: 'Black Mesa', imageUrl: 'https://i.imgur.com/yGLpAbR.png' },
  { name: 'Stark Industries', imageUrl: 'https://i.imgur.com/3zM4iV9.png' },
  { name: 'Wayne Enterprises', imageUrl: 'https://i.imgur.com/nRLiT1A.png' },
  { name: 'Globex Corporation', imageUrl: 'https://i.imgur.com/gxsf02v.png' },
  { name: 'Cyberdyne Systems', imageUrl: 'https://i.imgur.com/C184a4w.png' },
  { name: 'Umbrella Corp', imageUrl: 'https://i.imgur.com/5nQ1vE9.png' },
];

const consultingExpertise = [
    {
        title: 'Strategic Consulting',
        description: 'We partner with you to develop clear, data-driven strategies that align with your long-term vision. Our collaborative approach ensures that the solutions we design are not only innovative but also practical and sustainable for your organization.',
        imageUrl: imagePaths.homeExpertiseStrategic,
    },
    {
        title: 'Operational Consulting',
        description: 'Our team excels at identifying inefficiencies and optimizing your core business processes. From supply chain management to internal workflows, we help you reduce costs, improve productivity, and enhance the quality of your service delivery.',
        imageUrl: imagePaths.homeExpertiseOperational,
    }
];

const coreServices = [
    {
        title: 'Project Management',
        description: 'End-to-end support to ensure your projects deliver on time and on budget.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
        link: '/services#project-management',
    },
    {
        title: 'Data Analytics',
        description: 'Simplifying complex data into clear insights that drive smarter decisions.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        link: '/services#data-analytics-business-intelligence',
    },
    {
        title: 'Strategy & Process',
        description: 'Designing agile strategies and frameworks that boost efficiency.',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
        link: '/services#strategy-process-improvement',
    }
];

const testimonials = [
  {
    quote: "C_S Insight transformed our data chaos into a clear, actionable strategy. Their expertise was a game-changer for our operational efficiency.",
    name: 'Jane Doe',
    company: 'CEO, Acme Corp',
  },
  {
    quote: "The project management support we received was exceptional. They kept us on schedule and under budget, delivering results beyond our expectations.",
    name: 'John Smith',
    company: 'Director of Operations, Stark Industries',
  },
  {
    quote: "Their team's ability to streamline our supply chain has had a lasting impact on our bottom line. We couldn't be happier with the partnership.",
    name: 'Emily Jones',
    company: 'Supply Chain Manager, Globex Corporation',
  },
];

const homeSlides = [
  {
    imageUrl: imagePaths.homeHero1,
    title: 'Transforming Complexity into Clarity',
    subtitle: 'We help organizations simplify data, strengthen systems, and achieve measurable growth.',
    link: '/about',
    buttonText: 'Learn More About Us'
  },
  {
    imageUrl: imagePaths.homeHero2,
    title: 'Actionable Insight, Measurable Impact',
    subtitle: 'From data analytics to process improvement, our solutions are tailored to deliver tangible results.',
    link: '/services',
    buttonText: 'Explore Our Services'
  },
  {
    imageUrl: imagePaths.homeHero3,
    title: 'Your Partner in Growth and Efficiency',
    subtitle: 'Whether you’re a startup or an established enterprise, we provide the expertise to drive you forward.',
    link: '/contact',
    buttonText: 'Book an Appointment'
  }
];


const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setMessage('Subscribing...');

    const formData = new FormData();
    formData.append('email', email);
    formData.append('timestamp', new Date().toISOString());

    try {
        const response = await fetch(NEWSLETTER_SCRIPT_URL, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            setMessage(`Thank you for subscribing! We've sent a confirmation to ${email}.`);
            setEmail('');
        } else {
            const data = await response.json();
            setMessage(data.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Newsletter submission error:', error);
        setMessage('An error occurred while subscribing. Please try again later.');
    } finally {
        setIsSubmitting(false);
        setTimeout(() => setMessage(''), 5000);
    }
  };


  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Carousel Section */}
      <HeroCarousel slides={homeSlides} />

      {/* Client Logos Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm font-bold uppercase text-gray-500 dark:text-gray-400 tracking-widest">
            Trusted by Leading Organizations
          </h2>
          <div
            className="w-full inline-flex flex-nowrap overflow-hidden mt-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          >
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:paused">
              {clientLogos.map((logo, index) => (
                <li key={index}>
                  <img src={logo.imageUrl} alt={logo.name} className="h-10 w-auto invert dark:invert-0" />
                </li>
              ))}
            </ul>
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:paused" aria-hidden="true">
              {clientLogos.map((logo, index) => (
                <li key={index}>
                  <img src={logo.imageUrl} alt={logo.name} className="h-10 w-auto invert dark:invert-0" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-light-bg dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-extrabold text-primary sm:text-4xl dark:text-white">Why Partner with C_S Insight?</h2>
                <p className="mt-4 text-lg text-text-dark dark:text-gray-300">We deliver more than just reports; we provide clarity, strategy, and results that matter.</p>
            </div>
            <div className="mt-16 grid gap-10 md:grid-cols-3">
                <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary mx-auto mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-text-dark dark:text-white">Data-Driven Strategy</h3>
                    <p className="mt-2 text-text-dark dark:text-gray-300">Our solutions are built on a foundation of rigorous data analysis, ensuring every decision is informed and impactful.</p>
                </div>
                 <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary mx-auto mb-5">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-text-dark dark:text-white">Tailored Solutions</h3>
                    <p className="mt-2 text-text-dark dark:text-gray-300">We understand that every organization is unique. We craft bespoke strategies that align perfectly with your specific goals.</p>
                </div>
                 <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary mx-auto mb-5">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-text-dark dark:text-white">Measurable Impact</h3>
                    <p className="mt-2 text-text-dark dark:text-gray-300">Our success is measured by yours. We focus on delivering tangible outcomes that improve efficiency and drive growth.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Our Consulting Expertise Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-extrabold text-primary sm:text-4xl dark:text-white">Our Consulting Expertise</h2>
                  <p className="mt-4 text-lg text-text-dark dark:text-gray-300">We provide tailored consulting services designed to tackle your most complex challenges and unlock sustainable growth.</p>
              </div>
              <div className="mt-16 space-y-16">
                  {consultingExpertise.map((item, index) => (
                      <div key={item.title} className="grid md:grid-cols-2 gap-12 items-center">
                          <div className={`order-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                              <h3 className="text-2xl font-bold text-text-dark dark:text-white">{item.title}</h3>
                              <p className="mt-4 text-lg text-text-dark dark:text-gray-300 leading-relaxed">{item.description}</p>
                              <div className="mt-6">
                                  <Link to="/services" className="font-semibold text-secondary hover:text-secondary-hover">
                                      Explore Our Services &rarr;
                                  </Link>
                              </div>
                          </div>
                          <div className={`order-2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                <LazyImage src={item.imageUrl} alt={item.title} className="rounded-lg shadow-xl aspect-[4/3]" imageClassName="rounded-lg" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Our Core Services Section */}
      <section className="py-16 sm:py-24 bg-dark-bg dark:bg-gray-950 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-extrabold sm:text-4xl">Our Core Services</h2>
                <p className="mt-4 text-lg text-gray-300">We provide a comprehensive suite of consulting services designed to address your most critical challenges.</p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
                {coreServices.map(service => (
                    <div key={service.title} className="bg-dark-bg/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg text-center flex flex-col items-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-5">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="mt-2 text-gray-400 flex-grow">{service.description}</p>
                         <div className="mt-6">
                            <Link to={service.link} className="font-semibold text-secondary hover:text-secondary-hover">
                                Learn More &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-text-dark dark:text-gray-300 max-w-2xl mx-auto">
              Real stories from partners who have achieved success with our guidance.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-light-bg dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col">
                 <div className="flex-grow">
                    <svg className="w-12 h-12 text-secondary mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.333 22.583c0 2.225-1.5 3.333-3.667 3.333-1.05 0-2.25-.5-3.583-1.667l-2.083 2.5c1.45 1.2 3.083 1.917 4.917 1.917 4.5 0 7.417-2.917 7.417-7.583 0-4.083-2.417-7.75-7.167-11.417C4.25 8.75 3.333 8 3.333 6.167c0-1.333.917-2.083 2.167-2.083 1.25 0 2.167.75 2.167 2.083h5c0-4.417-3.333-7.167-7.167-7.167C1.583 1 0 3.5 0 6.417c0 3.167 2.083 5.417 4.25 7.167 2.417 2 4.083 3.75 4.083 5.917V22.5h1zM29.333 22.583c0 2.225-1.5 3.333-3.667 3.333-1.05 0-2.25-.5-3.583-1.667l-2.083 2.5c1.45 1.2 3.083 1.917 4.917 1.917 4.5 0 7.417-2.917 7.417-7.583 0-4.083-2.417-7.75-7.167-11.417C24.25 8.75 23.333 8 23.333 6.167c0-1.333.917-2.083 2.167-2.083 1.25 0 2.167.75 2.167 2.083h5c0-4.417-3.333-7.167-7.167-7.167C21.583 1 20 3.5 20 6.417c0 3.167 2.083 5.417 4.25 7.167 2.417 2 4.083 3.75 4.083 5.917V22.5h1z" />
                    </svg>
                    <p className="text-text-dark dark:text-gray-200 italic text-lg">"{testimonial.quote}"</p>
                 </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="font-bold text-lg text-text-dark dark:text-white">{testimonial.name}</p>
                  <p className="text-md text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-dark-bg dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to Unlock Your Organization's Potential?
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                  Let's discuss how our tailored consulting services can help you navigate your challenges and achieve measurable success.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                  <Link to="/contact" className="inline-block px-8 py-3 rounded-md font-semibold text-center transition-transform transform hover:scale-105 duration-300 shadow-lg bg-secondary text-primary-dark hover:bg-secondary-hover">
                    Book an Appointment
                  </Link>
                   <Link to="/services" className="inline-block px-8 py-3 rounded-md font-semibold text-center transition-transform transform hover:scale-105 duration-300 shadow-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-text-dark">
                    Explore Our Services
                  </Link>
              </div>
          </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Stay Ahead with Our Insights
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200 dark:text-blue-300 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest industry analysis, expert advice, and success stories delivered right to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-8 sm:flex max-w-md mx-auto">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-transparent rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white text-text-dark dark:bg-gray-200"
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-text-dark bg-secondary hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
             {message && <p className="mt-4 text-white text-sm">{message}</p>}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
