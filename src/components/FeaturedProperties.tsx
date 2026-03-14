import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { motion } from 'motion/react';

const properties = [
  {
    id: 1,
    title: 'Modern Luxury Villa',
    location: 'Beverly Hills, CA',
    price: '$4,500,000',
    description: 'Stunning modern villa with panoramic city views, infinity pool, and smart home features.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beds: 5,
    baths: 6,
    sqft: 6500,
    type: 'Villa',
    status: 'For Sale'
  },
  {
    id: 2,
    title: 'Downtown Penthouse',
    location: 'Manhattan, NY',
    price: '$8,200,000',
    description: 'Luxurious penthouse in the heart of the city featuring floor-to-ceiling windows and a private terrace.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 3.5,
    sqft: 3200,
    type: 'Apartment',
    status: 'For Sale'
  },
  {
    id: 3,
    title: 'Coastal Beach House',
    location: 'Malibu, CA',
    price: '$12,500 / mo',
    description: 'Beautiful beachfront property with direct ocean access, expansive decks, and modern interiors.',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: 'House',
    status: 'For Rent'
  },
  {
    id: 4,
    title: 'Suburban Family Home',
    location: 'Austin, TX',
    price: '$850,000',
    description: 'Spacious family home in a quiet neighborhood with a large backyard, updated kitchen, and great schools nearby.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    type: 'House',
    status: 'For Sale'
  },
  {
    id: 5,
    title: 'Premium Office Space',
    location: 'Chicago, IL',
    price: '$15,000 / mo',
    description: 'Class A commercial office space in the financial district with modern amenities and great transit access.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beds: 0,
    baths: 2,
    sqft: 5000,
    type: 'Commercial',
    status: 'For Rent'
  },
  {
    id: 6,
    title: 'Contemporary Townhouse',
    location: 'Seattle, WA',
    price: '$1,150,000',
    description: 'Sleek, multi-level townhouse with a rooftop deck, open floor plan, and high-end finishes throughout.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    type: 'House',
    status: 'For Sale'
  }
];

export default function FeaturedProperties() {
  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties. From luxury villas to modern apartments, find the perfect place to call home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {property.status}
                  </span>
                  <span className="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {property.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-lg font-bold text-gray-900 shadow-sm">
                  {property.price}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-500 mb-4 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {property.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-6">
                  {property.beds > 0 && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <Bed className="w-4 h-4 mr-1.5 text-indigo-500" />
                      {property.beds} Beds
                    </div>
                  )}
                  <div className="flex items-center text-gray-600 text-sm">
                    <Bath className="w-4 h-4 mr-1.5 text-indigo-500" />
                    {property.baths} Baths
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Square className="w-4 h-4 mr-1.5 text-indigo-500" />
                    {property.sqft} sqft
                  </div>
                </div>
                
                <button className="w-full py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-colors">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}
