// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const AdminLoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { signIn } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     if (!formData.email || !formData.password) {
//       setError('Please enter both email and password');
//       setIsLoading(false);
//       return;
//     }

//     // Check if admin exists in localStorage
//     setTimeout(() => {
//       const existingAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
//       const admin = existingAdmins.find(a => a.email === formData.email && a.password === formData.password);
      
//       if (admin) {
//         // Remove password from admin data before storing in auth context
//         const { password, ...adminData } = admin;
//         signIn({ ...adminData, isAdmin: true });
//         navigate('/admin/dashboard');
//       } else {
//         // Fallback for demo: allow admin login with specific credentials
//         if (formData.email === 'admin@mystore.com' && formData.password === 'admin123') {
//           const adminData = {
//             id: 'admin-1',
//             name: 'Admin User',
//             email: formData.email,
//             role: 'Super Admin',
//             avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=dc2626&color=fff&size=150',
//             isAdmin: true
//           };
//           signIn(adminData);
//           navigate('/admin/dashboard');
//         } else {
//           setError('Invalid admin credentials');
//         }
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-xl">A</span>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Admin Login
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Access My Store Corporate Admin Panel
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Admin Email
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="Enter admin email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Admin Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="Enter admin password"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign in to Admin Panel'
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Demo Credentials: admin@mystore.com / admin123
//             </p>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Back to{' '}
//               <Link to="/" className="font-medium text-primary-600 hover:text-primary-500">
//                 Store
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;