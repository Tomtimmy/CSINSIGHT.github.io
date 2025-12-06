
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
    question: 'What services do you provide?',
    answer: 'We offer a comprehensive range of consulting services including Project Management, Data Analytics & Business Intelligence, Strategy & Process Improvement, Capacity Development & Training, Supply Chain Management, Import/Export Management, and IT Support & Cybersecurity.',
  },
  {
    question: 'Do you work with small businesses?',
    answer: 'Yes, absolutely. We work with organizations of all sizes, from startups and SMEs to large enterprises and government agencies. Our solutions are scalable and tailored to fit the specific budget and needs of growing businesses.',
  },
  {
    question: 'How can I request a consultation?',
    answer: 'You can request a consultation by filling out the contact form on this page, emailing us at csinsightssolution@gmail.com, or calling us directly at +234 813 284 7661. We will schedule a time to discuss your needs.',
  },
  {
    question: 'Do you offer virtual or physical training?',
    answer: 'We offer both. Our Capacity Development & Training programs can be delivered in-person at your facility or a designated venue, or virtually via online platforms, depending on your preference and logistical requirements.',
  },
  {
    question: 'Can you manage full end-to-end projects?',
    answer: 'Yes. We specialize in end-to-end project management. From initial scoping and planning to execution, monitoring, and final delivery, we handle every aspect to ensure your project is completed on time and within budget.',
  },
  {
    question: 'Do you offer post-project support?',
    answer: 'Yes, we believe in building long-term partnerships. We offer various post-project support packages to ensure the implemented solutions continue to deliver value and evolve with your business needs.',
  },
  {
    question: 'Can you analyze small datasets?',
    answer: 'Absolutely. Data doesn\'t need to be "big" to be valuable. We help small businesses extract meaningful insights from their existing data—sales records, customer lists, or inventory logs—to drive smarter decisions.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes, we serve clients globally. Utilizing digital collaboration tools, we effectively manage projects, consulting sessions, and training programs for organizations across different countries and time zones.',
  },
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending...');

    const data = new FormData();
    data.append('timestamp', new Date().toISOString());
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
        setStatus('Message sent successfully! We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const result = await response.json();
        setStatus(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('An error occurred. Please try again later.');
    } finally {
        setIsSubmitting(false);
        setTimeout(() => setStatus(''), 5000);
    }
  };

  const contactSlides = [
    {
      imageUrl: imagePaths.contactHero1,
      title: 'Contact Us',
      subtitle: 'We are here to help. Reach out to discuss your needs.',
    },
    {
        imageUrl: imagePaths.contactHero2,
        title: 'Let\'s Collaborate',
        subtitle: 'Start a conversation about your organization\'s future.',
      },
      {
        imageUrl: imagePaths.contactHero3,
        title: 'Global Reach, Local Impact',
        subtitle: 'Connecting with clients wherever they are.',
      }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <HeroCarousel slides={contactSlides} />

      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-extrabold text-primary dark:text-white">Get in Touch</h2>
              <p className="mt-4 text-lg text-text-dark dark:text-gray-300">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-light-bg dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-dark dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-dark dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-dark dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-dark dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {status && (
                  <p className={`mt-4 text-center font-medium ${status.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {status}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="flex flex-col h-full">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-primary dark:text-white">Contact Information</h2>
                <div className="mt-6 space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-text-dark dark:text-white">Our Office</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">14 Ilupeju Street, Abule Egba, Lagos</p>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">14, Unity Avenue, Owode Onirin, Agboyi Ketu, Lagos State</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-text-dark dark:text-white">Phone</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                             <a href="tel:+2348132847661" className="hover:text-primary dark:hover:text-secondary">+234 813 284 7661</a>
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-text-dark dark:text-white">Email</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            <a href="mailto:csinsightssolution@gmail.com" className="hover:text-primary dark:hover:text-secondary">csinsightssolution@gmail.com</a>
                        </p>
                    </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-light-bg dark:bg-gray-800 p-8 rounded-lg shadow-lg flex-grow">
                 <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Frequently Asked Questions</h2>
                 <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-300 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                            <h3 className="text-lg font-semibold text-text-dark dark:text-white">{faq.question}</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
                        </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
