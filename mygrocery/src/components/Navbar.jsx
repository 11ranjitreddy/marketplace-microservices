import React, { useState,useEffect,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [suggestions, setSuggestions] =useState([]);
  const searchRef=useRef(null);
  const [showSuggestions, setShowSuggestions]= useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
const generateSuggestions = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
   }

    const searchTerm = query.toLowerCase().trim();
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    // If no products in localStorage, use default products
    const products = allProducts.length > 0 ? allProducts : [
      { name: "Organic Bananas", category: "Fruits" },
      { name: "Fresh Milk", category: "Dairy" },
      { name: "Whole Grain Bread", category: "Bakery" },
      { name: "Fresh Apples", category: "Fruits" },
      { name: "Organic Tomatoes", category: "Vegetables" }
    ];

    const matches = products.filter(product => {
      const name = product.name.toLowerCase();
      const category = product.category.toLowerCase();
      
      return name.startsWith(searchTerm) || 
             name.includes(searchTerm) ||
             category.startsWith(searchTerm) ||
             category.includes(searchTerm);
    }).slice(0, 5); // Limit to 5 suggestions

    setSuggestions(matches);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    generateSuggestions(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    navigate(`/?search=${encodeURIComponent(suggestion.name)}`);
    setShowSuggestions(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-800">My Store Corporate</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative" ref={searchRef}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={()=>setShowSuggestions(searchQuery.length>0)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/offers" className="relative text-gray-700 hover:text-primary-600 font-medium">
                  Offers
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">NEW</span>
                </Link>
                <Link to="/help" className="text-gray-700 hover:text-primary-600 font-medium">
                  Help
                </Link>
                {/* <Link to ="/admin/Login" className="text-gray-700 hover:text-red-600 font-medium">
                Admin
                </Link> */}
                <Link to="/signin" className="btn-primary">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                  Home
                </Link>
                <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 font-medium">
                  Cart
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-primary-600 font-medium">
                  Orders
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange= {handleSearchInputChange}
                onFocus={()=> setShowSuggestions(searchQuery.length>0)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                  >
                    <span className="text-gray-800">{suggestion.name}</span>
                    <span className="text-sm text-gray-500">{suggestion.category}</span>
                  </button>
                ))}
              </div>
            )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/offers" className="relative text-gray-700 hover:text-primary-600 font-medium">
                    Offers
                    <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">NEW</span>
                  </Link>
                  <Link to="/help" className="text-gray-700 hover:text-primary-600 font-medium">
                    Help
                  </Link>
                  {/* <Link to ="/admin/Login" className="text-gray-700 hover:text-red-600 font-medium">
                  Admin
                  </Link> */}
                  <Link to="/signin" className="btn-primary text-center">
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                    Home
                  </Link>
                  <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 font-medium">
                    Cart
                    {getCartCount() > 0 && (
                      <span className="ml-2 bg-primary-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {getCartCount()}
                      </span>
                    )}
                  </Link>
                  <Link to="/orders" className="text-gray-700 hover:text-primary-600 font-medium">
                    Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-primary-600 font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;