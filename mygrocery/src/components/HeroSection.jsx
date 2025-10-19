import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              My Store grocery delivery in{' '}
              <span className="text-yellow-300">Ichchapuram</span>
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Fresh groceries delivered to your doorstep in 30-45 minutes. 
              Quality products, competitive prices, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Start Shopping
              </button>
              <button className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200">
                View Offers
              </button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Fresh Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Best Prices</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-yellow-300 rounded-lg mb-2"></div>
                    <div className="h-2 bg-white bg-opacity-30 rounded w-3/4"></div>
                    <div className="h-2 bg-white bg-opacity-30 rounded w-1/2"></div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-green-300 rounded-lg mb-2"></div>
                    <div className="h-2 bg-white bg-opacity-30 rounded w-3/4"></div>
                    <div className="h-2 bg-white bg-opacity-30 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-red-300 rounded-lg mb-2"></div>
                    <div className="h-2 bg-white bg-opacity-30 rounded w-3/4"></div>
                    <div className="h-2 bg-white bg-opacity-30 rounded w-1/2"></div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="w-12 h-12 bg-blue-300 rounded-lg mb-2"></div>
                    <div className="h-2 bg-white bg-opacity-30 rounded w-3/4"></div>
                    <div className="h-2 bg-white bg-opacity-30 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-300 rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-primary-700 font-bold text-lg">30</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-300 rounded-full w-12 h-12 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;