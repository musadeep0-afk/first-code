import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const features = [
    'Over 15 years of experience in luxury real estate',
    'Trusted by thousands of satisfied clients',
    'Serving premium locations worldwide',
    'Award-winning service and support',
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Real Estate Team"
              className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              We Help You Find Your Dream Home
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At LuxeEstate, we believe that finding the perfect home should be an exciting and seamless experience. With our deep understanding of the real estate market and commitment to excellence, we guide you through every step of your property journey.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8">
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">15+</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Years Exp</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">2.5k</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Properties</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">10k+</div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">Clients</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
