
import React, { useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import { imagePaths } from '../data/imagePaths';

// IMPORTANT: To connect this to your Google Sheet, create a Google Apps Script Web App.
// 1. Create a new Google Sheet with columns: timestamp, name, email, subject, message.
// 2. Go to Extensions > Apps Script.
// 3. Paste the provided script code for handling POST requests.
// 4. Deploy as a Web App with "Anyone" access.
// 5. Copy the Web App URL and paste it here.
const GOOGLE_SHEET_CONTACT_URL = 'https://script.google.com/macros/s/AKfycbwql_2UMk8PBw-j-VQeeDA2Gn5G0S2r8XqnIYLOG9pbynnklvCmmePNHmFeyLqSfcZN/exec';


const faqs = [
  {
    question: 'What types of organizations do you work with?',
    answer: 'We partner with a diverse range of clients, including startups, established businesses, non-governmental organizations (NGOs), and government agencies. Our solutions are tailored to meet the unique needs of each organization.',
  },
  {
    question: 'How do you begin a new project?',
    answer: 'Every project starts with a discovery phase where we immerse ourselves in your challenges and goals. We conduct thorough analysis and collaborate closely with your team to ensure we have a deep understanding of your needs before designing a strategy.',
  },
  {
    question: 'What makes your consulting firm different?',
    answer: 'Our key differentiator is our commitment to delivering measurable impact. We combine rigorous data analysis with practical, hands-on implementation support to ensure our solutions don\'t just look good on paper—they deliver real, tangible results.',
  },
  {
    question: 'How long does a typical consulting engagement last?',
    answer: 'The duration of an engagement varies depending on the project\'s scope and complexity. We offer everything from short-term assessments to long-term partnerships. We define the timeline and deliverables clearly at the outset of every project.',
  },
];

const contactSlides = [
  {
    imageUrl: imagePaths.contactHero1,
    title: 'Get in Touch',
    subtitle: "We're here to help and answer any question you might have.",
  },
  {
    imageUrl: imagePaths.contactHero2,
    title: 'Let\'s Start the Conversation',
    subtitle: 'Reach out to discuss your challenges and discover how we can drive your success.',
  },
  {
    imageUrl: imagePaths.contactHero3,
    title: 'Book Your Consultation',
    subtitle: 'Schedule a free, no-obligation consultation with one of our expert consultants today.',
  },
];


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    // Clear the error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { name: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email Address is invalid.';
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus({ type: 'error', message: 'Please correct the errors before submitting.' });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 3000);
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your message...' });
    
    const data = new FormData();
    data.append('timestamp', new Date().toISOString());
    // FIX: Replaced Object.entries loop with explicit, type-safe appends
    // to avoid type inference issues that caused the `value` to be `unknown`.
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('message', formData.message);

    try {
        const response = await fetch(GOOGLE_SHEET_CONTACT_URL, {
            method: 'POST',
            body: data,
        });

        if (response.ok) {
            setStatus({ type: 'success', message: 'Thank you for your message! We will get back to you shortly.' });
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } else {
            const result = await response.json();
            setStatus({ type: 'error', message: result.message || 'An error occurred. Please try again.' });
        }
    } catch (error) {
        console.error('Form submission error:', error);
        setStatus({ type: 'error', message: 'An error occurred while sending your message. Please try again later.' });
    } finally {
        setTimeout(() => setStatus({ type: 'idle', message: '' }), 5000);
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-primary dark:text-secondary';
    }
  };
  
  const getInputClasses = (fieldName: keyof typeof errors) => {
    const baseClasses = 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none';
    const lightModeClasses = errors[fieldName] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary';
    const darkModeClasses = errors[fieldName] ? 'dark:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500' : 'dark:border-gray-600 dark:focus:ring-secondary dark:focus:border-secondary';
    const commonDarkClasses = 'dark:bg-gray-700 dark:text-white dark:placeholder-gray-400';
    return `${baseClasses} ${lightModeClasses} ${commonDarkClasses} ${darkModeClasses}`;
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroCarousel slides={contactSlides} />

      {/* Contact Form and Info Section */}
      <section className="py-16 sm:py-24 bg-light-bg dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Contact Information */}
                <div>
                    <h2 className="text-3xl font-bold text-text-dark dark:text-white sm:text-4xl">Contact Information</h2>
                    <p className="mt-4 text-lg text-text-dark dark:text-gray-300">
                        Reach out to us through any of the following channels. We look forward to hearing from you!
                    </p>
                    <div className="mt-8 space-y-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-primary text-white rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold text-text-dark dark:text-white">Our Office</h3>
                                <p className="mt-1 text-text-dark dark:text-gray-300">No. 5, Eta Avenue, Oregun Ikeja.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                             <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-primary text-white rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold text-text-dark dark:text-white">Email Us</h3>
                                <a href="mailto:csinsightssolution@gmail.com" className="mt-1 text-text-dark dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors">csinsightssolution@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-primary text-white rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold text-text-dark dark:text-white">Call Us</h3>
                                <a href="tel:+2348132847661" className="mt-1 text-text-dark dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors">+234 813 284 7661</a>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-primary text-white rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.203 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold text-text-dark dark:text-white">Chat on WhatsApp</h3>
                                <a href="https://wa.me/2348132847661" target="_blank" rel="noopener noreferrer" className="mt-1 text-text-dark dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors">Start a Conversation</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-text-dark dark:text-white">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={getInputClasses('name')}
                                disabled={status.type === 'loading'}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={getInputClasses('email')}
                                disabled={status.type === 'loading'}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                        </div>
                         <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={getInputClasses('subject')}
                                disabled={status.type === 'loading'}
                            />
                            {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className={`${getInputClasses('message')} resize-none`}
                                disabled={status.type === 'loading'}
                            />
                            {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                        </div>
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={status.type === 'loading'}
                            >
                                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                    {status.message && <p className={`mt-4 text-center text-sm ${getStatusColor()}`}>{status.message}</p>}
                </div>
            </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-text-dark dark:text-gray-300">Find quick answers to common questions about our services and process.</p>
              </div>
              <div className="space-y-4">
                  {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 py-4 overflow-hidden">
                          <button 
                              onClick={() => toggleFaq(index)} 
                              className="w-full flex justify-between items-center text-left text-lg font-semibold text-text-dark dark:text-gray-200 focus:outline-none"
                              aria-expanded={openFaq === index}
                              aria-controls={`faq-answer-${index}`}
                          >
                              <span id={`faq-question-${index}`}>{faq.question}</span>
                              <span className="transform transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0)' }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                              </span>
                          </button>
                          <div 
                              id={`faq-answer-${index}`}
                              role="region"
                              aria-labelledby={`faq-question-${index}`}
                              className={`grid transition-all duration-500 ease-in-out ${openFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                          >
                            <div className="overflow-hidden">
                              <p className="mt-4 text-text-dark dark:text-gray-300 leading-relaxed pb-2">
                                  {faq.answer}
                              </p>
                            </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Map Section */}
      <section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
              <h2 className="text-3xl font-bold text-text-dark dark:text-white text-center mb-8">Find Us on the Map</h2>
              <div className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden">
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!m12!1m3!1d63424.28189035117!2d3.332308945938814!3d6.602737922442431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228fa2a3999%3A0x875385ede1d34396!2sIkeja%2C%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1698345123456!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of Ikeja, Lagos, Nigeria"
                  ></iframe>
              </div>
          </div>
      </section>

    </div>
  );
};

export default ContactPage;