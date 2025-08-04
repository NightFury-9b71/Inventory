import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-8">
        {/* Copyright */}
          <p className="text-center text-gray-600">
            © 2025 Company Name. All rights reserved.
          </p>
    </footer>
  );
}