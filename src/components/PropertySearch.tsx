import { Search, MapPin, Home, DollarSign, Key } from 'lucide-react';

export default function PropertySearch() {
  return (
    <div className="relative -mt-24 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          {/* Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-indigo-500" /> Location
            </label>
            <input
              type="text"
              placeholder="City, Neighborhood"
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Property Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Home className="w-4 h-4 mr-1 text-indigo-500" /> Property Type
            </label>
            <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white">
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
              <option value="house">House</option>
            </select>
          </div>

          {/* Budget Range */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-indigo-500" /> Budget Range
            </label>
            <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white">
              <option value="">Any Budget</option>
              <option value="0-500k">$0 - $500,000</option>
              <option value="500k-1m">$500,000 - $1,000,000</option>
              <option value="1m-2m">$1,000,000 - $2,000,000</option>
              <option value="2m+">$2,000,000+</option>
            </select>
          </div>

          {/* Buy / Rent */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Key className="w-4 h-4 mr-1 text-indigo-500" /> Status
            </label>
            <select className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white">
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="button"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-4 py-2.5 flex items-center justify-center transition-colors h-[46px]"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
