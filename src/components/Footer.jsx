import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Ensure you have react-icons installed

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4 mt-8 shadow-inner flex justify-center gap-6">
      <a
        href="https://www.linkedin.com/in/vanshika-pandey-48a3b52a6"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:scale-110 transition-transform"
      >
        <FaLinkedin size={28} />
      </a>
      <a
        href="https://github.com/your-github-vanshikapandey24"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 dark:text-gray-200 hover:scale-110 transition-transform"
      >
        <FaGithub size={28} />
      </a>
    </footer>
  );
};

export default Footer;
