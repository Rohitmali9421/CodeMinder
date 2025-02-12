import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className=" bg-gray-950 px-4 py-4 mx-auto space-y-2 overflow-hidden sm:px-6 lg:px-8">
      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center">
        <div className="px-5 py-2">
          <a href="/faq" className="text-gray-500 dark:text-darkText-400 hover:text-gray-900 dark:hover:text-darkText-400">
            FAQ
          </a>
        </div>
        <div className="px-5 py-2">
          <a href="/support" className="text-gray-500 dark:text-darkText-400 hover:text-gray-900 dark:hover:text-darkText-400">
            Support
          </a>
        </div>
        <div className="px-5 py-2">
          <a href="/privacy-policy" className="text-gray-500 dark:text-darkText-400 hover:text-gray-900 dark:hover:text-darkText-400">
            Privacy
          </a>
        </div>
        <div className="px-5 py-2">
          <a href="/timeline" className="text-gray-500 dark:text-darkText-400 hover:text-gray-900 dark:hover:text-darkText-400">
            Timeline
          </a>
        </div>
        <div className="px-5 py-2">
          <a href="/terms-and-conditions" className="text-gray-500 dark:text-darkText-400 hover:text-gray-900 dark:hover:text-darkText-400">
            Terms
          </a>
        </div>
      </nav>

      {/* Social Media Links */}
      <div className="flex justify-center mt-8 space-x-6">
        <a href="https://www.linkedin.com/company/codolio/" className="text-black dark:text-white">
          <span className="sr-only">Linkedin</span>
          <FaLinkedin size={38} />
        </a>
        <a href="#" className="text-black dark:text-white">
          <span className="sr-only">Twitter</span>
          <FaTwitter size={38} />
        </a>
        <a href="https://www.instagram.com/codolio_?igsh=ZWFmMzlrcXQyMmFr&utm_source=qr" className="text-black dark:text-white">
          <span className="sr-only">Instagram</span>
          <FaInstagram size={38} />
        </a>
      </div>

      {/* Footer Text */}
      <p className="text-center text-gray-400 dark:text-darkText-400">
        © 2024 Codolio, Inc. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
