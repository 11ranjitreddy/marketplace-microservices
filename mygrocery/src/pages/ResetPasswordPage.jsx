// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const ResetPasswordPage = () => {
//   const [formData, setFormData] = useState({
//     otp: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [step, setStep] = useState(1); // 1: OTP verification, 2: New password
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const resetEmail = localStorage.getItem('resetEmail');
//     if (!resetEmail) {
//       navigate('/forgot-password');
//     } else {
//       setEmail(resetEmail);
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleOTPSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     // Mock OTP verification
//     setTimeout(() => {
//       const mockOTP = localStorage.getItem('mockOTP');
//       if (formData.otp === mockOTP) {
//         setStep(2);
//       } else {
//         setError('Invalid verification code. Please try again.');
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     // Validate passwords
//     if (formData.newPassword !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setIsLoading(false);
//       return;
//     }

//     if (formData.newPassword.length < 6) {
//       setError('Password must be at least 6 characters long');
//       setIsLoading(false);
//       return;
//     }

//     // Mock password reset
//     setTimeout(() => {
//       // Clear stored data
//       localStorage.removeItem('resetEmail');
//       localStorage.removeItem('mockOTP');
      
//       // Redirect to sign in with success message
//       navigate('/signin', { 
//         state: { message: 'Password reset successfully! Please sign in with your new password.' }
//       });
//     }, 1500);
//   };

//   const resendOTP = () => {
//     // Mock resend OTP
//     const newOTP = Math.floor(100000 + Math.random() * 900000);
//     localStorage.setItem('mockOTP', newOTP.toString());
//     setError('');
//     alert(`New OTP sent! Mock OTP: ${newOTP}`);
//   };

//   if (step === 1) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="flex justify-center">
//             <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">M</span>
//             </div>
//           </div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Verify your email
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Enter the verification code sent to {email}
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             <form className="space-y-6" onSubmit={handleOTPSubmit}>
//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                   {error}
//                 </div>
//               )}

//               <div>
//                 <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
//                   Verification Code
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="otp"
//                     name="otp"
//                     type="text"
//                     required
//                     maxLength="6"
//                     value={formData.otp}
//                     onChange={handleChange}
//                     className="input-field text-center text-lg tracking-widest"
//                     placeholder="000000"
//                   />
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500">
//                   Enter the 6-digit code from your email
//                 </p>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading || formData.otp.length !== 6}
//                   className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Verifying...
//                     </>
//                   ) : (
//                     'Verify Code'
//                   )}
//                 </button>
//               </div>

//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={resendOTP}
//                   className="text-sm text-primary-600 hover:text-primary-500"
//                 >
//                   Didn't receive the code? Resend
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6 text-center">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-gray-600 hover:text-primary-600"
//               >
//                 Back to forgot password
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
//           Create new password
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Enter your new password below
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handlePasswordSubmit}>
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="newPassword"
//                   name="newPassword"
//                   type="password"
//                   required
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="Enter new password"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="Confirm new password"
//                 />
//               </div>
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
//                     Resetting...
//                   </>
//                 ) : (
//                   'Reset Password'
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6 text-center">
//             <Link
//               to="/signin"
//               className="text-sm text-gray-600 hover:text-primary-600"
//             >
//               Back to Sign In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordPage;