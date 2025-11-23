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
      setSuccess('Successfully subscribed to our newsletter! Check your email for confirmation.');
      setEmail('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-gray-600">
          Get the latest posts delivered straight to your inbox.
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
            className="input-field text-center"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-3">
        No spam ever. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default Newsletter;