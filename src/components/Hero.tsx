import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          Find Your Dream Property
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
        >
          Whether you're looking to buy, sell, or rent, we have the perfect property for you. Discover luxury living at its finest.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#properties"
            onClick={(e) => scrollToSection(e, '#properties')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-md font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            View Properties
          </a>
          <a
            href="#appointment"
            onClick={(e) => scrollToSection(e, '#appointment')}
            className="px-8 py-4 bg-white text-gray-900 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
