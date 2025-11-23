// import React, { useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const AuthSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const { updateProfile } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = searchParams.get('token');
    
//     if (token) {
//       localStorage.setItem('token', token);
//       // The AuthContext will automatically fetch the user data
//       navigate('/');
//     } else {
//       navigate('/login');
//     }
//   }, [searchParams, navigate, updateProfile]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
//         <h2 className="text-xl font-semibold text-gray-900">Completing authentication...</h2>
//         <p className="text-gray-600 mt-2">Please wait while we sign you in.</p>
//       </div>
//     </div>
//   );
// };

// export default AuthSuccess;



import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    
    if (error) {
      console.error('OAuth error:', error);
      navigate('/login', { state: { error: 'Google authentication failed' } });
      return;
    }
    
    if (token) {
      localStorage.setItem('token', token);
      // The AuthContext will automatically fetch the user data on page reload
      // For better UX, you might want to immediately update the user state
      window.location.href = '/'; // This will reload and AuthContext will fetch user
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, updateProfile]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900">Completing authentication...</h2>
        <p className="text-gray-600 mt-2">Please wait while we sign you in.</p>
      </div>
    </div>
  );
};

export default AuthSuccess;