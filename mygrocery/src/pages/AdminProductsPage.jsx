// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const AdminProductsPage = () => {
//   const { user, signOut } = useAuth();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     originalPrice: '',
//     rating: '',
//     deliveryTime: '',
//     image: '',
//     category: '',
//     description: '',
//     inStock: true
//   });

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = () => {
//     const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
//     if (storedProducts.length === 0) {
//       // Load default products if none exist
//       const defaultProducts = [
//         {
//           id: 1,
//           name: "Organic Bananas",
//           price: 2.99,
//           originalPrice: 3.99,
//           rating: 4.5,
//           deliveryTime: "30-45 min",
//           image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
//           category: "Fruits",
//           inStock: true,
//           description: "Fresh organic bananas"
//         },
//         {
//           id: 2,
//           name: "Fresh Milk",
//           price: 4.49,
//           originalPrice: 5.49,
//           rating: 4.2,
//           deliveryTime: "30-45 min",
//           image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
//           category: "Dairy",
//           inStock: true,
//           description: "Fresh whole milk"
//         }
//       ];
//       localStorage.setItem('products', JSON.stringify(defaultProducts));
//       setProducts(defaultProducts);
//     } else {
//       setProducts(storedProducts);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (editingProduct) {
//       // Update existing product
//       const updatedProducts = products.map(product =>
//         product.id === editingProduct.id
//           ? { ...formData, id: editingProduct.id }
//           : product
//       );
//       setProducts(updatedProducts);
//       localStorage.setItem('products', JSON.stringify(updatedProducts));
//     } else {
//       // Add new product
//       const newProduct = {
//         ...formData,
//         id: Date.now(),
//         price: parseFloat(formData.price),
//         originalPrice: parseFloat(formData.originalPrice),
//         rating: parseFloat(formData.rating)
//       };
//       const updatedProducts = [...products, newProduct];
//       setProducts(updatedProducts);
//       localStorage.setItem('products', JSON.stringify(updatedProducts));
//     }
    
//     resetForm();
//     setIsModalOpen(false);
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       price: product.price.toString(),
//       originalPrice: product.originalPrice.toString(),
//       rating: product.rating.toString(),
//       deliveryTime: product.deliveryTime,
//       image: product.image,
//       category: product.category,
//       description: product.description,
//       inStock: product.inStock
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       const updatedProducts = products.filter(product => product.id !== productId);
//       setProducts(updatedProducts);
//       localStorage.setItem('products', JSON.stringify(updatedProducts));
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       price: '',
//       originalPrice: '',
//       rating: '',
//       deliveryTime: '',
//       image: '',
//       category: '',
//       description: '',
//       inStock: true
//     });
//     setEditingProduct(null);
//   };

//   const handleSignOut = () => {
//     signOut();
//     navigate('/admin/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Link to="/admin/dashboard" className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">A</span>
//               </Link>
//               <h1 className="ml-3 text-xl font-semibold text-gray-900">Product Management</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
//               <button
//                 onClick={handleSignOut}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header with Add Button */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">Products</h2>
//           <button
//             onClick={() => {
//               resetForm();
//               setIsModalOpen(true);
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Add Product
//           </button>
//         </div>

//         {/* Products Table */}
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Rating
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {products.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <img
//                           className="h-10 w-10 rounded-lg object-cover"
//                           src={product.image}
//                           alt={product.name}
//                         />
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                           <div className="text-sm text-gray-500">{product.deliveryTime}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                         {product.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">${product.price}</div>
//                       {product.originalPrice > product.price && (
//                         <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <span className="text-sm text-gray-900">{product.rating}</span>
//                         <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         product.inStock 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {product.inStock ? 'In Stock' : 'Out of Stock'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => handleEdit(product)}
//                         className="text-blue-600 hover:text-blue-900 mr-4"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(product.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <div className="mt-3">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">
//                 {editingProduct ? 'Edit Product' : 'Add New Product'}
//               </h3>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Product Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Price</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Original Price</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="originalPrice"
//                       value={formData.originalPrice}
//                       onChange={handleChange}
//                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Rating</label>
//                     <input
//                       type="number"
//                       step="0.1"
//                       min="0"
//                       max="5"
//                       name="rating"
//                       value={formData.rating}
//                       onChange={handleChange}
//                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Category</label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     >
//                       <option value="">Select Category</option>
//                       <option value="Fruits">Fruits</option>
//                       <option value="Vegetables">Vegetables</option>
//                       <option value="Dairy">Dairy</option>
//                       <option value="Bakery">Bakery</option>
//                       <option value="Meat">Meat</option>
//                       <option value="Beverages">Beverages</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Image URL</label>
//                   <input
//                     type="url"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Delivery Time</label>
//                   <input
//                     type="text"
//                     name="deliveryTime"
//                     value={formData.deliveryTime}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="e.g., 30-45 min"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows="3"
//                     className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="inStock"
//                     checked={formData.inStock}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-900">In Stock</label>
//                 </div>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//                   >
//                     {editingProduct ? 'Update' : 'Add'} Product
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProductsPage;