

import React from 'react';
import Button from '../components/Button';
import LazyImage from '../components/LazyImage';
import { imagePaths } from '../data/imagePaths';
import FadeInSection from '../components/FadeInSection';
// import TeamCarousel from '../components/TeamCarousel'; // Hidden for now

const coreValues = [
  {
    name: 'Integrity',
    description: 'We build trust through transparency and consistency.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Integrity Icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    name: 'Service',
    description: 'We go beyond expectations to create lasting value.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Service Icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    name: 'Innovation',
    description: 'We thrive on new ideas that deliver practical solutions.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Innovation Icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  },
  {
    name: 'Collaboration',
    description: 'We believe great results come from collective intelligence.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Collaboration Icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  },
  {
    name: 'Excellence',
    description: 'We measure success by the difference we make.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Excellence Icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  },
];

/* Leadership section hidden for now
const leadershipTeam = [
    {
        name: 'John Doe',
        title: 'Founder & Principal Consultant',
        bio: 'With over 20 years of experience, John founded C_S Insight with a passion for helping organizations navigate complex challenges and achieve sustainable growth through data-driven strategies.',
        imageUrl: imagePaths.aboutTeamJohn,
    },
    {
        name: 'Jane Smith',
        title: 'Head of Strategy & Operations',
        bio: 'Jane is a master of process optimization and strategic planning. She leads our efforts to design and implement frameworks that drive efficiency and align with our clients\' long-term goals.',
        imageUrl: imagePaths.aboutTeamJane,
    },
    {
        name: 'Sam Wilson',
        title: 'Director of Data & Analytics',
        bio: 'Sam leads our analytics team, transforming complex datasets into clear, actionable insights. His expertise in business intelligence empowers our clients to make smarter, more informed decisions.',
        imageUrl: imagePaths.aboutTeamSam,
    }
];
*/

// Replacement Content: Industries We Serve
const industries = [
  {
    name: 'Manufacturing & Supply Chain',
    description: 'Optimizing logistics, production planning, and inventory management for operational excellence.',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    )
  },
  {
    name: 'Government & Public Sector',
    description: 'Supporting policy implementation, project management, and capacity building for public institutions.',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
    )
  },
  {
    name: 'Retail & E-commerce',
    description: 'Leveraging data analytics to understand consumer behavior and optimize digital sales channels.',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    )
  },
  {
    name: 'Financial Services',
    description: 'Enhancing risk management, regulatory compliance, and digital transformation strategies.',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
  },
  {
     name: 'Non-Profit & NGOs',
     description: 'Providing strategic planning and impact assessment to maximize social value.',
     icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
     )
  },
  {
    name: 'Technology & Startups',
    description: 'Guiding scalable growth, product-market fit, and efficient operational scaling.',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )
  }
];

const historyMilestones = [
  {
    year: '2018',
    title: 'The Vision',
    description: 'C_S Insight and Solution Firm was founded with a mission to bridge the gap between complex data and actionable business strategy.'
  },
  {
    year: '2020',
    title: 'First Major Partnership',
    description: 'We partnered with a leading manufacturing firm, successfully redesigning their supply chain and achieving a 30% reduction in operational costs.'
  },
  {
    year: '2022',
    title: 'Expanding Our Services',
    description: 'Launched our dedicated Capacity Development & Training service line to empower client teams with sustainable skills.'
  },
  {
    year: '2024',
    title: 'A Growing Team',
    description: 'Our team grew to over 15 dedicated consultants, expanding our expertise across multiple sectors including finance, retail, and public services.'
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section 
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url('${imagePaths.aboutHero}')` }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-70 flex items-center justify-center">
            <div className="text-center text-white p-4">
                <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">Our Story of Impact</h1>
                <p className="mt-4 text-xl max-w-2xl">Building a legacy of clarity, integrity, and performance.</p>
            </div>
        </div>
      </section>

      {/* Our Story, Mission, and Vision */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                    <h2 className="text-3xl font-bold text-text-dark dark:text-white sm:text-4xl">From Vision to Value</h2>
                    <p className="mt-6 text-lg text-text-dark dark:text-gray-300 leading-relaxed">
                        Founded with a commitment to clarity, insight, and measurable impact, C_S Insight and Solution Firm partners with businesses, NGOs, and government organizations to transform potential into performance. We believe that the greatest opportunities are often hidden within the greatest complexities.
                    </p>
                    <div className="mt-8 space-y-6">
                        <div className="bg-light-bg dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-primary dark:text-white">Our Mission</h3>
                            <p className="mt-2 text-lg text-text-dark dark:text-gray-300">
                                To empower organizations with actionable insight that turns complexity into opportunity.
                            </p>
                        </div>
                        <div className="bg-light-bg dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-primary dark:text-white">Our Vision</h3>
                            <p className="mt-2 text-lg text-text-dark dark:text-gray-300">
                                To be the preferred consulting partner recognized for clarity, integrity, and impact across Africa and beyond.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <LazyImage src={imagePaths.aboutVision} alt="Team collaborating on a strategy" className="rounded-lg shadow-xl w-full h-full min-h-[500px]" imageClassName="object-cover rounded-lg"/>
                </div>
            </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-16 sm:py-24 bg-light-bg dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">Our History</h2>
            <p className="mt-4 text-lg text-text-dark dark:text-gray-300">A journey of growth, partnership, and impact.</p>
          </div>
          <div className="mt-16 relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-primary/30 dark:bg-secondary/30" aria-hidden="true"></div>
            
            <div className="space-y-16">
              {historyMilestones.map((item, index) => (
                <FadeInSection key={index} className="flex odd:flex-row-reverse items-center justify-between w-full">
                  <div className="w-[calc(50%-2rem)]">
                    <div className={`p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="text-2xl font-bold text-primary dark:text-secondary">{item.year} - {item.title}</h3>
                      <p className="mt-2 text-text-dark dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  <div className="z-10 flex-shrink-0 w-10 h-10 bg-secondary rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                     <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                   <div className="w-[calc(50%-2rem)]"></div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section (Replaces Meet Our Leadership) */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">Industries We Serve</h2>
                  <p className="mt-4 text-lg text-text-dark dark:text-gray-300">We bring deep sector expertise to help diverse organizations thrive.</p>
              </div>
              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {industries.map((industry, index) => (
                      <div key={index} className="bg-light-bg dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                          <div className="flex items-center justify-center w-16 h-16 bg-primary dark:bg-secondary rounded-full mb-6 shadow-md">
                              {industry.icon}
                          </div>
                          <h3 className="text-xl font-bold text-text-dark dark:text-white">{industry.name}</h3>
                          <p className="mt-2 text-text-dark dark:text-gray-300">{industry.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Why Partner with C_S Insight? Section */}
      <section className="py-16 sm:py-24 bg-light-bg dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">Why Partner with C_S Insight?</h2>
                <p className="mt-4 text-lg text-text-dark dark:text-gray-300">We deliver more than just reports; we provide clarity, strategy, and results that matter.</p>
            </div>
            <div className="mt-16 grid gap-10 md:grid-cols-3">
                <div className="text-center">
                    <div className="relative group flex items-center justify-center h-16 w-16 rounded-full bg-primary mx-auto mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-text-dark dark:bg-gray-200 dark:text-text-dark rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Data-Driven Strategy</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-dark dark:text-white">Data-Driven Strategy</h3>
                    <p className="mt-2 text-text-dark dark:text-gray-300">Our solutions are built on a foundation of rigorous data analysis, ensuring every decision is informed and impactful.</p>
                </div>
                 <div className="text-center">
                    <div className="relative group flex items-center justify-center h-16 w-16 rounded-full bg-primary mx-auto mb-5">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-text-dark dark:bg-gray-200 dark:text-text-dark rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Tailored Solutions</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-dark dark:text-white">Tailored Solutions</h3>
                    <p className="mt-2 text-text-dark dark:text-gray-300">We understand that every organization is unique. We craft bespoke strategies that align perfectly with your specific goals.</p>
                </div>
                 <div className="text-center">
                    <div className="relative group flex items-center justify-center h-16 w-16 rounded-full bg-primary mx-auto mb-5">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-text-dark dark:bg-gray-200 dark:text-text-dark rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Measurable Impact</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-dark dark:text-white">Measurable Impact</h3>
                    <p className="mt-2 text-text-dark dark:text-gray-300">Our success is measured by yours. We focus on delivering tangible outcomes that improve efficiency and drive growth.</p>
                </div>
            </div>
        </div>
      </section>


      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-text-dark dark:text-white sm:text-4xl">The Principles That Guide Us</h2>
                <p className="mt-4 text-lg text-text-dark dark:text-gray-300">Our core values are the foundation of every partnership and solution we deliver.</p>
            </div>
            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {coreValues.map((value, index) => (
                <div key={value.name} className="text-center p-6 bg-light-bg dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
                    <FadeInSection delay={index * 100}>
                      <div className="relative group flex justify-center items-center mb-4">
                        {value.icon}
                        <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-text-dark dark:bg-gray-200 dark:text-text-dark rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">{value.name}</span>
                      </div>
                    </FadeInSection>
                    <h3 className="text-xl font-semibold text-primary dark:text-secondary">{value.name}</h3>
                    <p className="mt-2 text-base text-text-dark dark:text-gray-300">{value.description}</p>
                </div>
                ))}
            </div>
        </div>
      </section>

       {/* Final CTA Section */}
      <section className="bg-dark-bg dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to Partner with Us?
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                  Let our expertise become your advantage. Discover how our approach can drive meaningful results for your organization.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                  <Button to="/services" variant="primary">View Our Services</Button>
                  <Button to="/contact" variant="secondary">Get In Touch</Button>
              </div>
          </div>
      </section>

    </div>
  );
};

export default AboutPage;
