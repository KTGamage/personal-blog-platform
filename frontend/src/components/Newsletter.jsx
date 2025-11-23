// import React, { useState } from 'react';
// import { emailAPI } from '../services/api';

// const Newsletter = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       await emailAPI.subscribeNewsletter({ email });
//       setSuccess('Successfully subscribed to our newsletter! Check your email for confirmation.');
//       setEmail('');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to subscribe. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
//       <div className="text-center mb-4">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Updated</h3>
//         <p className="text-gray-600">
//           Get the latest posts delivered straight to your inbox.
//         </p>
//       </div>

//       {success && (
//         <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
//           {success}
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email address"
//             className="input-field text-center"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
//         </button>
//       </form>

//       <p className="text-xs text-gray-500 text-center mt-3">
//         No spam ever. Unsubscribe at any time.
//       </p>
//     </div>
//   );
// };

// export default Newsletter;





import React, { useState } from 'react';
import { emailAPI } from '../services/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await emailAPI.subscribeNewsletter({ email });
      setSuccess('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-8 text-center">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Stay Updated
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Get the latest posts and updates delivered straight to your inbox.
      </p>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {success}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
            className="flex-1 input-field text-center sm:text-left"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>

      <div className="mt-4 flex items-center justify-center space-x-2">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-gray-500">
          No spam ever. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;