import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brown-950 text-white py-8 border-t-4 border-brown-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Helix Corporation. All rights reserved.
            </p>
          </div>
          <div className="flex gap-12">
            <Link href="/privacy" className="text-gray-300 hover:text-brown-400 transition-colors px-6 py-3 border border-brown-700 rounded-lg">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-brown-400 transition-colors px-6 py-3 border border-brown-700 rounded-lg">
              Terms of Service
            </Link>
            <a href="https://sites.google.com/view/riotkids-garage" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brown-400 transition-colors px-6 py-3 border border-brown-700 rounded-lg">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 