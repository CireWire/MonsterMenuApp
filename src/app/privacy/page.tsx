import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brown-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-brown-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-brown-800">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              Monster Menu is a browser-based game that does not collect any personal information. 
              All game data is stored locally in your browser and is not transmitted to any servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Local Storage</h2>
            <p className="mb-4">
              The game uses your browser's local storage to save your game progress. 
              This data is stored only on your device and can be cleared at any time through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Third-Party Services</h2>
            <p className="mb-4">
              Monster Menu does not use any third-party analytics, advertising, or tracking services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Children's Privacy</h2>
            <p className="mb-4">
              Monster Menu is designed to be family-friendly and does not collect any personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. Any changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please visit our{' '}
              <a href="/contact" className="text-brown-600 hover:text-brown-800 underline">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 