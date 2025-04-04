const Footer = () => {
  return (
    <footer className="bg-black py-10 px-4 sm:px-6 w-full">
      <div className="max-w-7xl mx-auto">        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            © 2025 VibeCheck. All rights reserved. By <a href="https://tashrique.com" className="text-white hover:text-genz-purple">Tashrique Ahmed</a>
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-xs text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-xs text-gray-400 hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 