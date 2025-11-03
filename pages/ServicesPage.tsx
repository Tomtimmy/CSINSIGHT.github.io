
import React, { useState } from 'react';
import Button from '../components/Button';
import HeroCarousel from '../components/HeroCarousel';
import Modal from '../components/Modal';
import LazyImage from '../components/LazyImage';
import { imagePaths } from '../data/imagePaths';
import FadeInSection from '../components/FadeInSection';

// Define a type for our service objects for better type safety
interface Service {
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: 'Project Management',
    description: 'We provide end-to-end project management support to ensure your most critical initiatives are delivered on time, within budget, and to the highest quality standards.',
    details: [
      'Comprehensive project planning and scoping',
      'Agile and traditional methodology implementation',
      'Risk assessment and mitigation strategies',
      'Stakeholder communication and management',
      'Quality assurance and control',
    ],
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  },
  {
    title: 'Data Analytics & Business Intelligence',
    description: 'We transform your raw data into a strategic asset, providing clear, actionable insights that drive informed decision-making and uncover new growth opportunities.',
    details: [
      'Custom BI dashboard development (Tableau, Power BI)',
      'Predictive analytics and forecasting models',
      'Data warehousing and ETL solutions',
      'Data governance and quality assurance frameworks',
      'Customer segmentation and behavior analysis',
    ],
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  },
  {
    title: 'Strategy & Process Improvement',
    description: 'We help you design and implement agile strategies and streamlined processes that boost operational efficiency, reduce costs, and create a foundation for sustainable growth.',
    details: [
      'Business process mapping and re-engineering (BPMN)',
      'Change management and implementation support',
      'Operational framework design (e.g., Lean, Six Sigma)',
      'Performance metric and KPI development',
      'Organizational design and restructuring',
    ],
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  },
  {
    title: 'Capacity Development & Training',
    description: 'We empower your teams with the skills and knowledge they need to excel. Our tailored training programs and coaching are designed to build lasting internal capabilities.',
    details: [
      'Leadership and management coaching programs',
      'Customized team workshops on data literacy, project management, etc.',
      'Curriculum design and material development',
      'Continuous improvement and skill-building programs',
      'Train-the-trainer initiatives for sustainable learning',
    ],
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M12 12L4 7l8-4 8 4-8 5z" /></svg>,
  },
  // {
  //   title: 'Supply Chain Optimization',
  //   description: 'We streamline logistics and procurement systems, helping businesses reduce waste, cut costs, and improve reliability from end to end.',
  //   details: [
  //     'Logistics network design and optimization',
  //     'Procurement and strategic sourcing',
  //     'Inventory management and demand forecasting',
  //     'Supplier relationship management',
  //     'Implementation of SCM software solutions',
  //   ],
  //   icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8zM21 16h-2a2 2 0 00-2 2v-6a2 2 0 00-2-2H9" /></svg>,
  // },
  // {
  //   title: 'Audit & Feasibility Studies',
  //   description: 'We assess operational and financial feasibility to guide investment, expansion, and sustainability decisions with confidence.',
  //   details: [
  //     'Financial viability and ROI analysis',
  //     'Market research and competitive analysis',
  //     'Operational feasibility and resource planning',
  //     'Risk assessment and mitigation reports',
  //     'Comprehensive due diligence for investments',
  //   ],
  //   icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  // },
];

const serviceSlides = [
  {
    imageUrl: imagePaths.servicesHero1,
    title: 'Expert Project Management',
    subtitle: 'Delivering your most critical initiatives on time and within budget.',
  },
  {
    imageUrl: imagePaths.servicesHero2,
    title: 'Data Analytics & BI',
    subtitle: 'Transforming your raw data into a powerful strategic asset for growth.',
  },
  {
    imageUrl: imagePaths.servicesHero3,
    title: 'Strategy & Process Improvement',
    subtitle: 'Designing agile strategies and streamlined processes for peak efficiency.',
  },
    {
    imageUrl: imagePaths.servicesHero4,
    title: 'Capacity Development & Training',
    subtitle: 'Empowering your teams with the skills and knowledge they need to excel.',
  }
];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ & /g, '-')
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');


const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <HeroCarousel slides={serviceSlides} />

      <section className="py-16 sm:py-24 bg-light-bg dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">What We Do</h2>
              <p className="mt-4 text-lg text-text-dark dark:text-gray-300">We partner with you to transform complexity into clarity, providing expert guidance across our core service areas.</p>
          </FadeInSection>
          <FadeInSection>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {services.map(service => (
                <div key={service.title} id={slugify(service.title)} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-start group scroll-mt-24">
                    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-light-bg dark:bg-gray-800 mb-4">
                        <div className="transition-transform duration-300 ease-in-out group-hover:scale-110">
                          {service.icon}
                        </div>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-text-dark dark:text-white">{service.title}</h3>
                        <p className="mt-2 text-text-dark dark:text-gray-300 leading-relaxed">{service.description}</p>
                    </div>
                    <div className="mt-6">
                        <button 
                          onClick={() => handleLearnMore(service)} 
                          className="font-semibold text-secondary hover:text-secondary-hover transition-colors duration-300"
                        >
                            Learn More &rarr;
                        </button>
                    </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
      
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      <LazyImage src={imagePaths.servicesApproach} alt="Consultants in a meeting" className="rounded-lg shadow-xl aspect-[4/3]" imageClassName="rounded-lg" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">Our Collaborative Approach</h2>
                      <p className="mt-4 text-lg text-text-dark dark:text-gray-300 leading-relaxed">
                          We believe in partnership. Our process is built on a foundation of collaboration to ensure our solutions are not only effective but also deeply integrated with your organizational culture.
                      </p>
                      <div className="mt-6 space-y-4">
                          <div className="flex items-start">
                              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-xl mr-4">1</div>
                              <div>
                                  <h3 className="text-xl font-bold text-text-dark dark:text-white">Discover & Analyze</h3>
                                  <p className="mt-1 text-text-dark dark:text-gray-300">We begin by listening, immersing ourselves in your challenges to understand your unique context and goals.</p>
                              </div>
                          </div>
                          <div className="flex items-start">
                              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-xl mr-4">2</div>
                              <div>
                                  <h3 className="text-xl font-bold text-text-dark dark:text-white">Design & Strategize</h3>
                                  <p className="mt-1 text-text-dark dark:text-gray-300">Using data-driven insights, we co-create tailored strategies and actionable roadmaps for success.</p>
                              </div>
                          </div>
                          <div className="flex items-start">
                              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-xl mr-4">3</div>
                              <div>
                                  <h3 className="text-xl font-bold text-text-dark dark:text-white">Implement & Empower</h3>
                                  <p className="mt-1 text-text-dark dark:text-gray-300">We work alongside your team to implement solutions, providing the support and training needed for long-term adoption.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </FadeInSection>
        </div>
      </section>

      <section className="bg-dark-bg dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to Drive Real Results?
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                  Let’s discuss how our tailored services can address your challenges and help you achieve your strategic objectives.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                  <Button to="/contact" variant="primary">Get In Touch</Button>
                  <Button to="/portfolio" variant="secondary">See Our Portfolio</Button>
              </div>
          </div>
      </section>

      {selectedService && (
        <Modal isOpen={!!selectedService} onClose={closeModal}>
          <div className="p-2">
            <h3 className="text-2xl font-bold text-primary dark:text-secondary mb-4">{selectedService.title}</h3>
            <p className="text-lg text-text-dark dark:text-gray-200 mb-6">{selectedService.description}</p>
            <h4 className="text-xl font-semibold text-text-dark dark:text-white mb-3">Key Areas of Focus:</h4>
            <ul className="space-y-2 text-text-dark dark:text-gray-300">
              {selectedService.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-secondary mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Button to="/contact" variant="primary">
                Request a Consultation
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ServicesPage;