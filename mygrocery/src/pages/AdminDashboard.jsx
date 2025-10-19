// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';

// const AdminDashboard = () => {
//   const { user, signOut } = useAuth();
//   const { cart } = useCart();
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalUsers: 0,
//     totalOrders: 0,
//     totalRevenue: 0
//   });

//   useEffect(() => {
//     // Calculate statistics from localStorage data
//     const products = JSON.parse(localStorage.getItem('products') || '[]');
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
//     const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    
//     setStats({
//       totalProducts: products.length,
//       totalUsers: users.length,
//       totalOrders: orders.length,
//       totalRevenue: totalRevenue.toFixed(2)
//     });
//   }, []);

//   const handleSignOut = () => {
//     signOut();
//     navigate('/admin/login');
//   };

//   const StatCard = ({ title, value, icon, color }) => (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex items-center">
//         <div className={`p-3 rounded-full ${color}`}>
//           {icon}
//         </div>
//         <div className="ml-4">
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-semibold text-gray-900">{value}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const QuickActionCard = ({ title, description, icon, link, color }) => (
//     <Link to={link} className="block">
//       <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
//         <div className="flex items-center">
//           <div className={`p-3 rounded-full ${color}`}>
//             {icon}
//           </div>
//           <div className="ml-4">
//             <h3 className="text-lg font-medium text-gray-900">{title}</h3>
//             <p className="text-sm text-gray-600">{description}</p>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">A</span>
//               </div>
//               <h1 className="ml-3 text-xl font-semibold text-gray-900">Admin Dashboard</h1>
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
//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Products"
//             value={stats.totalProducts}
//             icon={
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//               </svg>
//             }
//             color="bg-blue-500"
//           />
//           <StatCard
//             title="Total Users"
//             value={stats.totalUsers}
//             icon={
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//               </svg>
//             }
//             color="bg-green-500"
//           />
//           <StatCard
//             title="Total Orders"
//             value={stats.totalOrders}
//             icon={
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//             }
//             color="bg-yellow-500"
//           />
//           <StatCard
//             title="Total Revenue"
//             value={`$${stats.totalRevenue}`}
//             icon={
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//               </svg>
//             }
//             color="bg-purple-500"
//           />
//         </div>

//         {/* Quick Actions */}
//         <div className="mb-8">
//           <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <QuickActionCard
//               title="Manage Products"
//               description="Add, edit, or remove products from the store"
//               icon={
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                 </svg>
//               }
//               link="/admin/products"
//               color="bg-blue-500"
//             />
//             <QuickActionCard
//               title="View Orders"
//               description="Monitor and manage customer orders"
//               icon={
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               }
//               link="/admin/orders"
//               color="bg-green-500"
//             />
//             <QuickActionCard
//               title="User Management"
//               description="View and manage registered users"
//               icon={
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                 </svg>
//               }
//               link="/admin/users"
//               color="bg-yellow-500"
//             />
//             <QuickActionCard
//               title="Analytics"
//               description="View sales reports and analytics"
//               icon={
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               }
//               link="/admin/analytics"
//               color="bg-purple-500"
//             />
//             <QuickActionCard
//               title="Categories"
//               description="Manage product categories"
//               icon={
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                 </svg>
//               }
//               link="/admin/categories"
//               color="bg-red-500"
//             />
//             <QuickActionCard
//               title="Settings"
//               description="Configure store settings"
//               icon={
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               }
//               link="/admin/settings"
//               color="bg-gray-500"
//             />
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 <p className="ml-3 text-sm text-gray-600">New order #1234 received from John Doe</p>
//                 <span className="ml-auto text-xs text-gray-400">2 minutes ago</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                 <p className="ml-3 text-sm text-gray-600">Product "Organic Bananas" stock updated</p>
//                 <span className="ml-auto text-xs text-gray-400">15 minutes ago</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
//                 <p className="ml-3 text-sm text-gray-600">New user registration: jane@example.com</p>
//                 <span className="ml-auto text-xs text-gray-400">1 hour ago</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;