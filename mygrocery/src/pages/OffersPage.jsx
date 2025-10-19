import React from 'react';

const OffersPage = () => {
  const offers = [
    {
      id: 1,
      title: "New Customer Discount",
      description: "Get 20% off on your first order!",
      discount: "20% OFF",
      code: "NEW20",
      validUntil: "2024-12-31",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop",
      category: "New Customers"
    },
    {
      id: 2,
      title: "Free Delivery",
      description: "Free delivery on orders above $50",
      discount: "FREE DELIVERY",
      code: "FREESHIP",
      validUntil: "2024-12-31",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      category: "Delivery"
    },
    {
      id: 3,
      title: "Fresh Produce Bundle",
      description: "Save 15% on fresh vegetables and fruits",
      discount: "15% OFF",
      code: "FRESH15",
      validUntil: "2024-12-31",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      category: "Fresh Produce"
    },
    {
      id: 4,
      title: "Weekend Special",
      description: "Extra 10% off on weekends",
      discount: "10% OFF",
      code: "WEEKEND10",
      validUntil: "2024-12-31",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      category: "Weekend"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Special Offers & Deals</h1>
        <p className="text-xl text-gray-600">Save big on your grocery shopping with our exclusive offers</p>
      </div>

      {/* Featured Offer */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-yellow-400 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              LIMITED TIME
            </div>
            <h2 className="text-3xl font-bold mb-4">New Customer Special</h2>
            <p className="text-xl mb-6 text-primary-100">
              Get 25% off on your first order plus free delivery!
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>25% off first order</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Valid until Dec 31, 2024</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
              <p className="text-sm text-primary-100 mb-2">Use code:</p>
              <p className="text-2xl font-bold text-yellow-300">WELCOME25</p>
            </div>
            <button className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Shop Now
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500&h=400&fit=crop"
              alt="Special Offer"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-primary-700 rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
              25%
            </div>
          </div>
        </div>
      </div>

      {/* All Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {offer.discount}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{offer.category}</span>
                <span className="text-sm text-gray-500">Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600 mb-1">Use code:</p>
                <p className="text-lg font-bold text-primary-600">{offer.code}</p>
              </div>
              <button className="w-full btn-primary">
                Apply Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Terms and Conditions */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms & Conditions</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>• Offers cannot be combined with other promotions</p>
          <p>• Minimum order value may apply</p>
          <p>• Offers are valid only for delivery in Ichchapuram</p>
          <p>• My Store Corporate reserves the right to modify or cancel offers</p>
          <p>• All prices are subject to change without notice</p>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;