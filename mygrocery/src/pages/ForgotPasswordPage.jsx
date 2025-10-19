// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     // Mock OTP sending - in real app, this would be an API call
//     setTimeout(() => {
//       if (email) {
//         // Store email in localStorage for the reset password page
//         localStorage.setItem('resetEmail', email);
//         // Mock OTP generation
//         const mockOTP = Math.floor(100000 + Math.random() * 900000);
//         localStorage.setItem('mockOTP', mockOTP.toString());
//         setSuccess(true);
//       } else {
//         setError('Please enter your email address');
//       }
//       setIsLoading(false);
//     }, 1500);
//   };

//   const handleChange = (e) => {
//     setEmail(e.target.value);
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="flex justify-center">
//             <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//           </div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Email Sent!
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             We've sent a verification code to your email address
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
//             <div className="mb-6">
//               <p className="text-gray-600 mb-4">
//                 Please check your email <strong>{email}</strong> for a verification code.
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 Mock OTP for testing: <strong>{localStorage.getItem('mockOTP')}</strong>
//               </p>
//               <p className="text-sm text-gray-500">
//                 Didn't receive the email? Check your spam folder or{' '}
//                 <button
//                   onClick={() => setSuccess(false)}
//                   className="text-primary-600 hover:text-primary-500 font-medium"
//                 >
//                   try again
//                 </button>
//               </p>
//             </div>
            
//             <Link
//               to="/reset-password"
//               className="w-full btn-primary flex justify-center items-center"
//             >
//               Continue to Reset Password
//             </Link>

//             <div className="mt-6 text-center">
//               <Link
//                 to="/signin"
//                 className="text-sm text-gray-600 hover:text-primary-600"
//               >
//                 Back to Sign In
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-xl">M</span>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Forgot your password?
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           No worries, we'll send you reset instructions.
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
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="Enter your email address"
//                 />
//               </div>
//               <p className="mt-2 text-sm text-gray-500">
//                 We'll send a verification code to this email address.
//               </p>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Sending...
//                   </>
//                 ) : (
//                   'Send Reset Code'
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6 text-center">
//             <Link
//               to="/signin"
//               className="text-sm text-gray-600 hover:text-primary-600"
//             >
//               Remember your password? Sign in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordPage;