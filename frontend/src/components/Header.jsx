// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const { isDark, toggleTheme } = useTheme();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setIsMenuOpen(false);
//   };

//   const googleLogin = () => {
//     window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
//   };

//   return (
//     <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">B</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900 dark:text-white">BlogPlatform</span>
//           </Link>

//           {/* Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
//               Home
//             </Link>
//             <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
//               Contact
//             </Link>
//             {user && (
//               <Link to="/create-post" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
//                 Write
//               </Link>
//             )}
//           </nav>

//           {/* Right side buttons */}
//           <div className="flex items-center space-x-4">
//             {/* Theme Toggle */}
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//               aria-label="Toggle theme"
//             >
//               {isDark ? (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//                 </svg>
//               )}
//             </button>

//             {/* Auth buttons */}
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                   className="flex items-center space-x-2 focus:outline-none"
//                 >
//                   <img
//                     src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=0ea5e9&color=fff`}
//                     alt={user.username}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <span className="hidden sm:block text-gray-700 dark:text-gray-300">{user.username}</span>
//                 </button>

//                 {isMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
//                     <Link
//                       to={`/profile/${user._id}`}
//                       className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={googleLogin}
//                   className="btn-secondary flex items-center space-x-2"
//                 >
//                   <svg className="w-4 h-4" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                   <span>Google</span>
//                 </button>
//                 <Link to="/login" className="btn-primary">
//                   Sign in
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;







import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">BlogPlatform</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
            {user && (
              <Link to="/create-post" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Write
              </Link>
            )}
          </nav>

          {/* Desktop Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Auth buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=0ea5e9&color=fff`}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{user.username}</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <Link
                      to={`/profile/${user._id}`}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={googleLogin}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <Link to="/login" className="btn-primary">
                  Sign in
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4 mb-4">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                onClick={closeAllMenus}
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                onClick={closeAllMenus}
              >
                Contact
              </Link>
              {user && (
                <Link
                  to="/create-post"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                  onClick={closeAllMenus}
                >
                  Write Post
                </Link>
              )}
            </nav>

            {/* Mobile Auth Section */}
            {user ? (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=0ea5e9&color=fff`}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{user.username}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    to={`/profile/${user._id}`}
                    className="btn-secondary text-center"
                    onClick={closeAllMenus}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-primary text-center"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={googleLogin}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                  <Link
                    to="/login"
                    className="btn-primary text-center"
                    onClick={closeAllMenus}
                  >
                    Sign in with Email
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;