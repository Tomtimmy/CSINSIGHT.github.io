
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-primary dark:text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-text-dark dark:text-gray-300">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </header>

        <div className="mt-12 prose prose-lg max-w-none text-text-dark dark:prose-invert leading-relaxed">
          <p>
            C_S Insight and Solution Firm ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-bold text-text-dark dark:text-white mt-8">Information We Collect</h2>
          <p>
            We may collect personal information from you, such as your name, email address, and message content, when you voluntarily provide it to us through our contact form or newsletter subscription.
          </p>

          <h2 className="text-2xl font-bold text-text-dark dark:text-white mt-8">How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Respond to your inquiries and provide customer service.</li>
            <li>Send you newsletters and marketing communications if you have opted in.</li>
            <li>Improve our website and services.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2 className="text-2xl font-bold text-text-dark dark:text-white mt-8">Sharing Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
          </p>
          
          <h2 className="text-2xl font-bold text-text-dark dark:text-white mt-8">Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.
          </p>

          <h2 className="text-2xl font-bold text-text-dark dark:text-white mt-8">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at contact@csinsight.com.
          </p>
          
          <h2 className="text-2xl font-bold text-text-dark dark:text-white mt-8">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;