import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-brown-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-brown-900 mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-brown-800">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and playing Monster Menu, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the game.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Game Usage</h2>
            <p className="mb-4">
              Monster Menu is provided for entertainment purposes only. You may not use the game for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Intellectual Property</h2>
            <p className="mb-4">
              All content, including but not limited to graphics, text, and game mechanics, is the property of the game developers and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. User Conduct</h2>
            <p className="mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Attempt to reverse engineer or modify the game</li>
              <li>Use any automated means to access or play the game</li>
              <li>Interfere with the proper functioning of the game</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Disclaimer</h2>
            <p className="mb-4">
              The game is provided "as is" without any warranties, express or implied. We do not guarantee that the game will be error-free or uninterrupted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Continued use of the game after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
            <p>
              For any questions regarding these terms, please visit our{' '}
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