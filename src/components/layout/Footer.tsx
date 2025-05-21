import React from 'react';
import { Newspaper, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Newspaper size={24} className="mr-2" />
            <span className="text-xl font-semibold">News Reader</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-lg mb-2">Accessible news for everyone</p>
            <p className="flex items-center justify-center md:justify-end text-gray-400">
              Made with <Heart size={16} className="mx-1 text-error-500" /> for accessibility
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>Powered by newsdata.io. All news content belongs to their respective owners.</p>
          <p className="mt-2">© {new Date().getFullYear()} News Reader App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;