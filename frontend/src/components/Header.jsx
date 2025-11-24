// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setIsMobileMenuOpen(false);
//     setIsProfileMenuOpen(false);
//   };

//   const closeAllMenus = () => {
//     setIsMobileMenuOpen(false);
//     setIsProfileMenuOpen(false);
//   };

//   return (
//     <>
//       <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="flex items-center space-x-3 group"
//               onClick={closeAllMenus}
//             >
//               <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
//                 <span className="text-white font-bold text-lg">B</span>
//               </div>
//               <span className="text-xl font-bold text-gray-800">BlogPlatform</span>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               <Link
//                 to="/"
//                 className="text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200"
//               >
//                 Contact
//               </Link>
//               {user && (
//                 <Link
//                   to="/create-post"
//                   className="text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200"
//                 >
//                   Write
//                 </Link>
//               )}
//             </nav>

//             {/* Desktop User Menu */}
//             <div className="hidden md:flex items-center space-x-4">
//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//                     className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors duration-200 shadow-sm"
//                   >
//                     <img
//                       src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=amber-600&color=fff`}
//                       alt={user.username}
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <span className="text-gray-700 font-medium text-sm">
//                       {user.username}
//                     </span>
//                     <svg
//                       className={`w-4 h-4 text-gray-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {isProfileMenuOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
//                       <Link
//                         to={`/profile/${user._id}`}
//                         className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 transition-colors duration-200"
//                         onClick={() => setIsProfileMenuOpen(false)}
//                       >
//                         <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                         </svg>
//                         Profile
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
//                       >
//                         <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                         </svg>
//                         Sign out
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-3">
//                   <Link
//                     to="/login"
//                     className="btn-secondary text-sm"
//                   >
//                     Sign in
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="btn-primary text-sm"
//                   >
//                     Sign up
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200"
//             >
//               {isMobileMenuOpen ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
//             <div className="px-4 py-4 space-y-3">
//               <Link
//                 to="/"
//                 className="block py-2 text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200"
//                 onClick={closeAllMenus}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/contact"
//                 className="block py-2 text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200"
//                 onClick={closeAllMenus}
//               >
//                 Contact
//               </Link>
//               {user && (
//                 <>
//                   <Link
//                     to="/create-post"
//                     className="block py-2 text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200"
//                     onClick={closeAllMenus}
//                   >
//                     Write Post
//                   </Link>
//                   <Link
//                     to={`/profile/${user._id}`}
//                     className="block py-2 text-gray-600 hover:text-amber-600 font-medium transition-colors duration-200"
//                     onClick={closeAllMenus}
//                   >
//                     Profile
//                   </Link>
//                 </>
//               )}

//               <div className="pt-4 border-t border-gray-200">
//                 {user ? (
//                   <button
//                     onClick={handleLogout}
//                     className="w-full btn-secondary text-red-600 hover:bg-red-50 border-red-200"
//                   >
//                     Sign out
//                   </button>
//                 ) : (
//                   <div className="space-y-2">
//                     <Link
//                       to="/login"
//                       className="block w-full btn-secondary text-center"
//                       onClick={closeAllMenus}
//                     >
//                       Sign in
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="block w-full btn-primary text-center"
//                       onClick={closeAllMenus}
//                     >
//                       Sign up
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Overlay for mobile menu */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 z-40 md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; // Import useTheme

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme(); // Get theme functions
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group"
              onClick={closeAllMenus}
            >
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                {/* <span className="text-white font-bold text-lg">I</span> */}
                <svg
                  className="text-white font-bold text-lg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <path d="M11 11l2.5-2.5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                InsightFlow
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200"
              >
                Contact
              </Link>
              {user && (
                <Link
                  to="/create-post"
                  className="text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200"
                >
                  Write
                </Link>
              )}
            </nav>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  // Sun icon for light mode
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  // Moon icon for dark mode
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 transition-colors duration-200 shadow-sm"
                  >
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${user.username}&background=amber-600&color=fff`
                      }
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">
                      {user.username}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
                        isProfileMenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <Link
                        to={`/profile/${user._id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="btn-secondary text-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    Sign in
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-2 md:hidden">
              {/* Theme Toggle Button for Mobile */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                className="block py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200"
                onClick={closeAllMenus}
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200"
                onClick={closeAllMenus}
              >
                Contact
              </Link>
              {user && (
                <>
                  <Link
                    to="/create-post"
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200"
                    onClick={closeAllMenus}
                  >
                    Write Post
                  </Link>
                  <Link
                    to={`/profile/${user._id}`}
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200"
                    onClick={closeAllMenus}
                  >
                    Profile
                  </Link>
                </>
              )}

              {/* Theme Toggle in Mobile Menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center w-full py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200"
              >
                {isDark ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Light Mode
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    Dark Mode
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full btn-secondary text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
                  >
                    Sign out
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block w-full btn-secondary text-center dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
                      onClick={closeAllMenus}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full btn-primary text-center"
                      onClick={closeAllMenus}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
