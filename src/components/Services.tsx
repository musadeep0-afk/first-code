import { Home, Key, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  const services = [
    {
      icon: <Home className="w-10 h-10 text-indigo-600" />,
      title: 'Buy Property',
      description: 'Find your dream home with our extensive listings and expert guidance. We make the buying process smooth and transparent.',
    },
    {
      icon: <DollarSign className="w-10 h-10 text-indigo-600" />,
      title: 'Sell Property',
      description: 'Get the best value for your property. Our marketing strategies ensure your home reaches the right buyers quickly.',
    },
    {
      icon: <Key className="w-10 h-10 text-indigo-600" />,
      title: 'Rent Property',
      description: 'Discover premium rental properties in top locations. We help you find the perfect space that fits your lifestyle.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to your needs. Whether you're buying, selling, or renting, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center"
            >
              <div className="w-20 h-20 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <button className="mt-8 text-indigo-600 font-semibold hover:text-indigo-700 flex items-center justify-center mx-auto group">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
